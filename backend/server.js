const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// Database initialization
const db = new sqlite3.Database('./javapath.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Database connected');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT,
      avatar_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login DATETIME
    )`);

    // User stats table
    db.run(`CREATE TABLE IF NOT EXISTS user_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER UNIQUE NOT NULL,
      total_learning_hours REAL DEFAULT 0,
      topics_completed INTEGER DEFAULT 0,
      projects_completed INTEGER DEFAULT 0,
      current_streak INTEGER DEFAULT 0,
      longest_streak INTEGER DEFAULT 0,
      last_activity_date DATE,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    // User progress table
    db.run(`CREATE TABLE IF NOT EXISTS user_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      topic_id TEXT NOT NULL,
      is_completed BOOLEAN DEFAULT 0,
      completed_at DATETIME,
      time_spent_minutes INTEGER DEFAULT 0,
      notes TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(user_id, topic_id)
    )`);

    // Activity logs table
    db.run(`CREATE TABLE IF NOT EXISTS activity_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      activity_date DATE NOT NULL,
      study_hours REAL DEFAULT 0,
      topics_completed INTEGER DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(user_id, activity_date)
    )`);

    // User projects table
    db.run(`CREATE TABLE IF NOT EXISTS user_projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      project_id TEXT NOT NULL,
      github_url TEXT,
      live_demo_url TEXT,
      status TEXT DEFAULT 'not_started',
      started_at DATETIME,
      completed_at DATETIME,
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(user_id, project_id)
    )`);

    // Goals table
    db.run(`CREATE TABLE IF NOT EXISTS goals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      goal_type TEXT,
      target_value INTEGER,
      current_value INTEGER DEFAULT 0,
      deadline DATE,
      is_completed BOOLEAN DEFAULT 0,
      completed_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    // Focus sessions table (NEW)
    db.run(`CREATE TABLE IF NOT EXISTS focus_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      duration_minutes INTEGER NOT NULL,
      topic_id TEXT,
      session_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    // Achievements table (NEW)
    db.run(`CREATE TABLE IF NOT EXISTS user_achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      achievement_id TEXT NOT NULL,
      earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(user_id, achievement_id)
    )`);
  });
}

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, error: { message: 'Authentication required' } });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, error: { message: 'Invalid or expired token' } });
    }
    req.user = user;
    next();
  });
};

// ==================== AUTH ROUTES ====================

// Register
app.post('/api/v1/auth/register', [
  body('username').trim().isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { username, email, password, fullName } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    
    db.run(
      'INSERT INTO users (username, email, password_hash, full_name) VALUES (?, ?, ?, ?)',
      [username, email, passwordHash, fullName],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE')) {
            return res.status(400).json({ success: false, error: { message: 'Username or email already exists' } });
          }
          return res.status(500).json({ success: false, error: { message: 'Registration failed' } });
        }

        const userId = this.lastID;
        
        // Initialize user stats
        db.run('INSERT INTO user_stats (user_id) VALUES (?)', [userId]);

        const token = jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: '24h' });
        
        res.status(201).json({
          success: true,
          message: 'User registered successfully',
          data: { userId, username, email, token }
        });
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
});

// Login
app.post('/api/v1/auth/login', async (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err || !user) {
      return res.status(401).json({ success: false, error: { message: 'Invalid credentials' } });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ success: false, error: { message: 'Invalid credentials' } });
    }

    // Update last login
    db.run('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);

    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
    
    res.json({
      success: true,
      data: {
        userId: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        token
      }
    });
  });
});

// ==================== USER ROUTES ====================

// Get current user profile
app.get('/api/v1/users/me', authenticateToken, (req, res) => {
  db.get('SELECT id, username, email, full_name, avatar_url, created_at, last_login FROM users WHERE id = ?', 
    [req.user.userId], 
    (err, user) => {
      if (err || !user) {
        return res.status(404).json({ success: false, error: { message: 'User not found' } });
      }
      res.json({ success: true, data: user });
    }
  );
});

// Update user profile
app.put('/api/v1/users/me', authenticateToken, (req, res) => {
  const { fullName, avatarUrl } = req.body;
  
  db.run(
    'UPDATE users SET full_name = ?, avatar_url = ? WHERE id = ?',
    [fullName, avatarUrl, req.user.userId],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, error: { message: 'Update failed' } });
      }
      res.json({ success: true, message: 'Profile updated successfully' });
    }
  );
});

// Get user statistics
app.get('/api/v1/users/me/stats', authenticateToken, (req, res) => {
  db.get('SELECT * FROM user_stats WHERE user_id = ?', [req.user.userId], (err, stats) => {
    if (err) {
      return res.status(500).json({ success: false, error: { message: 'Failed to fetch stats' } });
    }
    
    // Calculate overall progress
    db.get('SELECT COUNT(*) as total FROM user_progress WHERE user_id = ?', [req.user.userId], (err, total) => {
      db.get('SELECT COUNT(*) as completed FROM user_progress WHERE user_id = ? AND is_completed = 1', [req.user.userId], (err, completed) => {
        const totalTopics = 45; // Total topics in roadmap
        const completedTopics = completed ? completed.completed : 0;
        const overallProgressPercent = totalTopics > 0 ? (completedTopics / totalTopics * 100).toFixed(2) : 0;
        
        res.json({
          success: true,
          data: {
            ...stats,
            overallProgressPercent,
            topicsTotal: totalTopics
          }
        });
      });
    });
  });
});

// ==================== PROGRESS ROUTES ====================

// Get user progress
app.get('/api/v1/progress', authenticateToken, (req, res) => {
  db.all('SELECT * FROM user_progress WHERE user_id = ?', [req.user.userId], (err, progress) => {
    if (err) {
      return res.status(500).json({ success: false, error: { message: 'Failed to fetch progress' } });
    }
    res.json({ success: true, data: progress });
  });
});

// Mark topic as completed
app.post('/api/v1/progress/topics/:topicId/complete', authenticateToken, (req, res) => {
  const { topicId } = req.params;
  const { timeSpentMinutes, notes } = req.body;

  db.run(
    `INSERT INTO user_progress (user_id, topic_id, is_completed, completed_at, time_spent_minutes, notes) 
     VALUES (?, ?, 1, CURRENT_TIMESTAMP, ?, ?)
     ON CONFLICT(user_id, topic_id) 
     DO UPDATE SET is_completed = 1, completed_at = CURRENT_TIMESTAMP, time_spent_minutes = ?, notes = ?`,
    [req.user.userId, topicId, timeSpentMinutes || 0, notes || '', timeSpentMinutes || 0, notes || ''],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, error: { message: 'Failed to update progress' } });
      }

      // Update user stats
      db.run(
        'UPDATE user_stats SET topics_completed = topics_completed + 1 WHERE user_id = ?',
        [req.user.userId]
      );

      // Update streak
      updateStreak(req.user.userId);

      res.json({
        success: true,
        message: 'Topic marked as completed',
        data: { topicId, isCompleted: true }
      });
    }
  );
});

// Mark topic as incomplete
app.post('/api/v1/progress/topics/:topicId/incomplete', authenticateToken, (req, res) => {
  const { topicId } = req.params;

  db.run(
    'UPDATE user_progress SET is_completed = 0, completed_at = NULL WHERE user_id = ? AND topic_id = ?',
    [req.user.userId, topicId],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, error: { message: 'Failed to update progress' } });
      }

      // Update user stats
      db.run(
        'UPDATE user_stats SET topics_completed = MAX(0, topics_completed - 1) WHERE user_id = ?',
        [req.user.userId]
      );

      res.json({ success: true, message: 'Topic marked as incomplete' });
    }
  );
});

// ==================== ACTIVITY ROUTES ====================

// Get activity logs
app.get('/api/v1/activity', authenticateToken, (req, res) => {
  const { limit = 7 } = req.query;
  
  db.all(
    'SELECT * FROM activity_logs WHERE user_id = ? ORDER BY activity_date DESC LIMIT ?',
    [req.user.userId, parseInt(limit)],
    (err, activities) => {
      if (err) {
        return res.status(500).json({ success: false, error: { message: 'Failed to fetch activities' } });
      }
      res.json({ success: true, data: activities.reverse() });
    }
  );
});

// Log activity
app.post('/api/v1/activity', authenticateToken, (req, res) => {
  const { activityDate, studyHours, topicsCompleted } = req.body;

  db.run(
    `INSERT INTO activity_logs (user_id, activity_date, study_hours, topics_completed)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, activity_date)
     DO UPDATE SET study_hours = study_hours + ?, topics_completed = topics_completed + ?`,
    [req.user.userId, activityDate, studyHours, topicsCompleted, studyHours, topicsCompleted],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, error: { message: 'Failed to log activity' } });
      }

      // Update total learning hours
      db.run(
        'UPDATE user_stats SET total_learning_hours = total_learning_hours + ? WHERE user_id = ?',
        [studyHours, req.user.userId]
      );

      // Update streak
      updateStreak(req.user.userId);

      res.json({ success: true, message: 'Activity logged successfully' });
    }
  );
});

// Get streak information
app.get('/api/v1/activity/streak', authenticateToken, (req, res) => {
  db.get('SELECT current_streak, longest_streak, last_activity_date FROM user_stats WHERE user_id = ?',
    [req.user.userId],
    (err, stats) => {
      if (err) {
        return res.status(500).json({ success: false, error: { message: 'Failed to fetch streak' } });
      }
      res.json({ success: true, data: stats });
    }
  );
});

// ==================== PROJECTS ROUTES ====================

// Submit project
app.post('/api/v1/projects/:projectId/submit', authenticateToken, (req, res) => {
  const { projectId } = req.params;
  const { githubUrl, liveDemoUrl } = req.body;

  db.run(
    `INSERT INTO user_projects (user_id, project_id, github_url, live_demo_url, status, completed_at)
     VALUES (?, ?, ?, ?, 'completed', CURRENT_TIMESTAMP)
     ON CONFLICT(user_id, project_id)
     DO UPDATE SET github_url = ?, live_demo_url = ?, status = 'completed', completed_at = CURRENT_TIMESTAMP`,
    [req.user.userId, projectId, githubUrl, liveDemoUrl, githubUrl, liveDemoUrl],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, error: { message: 'Failed to submit project' } });
      }

      // Update user stats
      db.run(
        'UPDATE user_stats SET projects_completed = projects_completed + 1 WHERE user_id = ?',
        [req.user.userId]
      );

      res.json({ success: true, message: 'Project submitted successfully' });
    }
  );
});

// Get user projects
app.get('/api/v1/users/me/projects', authenticateToken, (req, res) => {
  db.all('SELECT * FROM user_projects WHERE user_id = ?', [req.user.userId], (err, projects) => {
    if (err) {
      return res.status(500).json({ success: false, error: { message: 'Failed to fetch projects' } });
    }
    res.json({ success: true, data: projects });
  });
});

// ==================== GOALS ROUTES ====================

// Get goals
app.get('/api/v1/goals', authenticateToken, (req, res) => {
  db.all('SELECT * FROM goals WHERE user_id = ? ORDER BY created_at DESC', [req.user.userId], (err, goals) => {
    if (err) {
      return res.status(500).json({ success: false, error: { message: 'Failed to fetch goals' } });
    }
    res.json({ success: true, data: goals });
  });
});

// Create goal
app.post('/api/v1/goals', authenticateToken, (req, res) => {
  const { title, description, goalType, targetValue, deadline } = req.body;

  db.run(
    'INSERT INTO goals (user_id, title, description, goal_type, target_value, deadline) VALUES (?, ?, ?, ?, ?, ?)',
    [req.user.userId, title, description, goalType, targetValue, deadline],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, error: { message: 'Failed to create goal' } });
      }
      res.status(201).json({ success: true, message: 'Goal created successfully', data: { id: this.lastID } });
    }
  );
});

// Update goal progress
app.put('/api/v1/goals/:goalId/progress', authenticateToken, (req, res) => {
  const { goalId } = req.params;
  const { currentValue } = req.body;

  db.run(
    'UPDATE goals SET current_value = ? WHERE id = ? AND user_id = ?',
    [currentValue, goalId, req.user.userId],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, error: { message: 'Failed to update goal' } });
      }
      res.json({ success: true, message: 'Goal progress updated' });
    }
  );
});

// Mark goal as complete
app.post('/api/v1/goals/:goalId/complete', authenticateToken, (req, res) => {
  const { goalId } = req.params;

  db.run(
    'UPDATE goals SET is_completed = 1, completed_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
    [goalId, req.user.userId],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, error: { message: 'Failed to complete goal' } });
      }
      res.json({ success: true, message: 'Goal completed!' });
    }
  );
});

// Delete goal
app.delete('/api/v1/goals/:goalId', authenticateToken, (req, res) => {
  const { goalId } = req.params;

  db.run('DELETE FROM goals WHERE id = ? AND user_id = ?', [goalId, req.user.userId], function(err) {
    if (err) {
      return res.status(500).json({ success: false, error: { message: 'Failed to delete goal' } });
    }
    res.json({ success: true, message: 'Goal deleted successfully' });
  });
});

// ==================== FOCUS SESSIONS (NEW) ====================

// Log focus session
app.post('/api/v1/focus-sessions', authenticateToken, (req, res) => {
  const { durationMinutes, topicId } = req.body;

  db.run(
    'INSERT INTO focus_sessions (user_id, duration_minutes, topic_id) VALUES (?, ?, ?)',
    [req.user.userId, durationMinutes, topicId],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, error: { message: 'Failed to log focus session' } });
      }
      res.json({ success: true, message: 'Focus session logged', data: { id: this.lastID } });
    }
  );
});

// Get focus sessions
app.get('/api/v1/focus-sessions', authenticateToken, (req, res) => {
  db.all(
    'SELECT * FROM focus_sessions WHERE user_id = ? ORDER BY session_date DESC LIMIT 10',
    [req.user.userId],
    (err, sessions) => {
      if (err) {
        return res.status(500).json({ success: false, error: { message: 'Failed to fetch sessions' } });
      }
      res.json({ success: true, data: sessions });
    }
  );
});

// ==================== ACHIEVEMENTS (NEW) ====================

// Get user achievements
app.get('/api/v1/users/me/achievements', authenticateToken, (req, res) => {
  db.all('SELECT * FROM user_achievements WHERE user_id = ?', [req.user.userId], (err, achievements) => {
    if (err) {
      return res.status(500).json({ success: false, error: { message: 'Failed to fetch achievements' } });
    }
    res.json({ success: true, data: achievements });
  });
});

// Check and award achievements
function checkAndAwardAchievements(userId) {
  db.get('SELECT * FROM user_stats WHERE user_id = ?', [userId], (err, stats) => {
    if (err || !stats) return;

    const achievements = [];

    // 7-day streak
    if (stats.current_streak >= 7) {
      achievements.push('WEEK_WARRIOR');
    }

    // 10 topics completed
    if (stats.topics_completed >= 10) {
      achievements.push('KNOWLEDGE_SEEKER');
    }

    // First project
    if (stats.projects_completed >= 1) {
      achievements.push('FIRST_DEPLOYMENT');
    }

    // Award achievements
    achievements.forEach(achievementId => {
      db.run(
        'INSERT OR IGNORE INTO user_achievements (user_id, achievement_id) VALUES (?, ?)',
        [userId, achievementId]
      );
    });
  });
}

// ==================== HELPER FUNCTIONS ====================

function updateStreak(userId) {
  const today = new Date().toISOString().split('T')[0];
  
  db.get('SELECT last_activity_date, current_streak, longest_streak FROM user_stats WHERE user_id = ?', 
    [userId], 
    (err, stats) => {
      if (err || !stats) return;

      const lastActivity = stats.last_activity_date;
      let currentStreak = stats.current_streak;
      let longestStreak = stats.longest_streak;

      if (lastActivity === today) {
        // Same day, no change
        return;
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastActivity === yesterdayStr) {
        // Consecutive day, increment streak
        currentStreak += 1;
      } else {
        // Streak broken, reset
        currentStreak = 1;
      }

      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }

      db.run(
        'UPDATE user_stats SET current_streak = ?, longest_streak = ?, last_activity_date = ? WHERE user_id = ?',
        [currentStreak, longestStreak, today, userId]
      );

      // Check achievements
      checkAndAwardAchievements(userId);
    }
  );
}

// Health check
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'OK', message: 'JavaPath Pro API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 JavaPath Pro API running on port ${PORT}`);
  console.log(`📊 Database: SQLite (javapath.db)`);
  console.log(`🔐 JWT Secret: ${JWT_SECRET.substring(0, 10)}...`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database', err);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});

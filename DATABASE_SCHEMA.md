# 🗄️ Database Schema Design - JavaPath Pro

## Overview

This document outlines the database schema for JavaPath Pro when implementing a backend system. Currently, the application uses LocalStorage for client-side persistence, but this schema is designed for future backend integration with PostgreSQL.

## Entity Relationship Diagram (ERD)

```
Users (1) ─── (M) UserProgress ─── (M) Topics
Users (1) ─── (M) UserProjects ─── (M) Projects
Users (1) ─── (M) ActivityLogs
Users (1) ─── (M) Goals
Topics (M) ─── (1) Phases
Projects (M) ─── (1) Phases
Topics (M) ─── (M) Subtopics
Topics (M) ─── (M) Resources
```

## Tables

### 1. Users Table
Stores user account information and authentication details.

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    avatar_url VARCHAR(500),
    bio TEXT,
    current_phase_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (current_phase_id) REFERENCES phases(id)
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
```

### 2. Phases Table
Defines the 5 main learning phases.

```sql
CREATE TABLE phases (
    id SERIAL PRIMARY KEY,
    phase_number INTEGER UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50),
    color VARCHAR(20),
    estimated_weeks INTEGER,
    deadline_description VARCHAR(100),
    order_index INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_phases_number ON phases(phase_number);
```

**Sample Data:**
```sql
INSERT INTO phases (phase_number, title, icon_name, color, estimated_weeks, deadline_description, order_index) VALUES
(1, 'Phase 1: Programming & Core Java Foundations', 'Terminal', 'blue', 10, '8-10 Weeks', 1),
(2, 'Phase 2: Database & Backend Foundations', 'Database', 'green', 12, '10-12 Weeks', 2),
(3, 'Phase 3: Frontend Development', 'Globe', 'purple', 8, '6-8 Weeks', 3),
(4, 'Phase 4: DevOps & Deployment', 'Cpu', 'orange', 6, '4-6 Weeks', 4),
(5, 'Phase 5: Advanced Engineering & Architecture', 'Award', 'red', 8, '8 Weeks', 5);
```

### 3. Topics Table
Core topics within each phase.

```sql
CREATE TABLE topics (
    id SERIAL PRIMARY KEY,
    phase_id INTEGER NOT NULL,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL,
    practice_questions_count INTEGER DEFAULT 0,
    estimated_hours INTEGER,
    difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    is_required BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (phase_id) REFERENCES phases(id) ON DELETE CASCADE
);

CREATE INDEX idx_topics_phase ON topics(phase_id);
CREATE INDEX idx_topics_order ON topics(phase_id, order_index);
```

### 4. Subtopics Table
Detailed subtopics for each main topic.

```sql
CREATE TABLE subtopics (
    id SERIAL PRIMARY KEY,
    topic_id INTEGER NOT NULL,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL,
    code_example TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
);

CREATE INDEX idx_subtopics_topic ON subtopics(topic_id);
```

### 5. Resources Table
Learning resources for topics.

```sql
CREATE TABLE resources (
    id SERIAL PRIMARY KEY,
    topic_id INTEGER NOT NULL,
    title VARCHAR(300) NOT NULL,
    resource_type VARCHAR(50) CHECK (resource_type IN ('book', 'video', 'article', 'documentation', 'course', 'tutorial')),
    url VARCHAR(500),
    author VARCHAR(200),
    is_free BOOLEAN DEFAULT TRUE,
    rating DECIMAL(3,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
);

CREATE INDEX idx_resources_topic ON resources(topic_id);
```

### 6. Projects Table
Milestone projects for each phase.

```sql
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    phase_id INTEGER NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
    estimated_hours INTEGER,
    github_template_url VARCHAR(500),
    demo_url VARCHAR(500),
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (phase_id) REFERENCES phases(id) ON DELETE CASCADE
);

CREATE INDEX idx_projects_phase ON projects(phase_id);
CREATE INDEX idx_projects_difficulty ON projects(difficulty_level);
```

### 7. Project Skills Table (Many-to-Many)
Skills required for each project.

```sql
CREATE TABLE project_skills (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    UNIQUE(project_id, skill_name)
);

CREATE INDEX idx_project_skills_project ON project_skills(project_id);
```

### 8. User Progress Table
Tracks user completion of topics.

```sql
CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    topic_id INTEGER NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    notes TEXT,
    time_spent_minutes INTEGER DEFAULT 0,
    confidence_level INTEGER CHECK (confidence_level BETWEEN 1 AND 5),
    needs_review BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE,
    UNIQUE(user_id, topic_id)
);

CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_user_progress_topic ON user_progress(topic_id);
CREATE INDEX idx_user_progress_completed ON user_progress(user_id, is_completed);
```

### 9. User Projects Table
Tracks user project submissions.

```sql
CREATE TABLE user_projects (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    project_id INTEGER NOT NULL,
    github_url VARCHAR(500),
    live_demo_url VARCHAR(500),
    status VARCHAR(20) CHECK (status IN ('not_started', 'in_progress', 'completed', 'submitted')) DEFAULT 'not_started',
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    submitted_at TIMESTAMP,
    feedback TEXT,
    score INTEGER CHECK (score BETWEEN 0 AND 100),
    time_spent_hours INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    UNIQUE(user_id, project_id)
);

CREATE INDEX idx_user_projects_user ON user_projects(user_id);
CREATE INDEX idx_user_projects_status ON user_projects(user_id, status);
```

### 10. Activity Logs Table
Daily activity tracking for streak and hours.

```sql
CREATE TABLE activity_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    activity_date DATE NOT NULL,
    study_hours DECIMAL(5,2) DEFAULT 0,
    topics_completed INTEGER DEFAULT 0,
    commits_made INTEGER DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, activity_date)
);

CREATE INDEX idx_activity_user_date ON activity_logs(user_id, activity_date);
```

### 11. Goals Table
User-defined learning goals and milestones.

```sql
CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    goal_type VARCHAR(50) CHECK (goal_type IN ('daily', 'weekly', 'monthly', 'phase', 'custom')),
    target_value INTEGER,
    current_value INTEGER DEFAULT 0,
    unit VARCHAR(50), -- e.g., 'hours', 'topics', 'projects'
    deadline DATE,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_goals_user ON goals(user_id);
CREATE INDEX idx_goals_deadline ON goals(user_id, deadline);
```

### 12. User Stats Table
Aggregated statistics for quick access.

```sql
CREATE TABLE user_stats (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL,
    total_learning_hours DECIMAL(8,2) DEFAULT 0,
    topics_completed INTEGER DEFAULT 0,
    topics_total INTEGER DEFAULT 0,
    projects_completed INTEGER DEFAULT 0,
    projects_total INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_activity_date DATE,
    overall_progress_percent DECIMAL(5,2) DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_user_stats_user ON user_stats(user_id);
```

### 13. Achievements Table
Gamification - achievement definitions.

```sql
CREATE TABLE achievements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50),
    category VARCHAR(50),
    requirement_type VARCHAR(50), -- e.g., 'streak', 'topics_completed', 'projects'
    requirement_value INTEGER,
    points INTEGER DEFAULT 0,
    badge_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 14. User Achievements Table
Tracks earned achievements.

```sql
CREATE TABLE user_achievements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    achievement_id INTEGER NOT NULL,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE,
    UNIQUE(user_id, achievement_id)
);

CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);
```

### 15. Learning Techniques Table
Professional learning strategies.

```sql
CREATE TABLE learning_techniques (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    icon_name VARCHAR(50),
    category VARCHAR(50),
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 16. Technique Tips Table
Tips for each learning technique.

```sql
CREATE TABLE technique_tips (
    id SERIAL PRIMARY KEY,
    technique_id INTEGER NOT NULL,
    tip_text TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    FOREIGN KEY (technique_id) REFERENCES learning_techniques(id) ON DELETE CASCADE
);
```

## Relationships Summary

| Relationship | Type | Description |
|-------------|------|-------------|
| Users → UserProgress | One-to-Many | User tracks completion of multiple topics |
| Users → UserProjects | One-to-Many | User works on multiple projects |
| Users → ActivityLogs | One-to-Many | User has daily activity records |
| Users → Goals | One-to-Many | User sets multiple goals |
| Phases → Topics | One-to-Many | Each phase contains multiple topics |
| Phases → Projects | One-to-Many | Each phase has multiple projects |
| Topics → Subtopics | One-to-Many | Each topic has multiple subtopics |
| Topics → Resources | One-to-Many | Each topic has multiple resources |
| Projects → ProjectSkills | One-to-Many | Each project requires multiple skills |
| Users → UserStats | One-to-One | Each user has one stats record |

## Indexing Strategy

### Primary Indexes (Automatic)
- All `id` columns (PRIMARY KEY)
- All UNIQUE constraints

### Secondary Indexes (Created)
- Foreign key columns for JOIN performance
- Commonly filtered columns (status, date, completed)
- Composite indexes for common query patterns

## Sample Queries

### Get User's Overall Progress
```sql
SELECT 
    u.username,
    us.overall_progress_percent,
    us.topics_completed,
    us.topics_total,
    us.current_streak,
    us.total_learning_hours
FROM users u
JOIN user_stats us ON u.id = us.user_id
WHERE u.id = ?;
```

### Get Phase Progress for User
```sql
SELECT 
    p.title,
    p.phase_number,
    COUNT(t.id) as total_topics,
    COUNT(CASE WHEN up.is_completed = TRUE THEN 1 END) as completed_topics,
    ROUND(
        (COUNT(CASE WHEN up.is_completed = TRUE THEN 1 END)::DECIMAL / 
         COUNT(t.id)) * 100, 
        2
    ) as progress_percent
FROM phases p
LEFT JOIN topics t ON p.id = t.phase_id
LEFT JOIN user_progress up ON t.id = up.topic_id AND up.user_id = ?
GROUP BY p.id, p.title, p.phase_number
ORDER BY p.phase_number;
```

### Get User's Next Recommended Topic
```sql
SELECT 
    t.id,
    t.title,
    t.phase_id,
    p.title as phase_title
FROM topics t
JOIN phases p ON t.phase_id = p.id
LEFT JOIN user_progress up ON t.id = up.topic_id AND up.user_id = ?
WHERE up.id IS NULL
ORDER BY p.phase_number, t.order_index
LIMIT 1;
```

### Calculate Current Streak
```sql
WITH RECURSIVE streak_days AS (
    -- Start from the most recent activity
    SELECT 
        activity_date,
        1 as streak_count
    FROM activity_logs
    WHERE user_id = ? AND activity_date = CURRENT_DATE
    
    UNION ALL
    
    -- Recursively find consecutive days
    SELECT 
        al.activity_date,
        sd.streak_count + 1
    FROM activity_logs al
    INNER JOIN streak_days sd ON al.activity_date = sd.activity_date - INTERVAL '1 day'
    WHERE al.user_id = ?
)
SELECT COALESCE(MAX(streak_count), 0) as current_streak
FROM streak_days;
```

## Data Migration Plan

When moving from LocalStorage to PostgreSQL:

1. Export LocalStorage data to JSON
2. Transform JSON to SQL INSERT statements
3. Execute migration scripts
4. Verify data integrity
5. Update application to use API endpoints

## Backup Strategy

- Daily automated backups
- Point-in-time recovery enabled
- Backup retention: 30 days
- Test restore procedures monthly

## Performance Considerations

- Use connection pooling (pg-pool)
- Implement query result caching (Redis)
- Create materialized views for complex reports
- Regular VACUUM and ANALYZE operations
- Monitor slow queries with pg_stat_statements

## Security

- Encrypted connections (SSL/TLS)
- Parameterized queries (prevent SQL injection)
- Password hashing with bcrypt
- Row-level security policies
- Regular security audits

---

**Note**: This schema is designed for PostgreSQL but can be adapted for other SQL databases (MySQL, SQL Server) or NoSQL databases (MongoDB) with appropriate modifications.

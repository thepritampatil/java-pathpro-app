# 🔌 API Documentation - JavaPath Pro Backend

## Base URL
```
Development: http://localhost:8080/api/v1
Production: https://api.javapath.pro/api/v1
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

---

## 🔐 Authentication Endpoints

### Register New User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "username": "javadeveloper",
  "email": "dev@example.com",
  "password": "SecurePass123!",
  "fullName": "John Developer"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": 1,
    "username": "javadeveloper",
    "email": "dev@example.com",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "dev@example.com",
  "password": "SecurePass123!"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "username": "javadeveloper",
    "email": "dev@example.com",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 86400
  }
}
```

### Logout
```http
POST /auth/logout
```
**Headers:** Requires Authentication

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Refresh Token
```http
POST /auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 86400
  }
}
```

---

## 👤 User Endpoints

### Get Current User Profile
```http
GET /users/me
```
**Headers:** Requires Authentication

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "javadeveloper",
    "email": "dev@example.com",
    "fullName": "John Developer",
    "avatarUrl": "https://...",
    "bio": "Learning full-stack development",
    "currentPhaseId": 2,
    "createdAt": "2024-01-15T10:00:00Z",
    "lastLogin": "2024-02-20T08:30:00Z"
  }
}
```

### Update User Profile
```http
PUT /users/me
```
**Headers:** Requires Authentication

**Request Body:**
```json
{
  "fullName": "John Developer",
  "bio": "Aspiring Full Stack Java Developer",
  "avatarUrl": "https://..."
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "fullName": "John Developer",
    "bio": "Aspiring Full Stack Java Developer"
  }
}
```

### Get User Statistics
```http
GET /users/me/stats
```
**Headers:** Requires Authentication

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "totalLearningHours": 124.5,
    "topicsCompleted": 12,
    "topicsTotal": 45,
    "projectsCompleted": 3,
    "projectsTotal": 15,
    "currentStreak": 14,
    "longestStreak": 21,
    "overallProgressPercent": 26.67
  }
}
```

---

## 📚 Phases Endpoints

### Get All Phases
```http
GET /phases
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "phaseNumber": 1,
      "title": "Phase 1: Programming & Core Java Foundations",
      "description": "Master core Java fundamentals...",
      "iconName": "Terminal",
      "color": "blue",
      "estimatedWeeks": 10,
      "deadlineDescription": "8-10 Weeks",
      "topicsCount": 6,
      "projectsCount": 3
    }
    // ... more phases
  ]
}
```

### Get Phase Details
```http
GET /phases/:phaseId
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": 1,
    "phaseNumber": 1,
    "title": "Phase 1: Programming & Core Java Foundations",
    "description": "Master core Java fundamentals...",
    "topics": [
      {
        "id": 1,
        "title": "Programming Basics & Control Flows",
        "practiceQuestionsCount": 15,
        "estimatedHours": 20,
        "difficultyLevel": "beginner"
      }
      // ... more topics
    ],
    "projects": [
      {
        "id": 1,
        "name": "Console-based Student Management System",
        "description": "CRUD operations with file persistence",
        "difficultyLevel": "beginner",
        "estimatedHours": 15
      }
      // ... more projects
    ]
  }
}
```

### Get User's Phase Progress
```http
GET /phases/:phaseId/progress
```
**Headers:** Requires Authentication

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "phaseId": 1,
    "totalTopics": 6,
    "completedTopics": 2,
    "progressPercent": 33.33,
    "completedTopicIds": [1, 2],
    "nextRecommendedTopicId": 3
  }
}
```

---

## 📖 Topics Endpoints

### Get All Topics for Phase
```http
GET /phases/:phaseId/topics
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "phaseId": 1,
      "title": "Programming Basics & Control Flows",
      "description": "Learn fundamental programming concepts...",
      "practiceQuestionsCount": 15,
      "estimatedHours": 20,
      "difficultyLevel": "beginner",
      "subtopicsCount": 5,
      "resourcesCount": 3
    }
    // ... more topics
  ]
}
```

### Get Topic Details
```http
GET /topics/:topicId
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": 1,
    "phaseId": 1,
    "title": "Programming Basics & Control Flows",
    "description": "Learn fundamental programming concepts...",
    "practiceQuestionsCount": 15,
    "estimatedHours": 20,
    "difficultyLevel": "beginner",
    "subtopics": [
      {
        "id": 1,
        "title": "Variables & Data Types",
        "description": "Learn about int, float, boolean...",
        "codeExample": "int age = 25;"
      }
      // ... more subtopics
    ],
    "resources": [
      {
        "id": 1,
        "title": "Oracle Java Tutorial",
        "resourceType": "documentation",
        "url": "https://docs.oracle.com/javase/tutorial/",
        "isFree": true,
        "rating": 4.8
      }
      // ... more resources
    ]
  }
}
```

---

## ✅ Progress Endpoints

### Get User Progress (All Topics)
```http
GET /progress
```
**Headers:** Requires Authentication

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "topicId": 1,
      "topicTitle": "Programming Basics & Control Flows",
      "isCompleted": true,
      "completedAt": "2024-02-15T14:30:00Z",
      "timeSpentMinutes": 180,
      "confidenceLevel": 4,
      "needsReview": false
    }
    // ... more progress records
  ]
}
```

### Mark Topic as Completed
```http
POST /progress/topics/:topicId/complete
```
**Headers:** Requires Authentication

**Request Body (Optional):**
```json
{
  "timeSpentMinutes": 120,
  "confidenceLevel": 4,
  "notes": "Practiced with multiple examples"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Topic marked as completed",
  "data": {
    "topicId": 1,
    "isCompleted": true,
    "completedAt": "2024-02-20T10:00:00Z",
    "updatedStats": {
      "topicsCompleted": 3,
      "overallProgressPercent": 6.67
    }
  }
}
```

### Mark Topic as Incomplete
```http
POST /progress/topics/:topicId/incomplete
```
**Headers:** Requires Authentication

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Topic marked as incomplete"
}
```

### Update Progress Notes
```http
PUT /progress/topics/:topicId/notes
```
**Headers:** Requires Authentication

**Request Body:**
```json
{
  "notes": "Need to review Collections more thoroughly"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Notes updated successfully"
}
```

---

## 🚀 Projects Endpoints

### Get All Projects
```http
GET /projects
```

**Query Parameters:**
- `phaseId` (optional) - Filter by phase
- `difficulty` (optional) - Filter by difficulty level
- `search` (optional) - Search by name or description

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "phaseId": 1,
      "name": "Console-based Student Management System",
      "description": "CRUD operations with file persistence",
      "difficultyLevel": "beginner",
      "estimatedHours": 15,
      "skills": ["OOP", "Collections", "File I/O"],
      "githubTemplateUrl": "https://github.com/...",
      "demoUrl": null
    }
    // ... more projects
  ]
}
```

### Get Project Details
```http
GET /projects/:projectId
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": 1,
    "phaseId": 1,
    "name": "Console-based Student Management System",
    "description": "Build a complete CRUD application...",
    "difficultyLevel": "beginner",
    "estimatedHours": 15,
    "skills": ["OOP", "Collections", "File I/O", "Exception Handling"],
    "requirements": [
      "Add new students",
      "Search and filter",
      "Update records",
      "Delete records",
      "Persist to file"
    ],
    "githubTemplateUrl": "https://github.com/...",
    "demoUrl": null
  }
}
```

### Submit User Project
```http
POST /projects/:projectId/submit
```
**Headers:** Requires Authentication

**Request Body:**
```json
{
  "githubUrl": "https://github.com/username/project",
  "liveDemoUrl": "https://project-demo.vercel.app",
  "notes": "Implemented with Spring Boot instead of console"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Project submitted successfully",
  "data": {
    "userProjectId": 1,
    "projectId": 1,
    "status": "submitted",
    "submittedAt": "2024-02-20T15:00:00Z"
  }
}
```

### Get User's Projects
```http
GET /users/me/projects
```
**Headers:** Requires Authentication

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "projectId": 1,
      "projectName": "Student Management System",
      "status": "completed",
      "githubUrl": "https://github.com/username/project",
      "liveDemoUrl": "https://...",
      "startedAt": "2024-02-10T09:00:00Z",
      "completedAt": "2024-02-20T15:00:00Z",
      "timeSpentHours": 18,
      "score": 95,
      "feedback": "Excellent implementation!"
    }
    // ... more user projects
  ]
}
```

### Update Project Status
```http
PUT /projects/:projectId/status
```
**Headers:** Requires Authentication

**Request Body:**
```json
{
  "status": "in_progress"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Project status updated"
}
```

---

## 📊 Activity Endpoints

### Get Activity Logs
```http
GET /activity
```
**Headers:** Requires Authentication

**Query Parameters:**
- `startDate` (optional) - Start date (YYYY-MM-DD)
- `endDate` (optional) - End date (YYYY-MM-DD)
- `limit` (optional) - Number of records (default: 7)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "activityDate": "2024-02-20",
      "studyHours": 4.5,
      "topicsCompleted": 2,
      "commitsMade": 5,
      "notes": "Focused on Collections Framework"
    },
    {
      "activityDate": "2024-02-19",
      "studyHours": 3.0,
      "topicsCompleted": 1,
      "commitsMade": 3,
      "notes": null
    }
    // ... more activity logs
  ]
}
```

### Log Daily Activity
```http
POST /activity
```
**Headers:** Requires Authentication

**Request Body:**
```json
{
  "activityDate": "2024-02-20",
  "studyHours": 4.5,
  "topicsCompleted": 2,
  "commitsMade": 5,
  "notes": "Great progress today!"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Activity logged successfully",
  "data": {
    "activityDate": "2024-02-20",
    "studyHours": 4.5,
    "currentStreak": 15
  }
}
```

### Get Streak Information
```http
GET /activity/streak
```
**Headers:** Requires Authentication

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "currentStreak": 14,
    "longestStreak": 21,
    "lastActivityDate": "2024-02-20",
    "streakStartDate": "2024-02-07"
  }
}
```

---

## 🎯 Goals Endpoints

### Get User Goals
```http
GET /goals
```
**Headers:** Requires Authentication

**Query Parameters:**
- `type` (optional) - Filter by goal type (daily, weekly, monthly, phase, custom)
- `status` (optional) - Filter by status (active, completed)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Complete 5 Java 8 Stream Labs",
      "description": "Practice Stream API operations",
      "goalType": "weekly",
      "targetValue": 5,
      "currentValue": 3,
      "unit": "topics",
      "deadline": "2024-02-25",
      "isCompleted": false,
      "progressPercent": 60
    }
    // ... more goals
  ]
}
```

### Create Goal
```http
POST /goals
```
**Headers:** Requires Authentication

**Request Body:**
```json
{
  "title": "Complete Phase 1",
  "description": "Finish all Core Java topics",
  "goalType": "phase",
  "targetValue": 6,
  "unit": "topics",
  "deadline": "2024-03-31"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Goal created successfully",
  "data": {
    "id": 5,
    "title": "Complete Phase 1",
    "targetValue": 6,
    "currentValue": 0,
    "deadline": "2024-03-31"
  }
}
```

### Update Goal Progress
```http
PUT /goals/:goalId/progress
```
**Headers:** Requires Authentication

**Request Body:**
```json
{
  "currentValue": 4
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Goal progress updated",
  "data": {
    "id": 1,
    "currentValue": 4,
    "targetValue": 5,
    "progressPercent": 80,
    "isCompleted": false
  }
}
```

### Mark Goal as Complete
```http
POST /goals/:goalId/complete
```
**Headers:** Requires Authentication

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Congratulations! Goal completed!",
  "data": {
    "id": 1,
    "isCompleted": true,
    "completedAt": "2024-02-20T16:00:00Z"
  }
}
```

### Delete Goal
```http
DELETE /goals/:goalId
```
**Headers:** Requires Authentication

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Goal deleted successfully"
}
```

---

## 🏆 Achievements Endpoints

### Get All Achievements
```http
GET /achievements
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "First Steps",
      "description": "Complete your first topic",
      "iconName": "CheckCircle",
      "category": "progress",
      "requirementType": "topics_completed",
      "requirementValue": 1,
      "points": 10
    }
    // ... more achievements
  ]
}
```

### Get User Achievements
```http
GET /users/me/achievements
```
**Headers:** Requires Authentication

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "totalPoints": 150,
    "achievementsEarned": 8,
    "achievements": [
      {
        "id": 1,
        "name": "First Steps",
        "earnedAt": "2024-02-10T10:00:00Z"
      }
      // ... more earned achievements
    ]
  }
}
```

---

## 📚 Learning Techniques Endpoints

### Get All Learning Techniques
```http
GET /techniques
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Active Learning Over Passive Watching",
      "description": "Don't just watch tutorials...",
      "iconName": "Code2",
      "category": "learning_strategy",
      "tips": [
        "Code along without looking",
        "Introduce bugs and debug",
        "Explain concepts out loud"
      ]
    }
    // ... more techniques
  ]
}
```

---

## 📈 Analytics Endpoints

### Get Learning Analytics
```http
GET /analytics/overview
```
**Headers:** Requires Authentication

**Query Parameters:**
- `period` - Time period (week, month, quarter, year)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "period": "week",
    "studyHours": {
      "total": 28.5,
      "average": 4.07,
      "trend": "up"
    },
    "topicsCompleted": {
      "count": 5,
      "byPhase": {
        "1": 3,
        "2": 2
      }
    },
    "dailyActivity": [
      {"date": "2024-02-14", "hours": 3.5},
      {"date": "2024-02-15", "hours": 4.0}
      // ... more days
    ]
  }
}
```

---

## Error Responses

All endpoints return consistent error responses:

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "email": "Email format is invalid"
    }
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "You don't have permission to access this resource"
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

---

## Rate Limiting

- **Unauthenticated requests**: 100 requests per hour per IP
- **Authenticated requests**: 1000 requests per hour per user
- Rate limit headers included in all responses:
  ```
  X-RateLimit-Limit: 1000
  X-RateLimit-Remaining: 999
  X-RateLimit-Reset: 1708444800
  ```

---

## WebSocket Events (Future)

For real-time updates:

```javascript
// Connect
const ws = new WebSocket('wss://api.javapath.pro/ws');

// Events
ws.on('streak_updated', (data) => {
  console.log('New streak:', data.currentStreak);
});

ws.on('achievement_earned', (data) => {
  console.log('Achievement unlocked:', data.achievementName);
});
```

---

## Implementation Stack

**Recommended Backend Stack:**
- **Framework**: Spring Boot 3.x
- **Security**: Spring Security + JWT
- **Database**: PostgreSQL 15+
- **ORM**: Spring Data JPA / Hibernate
- **API Docs**: SpringDoc OpenAPI (Swagger)
- **Validation**: Bean Validation (javax.validation)
- **Testing**: JUnit 5, MockMvc, Testcontainers

---

This API documentation provides a complete backend blueprint for JavaPath Pro. Implement these endpoints using Spring Boot for a production-ready system.

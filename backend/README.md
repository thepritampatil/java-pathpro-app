# JavaPath Pro - Backend API

Complete REST API for the JavaPath Pro learning platform.

## Features

✅ **Authentication**: JWT-based auth with register/login
✅ **Progress Tracking**: Mark topics complete/incomplete
✅ **Activity Logging**: Track daily study hours and maintain streaks
✅ **Project Management**: Submit and track projects
✅ **Goals System**: Create and manage learning goals
✅ **Focus Sessions**: Log Pomodoro timer sessions
✅ **Achievements**: Automatic badge awarding system
✅ **Statistics**: Real-time progress and analytics

## Quick Start

### Install Dependencies
```bash
npm install
```

### Start Server
```bash
npm start
# or for development with auto-reload
npm run dev
```

Server runs on http://localhost:8080

### Test API
```bash
# Health check
curl http://localhost:8080/api/v1/health

# Register
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","email":"demo@example.com","password":"demo123","fullName":"Demo User"}'
```

## Database

Uses **SQLite** for development (file: `javapath.db`)

For production, configure **PostgreSQL** via `DATABASE_URL` environment variable.

### Tables:
- users
- user_stats
- user_progress
- activity_logs
- user_projects
- goals
- focus_sessions
- user_achievements

## API Endpoints

See [API_DOCUMENTATION.md](../API_DOCUMENTATION.md) for complete endpoint reference.

### Key Endpoints:
- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/users/me` - Get current user
- `GET /api/v1/users/me/stats` - Get statistics
- `POST /api/v1/progress/topics/:id/complete` - Mark topic complete
- `GET /api/v1/activity` - Get activity logs
- `POST /api/v1/projects/:id/submit` - Submit project
- `GET /api/v1/goals` - Get goals
- `POST /api/v1/focus-sessions` - Log focus session

## Environment Variables

Copy `.env.example` to `.env` and configure:

```
PORT=8080
JWT_SECRET=your-secret-key
```

## Deployment

### Render
1. Push to GitHub
2. Create Web Service on Render
3. Set environment variables
4. Deploy

### Railway
1. Connect GitHub repo
2. Add PostgreSQL database
3. Set environment variables
4. Deploy

## License

MIT

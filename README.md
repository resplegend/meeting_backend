# Nest.js Backend API

A RESTful API built with Nest.js for the Next.js & Nest.js Skill Test application.

## Features

- **JWT Authentication** - Secure token-based authentication
- **Meeting Management** - Full CRUD operations for meetings
- **User Management** - User authentication and validation
- **CORS Support** - Configured for frontend integration
- **TypeScript** - Full type safety throughout the application

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

```bash
npm install
```

## Running the Application

### Development Mode

```bash
npm run start:dev
```

The application will be available at `http://localhost:3001`

### Production Mode

```bash
npm run build
npm run start:prod
```

### Debug Mode

```bash
npm run start:debug
```

## API Documentation

### Authentication Endpoints

#### POST /auth/login
Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@gmail.com",
    "name": "Admin User"
  }
}
```

### Meeting Endpoints (Protected - Requires JWT)

#### GET /meetings
Get all meetings.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### GET /meetings/:id
Get a specific meeting by ID.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### POST /meetings
Create a new meeting.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "title": "Team Meeting",
  "description": "Weekly team sync",
  "startTime": "2024-01-15T10:00:00.000Z",
  "endTime": "2024-01-15T11:00:00.000Z",
  "location": "Conference Room A",
  "attendees": ["john@example.com", "jane@example.com"]
}
```

#### PATCH /meetings/:id
Update an existing meeting.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "title": "Updated Team Meeting",
  "description": "Updated description"
}
```

#### DELETE /meetings/:id
Delete a meeting.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

## Project Structure

```
src/
├── auth/                    # Authentication module
│   ├── auth.controller.ts   # Auth endpoints
│   ├── auth.service.ts      # Auth business logic
│   ├── auth.module.ts       # Auth module configuration
│   ├── jwt.strategy.ts      # JWT authentication strategy
│   └── jwt-auth.guard.ts    # JWT authentication guard
├── users/                   # Users module
│   ├── users.service.ts     # User management logic
│   └── users.module.ts      # Users module configuration
├── meetings/                # Meetings module
│   ├── meetings.controller.ts # Meeting endpoints
│   ├── meetings.service.ts    # Meeting business logic
│   └── meetings.module.ts     # Meetings module configuration
├── app.controller.ts        # Main app controller
├── app.service.ts           # Main app service
├── app.module.ts            # Root module
└── main.ts                  # Application entry point
```

## Dependencies

### Core Dependencies
- `@nestjs/common` - Nest.js core framework
- `@nestjs/core` - Nest.js core functionality
- `@nestjs/platform-express` - Express platform
- `@nestjs/jwt` - JWT authentication
- `@nestjs/passport` - Passport integration
- `passport` - Authentication middleware
- `passport-jwt` - JWT strategy for Passport
- `bcryptjs` - Password hashing
- `class-validator` - Validation decorators
- `class-transformer` - Object transformation

### Development Dependencies
- `@types/passport-jwt` - TypeScript types for passport-jwt
- `@types/bcryptjs` - TypeScript types for bcryptjs

## Configuration

### JWT Configuration
The JWT secret is currently hardcoded for development. In production, use environment variables:

```typescript
JwtModule.register({
  secret: process.env.JWT_SECRET || 'your-secret-key',
  signOptions: { expiresIn: '1h' },
})
```

### CORS Configuration
CORS is configured to allow requests from the frontend:

```typescript
app.enableCors({
  origin: 'http://localhost:3000',
  credentials: true,
});
```

## Authentication Flow

1. **Login Request** → User provides email/password
2. **Validation** → Check credentials against hardcoded user
3. **JWT Generation** → Create JWT token with user payload
4. **Response** → Return token and user data
5. **Protected Routes** → Verify JWT token in Authorization header

## Default User

For testing purposes, a hardcoded admin user is available:

- **Email**: `admin@gmail.com`
- **Password**: `admin123`

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Environment Variables

Create a `.env` file in the root directory:

```env
JWT_SECRET=your-super-secret-key
PORT=3001
NODE_ENV=development
```

## Security Considerations

- JWT tokens expire after 1 hour
- Passwords are hashed using bcrypt
- CORS is configured for specific origin
- Protected routes require valid JWT token
- Input validation using class-validator

## Development Notes

- Currently uses in-memory storage for meetings
- User data is hardcoded for simplicity
- JWT secret should be moved to environment variables in production
- Consider adding rate limiting for production use
# meeting_backend

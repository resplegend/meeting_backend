# Nest.js Backend API

A RESTful API built with Nest.js for the Meeting Management application.

## Features

- **JWT Authentication**: Secure, token-based authentication
- **Meeting Management**: Full CRUD for meetings
- **User Management**: User authentication and validation
- **CORS Support**: Ready for frontend integration
- **TypeScript**: Full type safety

## Prerequisites

- Node.js (v16+)
- npm or yarn

## Getting Started

### Installation

```bash
npm install
```

### Running the Application

- **Development**:  
  ```bash
  npm run start:dev
  ```
  Runs at [http://localhost:3001](http://localhost:3001)

- **Production**:  
  ```bash
  npm run build
  npm run start:prod
  ```

- **Debug**:  
  ```bash
  npm run start:debug
  ```

## API Overview

### Authentication

- **POST /auth/login**  
  Authenticate and receive a JWT token.

  **Request:**
  ```json
  {
    "email": "admin@gmail.com",
    "password": "admin123"
  }
  ```
  **Response:**
  ```json
  {
    "access_token": "...",
    "user": { "id": 1, "email": "...", "name": "..." }
  }
  ```

### Meetings (Protected)

- **GET /meetings**: List all meetings
- **GET /meetings/:id**: Get meeting by ID
- **POST /meetings**: Create a meeting
- **PATCH /meetings/:id**: Update a meeting
- **DELETE /meetings/:id**: Delete a meeting

**All require:**  
`Authorization: Bearer <jwt_token>`

## Project Structure

```
src/
├── auth/         # Authentication module
├── users/        # User management
├── meetings/     # Meeting management
├── app.module.ts # Root module
└── main.ts       # Entry point
```

## Configuration

- **JWT Secret**: Use environment variables for production.
- **CORS**: Configured for `http://localhost:3000` by default.

## Dependencies

- `@nestjs/*`, `passport`, `passport-jwt`, `bcryptjs`, `class-validator`, `class-transformer`

## License

MIT

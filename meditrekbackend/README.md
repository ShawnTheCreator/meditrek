# Meditrek Backend API
Backend API for Meditrek, providing endpoints for user profile management, alerts/notifications, and diagnostic test CRUD operations.

## Features Implemented

### 1. User Profile & Preferences
- **View Profile**: `GET /api/user/profile`
- **Update Profile**: `PUT /api/user/profile`
- **Change Password**: `PUT /api/user/password`

### 2. Alerts & Notifications Dashboard
- **Get All Alerts**: `GET /api/alerts`
- **Get Single Alert**: `GET /api/alerts/:id`
- **Mark as Read**: `PATCH /api/alerts/:id/read`
- **Dismiss Alert**: `PATCH /api/alerts/:id/dismiss`
- **Create Alert**: `POST /api/alerts`

### 3. Diagnostic Tests CRUD
- **Get All Tests**: `GET /api/diagnostic-tests`
- **Get Single Test**: `GET /api/diagnostic-tests/:id`
- **Create Test**: `POST /api/diagnostic-tests`
- **Update Test**: `PUT /api/diagnostic-tests/:id`
- **Delete Test**: `DELETE /api/diagnostic-tests/:id`
- **Update Status**: `PATCH /api/diagnostic-tests/:id/status`

## API Endpoints Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Body: {
  "name": "Sakhile Ndlazi",
  "email": "sakhile@monkeyandriver.com",
  "password": "securepassword123"
}
Response: {
  "id": "user-id",
  "name": "Sakhile Ndlazi",
  "email": "sakhile@monkeyandriver.com",
  "notificationThreshold": 5,
  "emailNotifications": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### Login User
```
POST /api/auth/login
Body: {
  "email": "sakhile@monkeyandriver.com",
  "password": "securepassword123"
}
Response: {
  "token": "jwt-token-here",
  "id": "user-id",
  "email": "sakhile@monkeyandriver.com",
  "name": "Sakhile Ndlazi",
  "type": "Bearer"
}
```

#### Get Current User (Protected)
```
GET /api/auth/me
Headers: Authorization: Bearer <token>
Response: {
  "id": "user-id",
  "name": "Sakhile Ndlazi",
  "email": "sakhile@monkeyandriver.com",
  "notificationThreshold": 5,
  "emailNotifications": true
}
```

### User Profile Endpoints

#### Get User Profile
```
GET /api/user/profile
Headers: Authorization: Bearer <token>
Response: {
  _id: "user-id",
  name: "John Doe",
  email: "john@example.com",
  notificationThreshold: 7,
  emailNotifications: true,
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

#### Update User Profile
```
PUT /api/user/profile
Headers: Authorization: Bearer <token>
Body: {
  name: "Updated Name",
  email: "updated@example.com",
  notificationThreshold: 8,
  emailNotifications: false
}
Response: Updated user object
```

#### Change Password
```
PUT /api/user/password
Headers: Authorization: Bearer <token>
Body: {
  currentPassword: "oldpassword",
  newPassword: "newpassword123"
}
Response: { message: "Password updated successfully" }
```

### Alerts Endpoints

#### Get All Alerts
```
GET /api/alerts?status=unread&priority=high&page=1&limit=10
Headers: Authorization: Bearer <token>
Response: {
  alerts: [...],
  totalPages: 5,
  currentPage: 1,
  total: 50
}
```

#### Create Alert
```
POST /api/alerts
Headers: Authorization: Bearer <token>
Body: {
  title: "Test Alert",
  message: "This is a test message",
  priority: "medium",
  relatedEntity: "DiagnosticTest",
  relatedEntityId: "test-id"
}
Response: Created alert object
```

### Diagnostic Tests Endpoints

#### Get All Tests
```
GET /api/diagnostic-tests?status=completed&page=1&limit=10
Headers: Authorization: Bearer <token>
Response: {
  tests: [...],
  totalPages: 3,
  currentPage: 1,
  total: 25
}
```

#### Create Test
```
POST /api/diagnostic-tests
Headers: Authorization: Bearer <token>
Body: {
  name: "Blood Glucose Test",
  result: "Normal - 95 mg/dL",
  date: "2024-01-15",
  notes: "Fasting test performed",
  status: "completed"
}
Response: Created test object
```

#### Update Test
```
PUT /api/diagnostic-tests/:id
Headers: Authorization: Bearer <token>
Body: {
  name: "Updated Test Name",
  result: "Updated Result",
  date: "2024-01-20",
  notes: "Updated notes",
  status: "completed"
}
Response: Updated test object
```

#### Update Test Status
```
PATCH /api/diagnostic-tests/:id/status
Headers: Authorization: Bearer <token>
Body: {
  status: "completed"
}
Response: Updated test object
```

## Setup Instructions
### 1. Install Dependencies
```bash
npm install
```
### 2. Environment Variables
Create a `.env` file with:
```
MONGODB_URI=mongodb://localhost:27017/meditrek
JWT_SECRET=your-secret-key-here
PORT=5000
```
### 3. Run Seed Data
```bash
node seedData.js
```

### 4. Start Server
```bash
npm start
```

## Health Check
```
GET /api/health
Response: {
  "status": "ok",
  "database": "connected",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

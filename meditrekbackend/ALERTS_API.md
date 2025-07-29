# Alerts & Notifications API Documentation

## Overview
The Alerts & Notifications API provides endpoints for managing user alerts and notifications in the MediTrek application. All endpoints require authentication via JWT token.

## Base URL
```
http://localhost:5000/api/alerts
```

## Authentication
All endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### 1. Get All Alerts
**GET** `/api/alerts`

Retrieves all alerts for the authenticated user with optional filtering and pagination.

#### Query Parameters
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of alerts per page (default: 10)
- `read` (optional): Filter by read status ('true' or 'false')
- `dismissed` (optional): Filter by dismissed status ('true' or 'false')
- `type` (optional): Filter by alert type ('info', 'warning', 'error', 'success')
- `priority` (optional): Filter by priority ('low', 'medium', 'high', 'critical')

#### Example Request
```bash
curl -X GET "http://localhost:5000/api/alerts?page=1&limit=5&read=false" \
  -H "Authorization: Bearer <your-jwt-token>"
```

#### Example Response
```json
{
  "alerts": [
    {
      "_id": "65f1234567890abcdef12345",
      "title": "Welcome to MediTrek!",
      "message": "Thank you for joining our health tracking platform.",
      "type": "info",
      "priority": "low",
      "isRead": false,
      "isDismissed": false,
      "user": {
        "_id": "65f1234567890abcdef12346",
        "name": "Sakhile Ndlazi",
        "email": "sakhile@monkeyandriver.com"
      },
      "expiresAt": null,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "isActive": true
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalAlerts": 25,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### 2. Get Single Alert
**GET** `/api/alerts/:id`

Retrieves a specific alert by ID.

#### Example Request
```bash
curl -X GET "http://localhost:5000/api/alerts/65f1234567890abcdef12345" \
  -H "Authorization: Bearer <your-jwt-token>"
```

#### Example Response
```json
{
  "_id": "65f1234567890abcdef12345",
  "title": "Blood Glucose Test Completed",
  "message": "Your blood glucose test results are now available.",
  "type": "success",
  "priority": "medium",
  "isRead": false,
  "isDismissed": false,
  "user": {
    "_id": "65f1234567890abcdef12346",
    "name": "Sakhile Ndlazi",
    "email": "sakhile@monkeyandriver.com"
  },
  "expiresAt": null,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z",
  "isActive": true
}
```

### 3. Mark Alert as Read
**PATCH** `/api/alerts/:id/read`

Marks a specific alert as read.

#### Example Request
```bash
curl -X PATCH "http://localhost:5000/api/alerts/65f1234567890abcdef12345/read" \
  -H "Authorization: Bearer <your-jwt-token>"
```

#### Example Response
```json
{
  "message": "Alert marked as read",
  "alert": {
    "_id": "65f1234567890abcdef12345",
    "title": "Blood Glucose Test Completed",
    "message": "Your blood glucose test results are now available.",
    "type": "success",
    "priority": "medium",
    "isRead": true,
    "isDismissed": false,
    "user": {
      "_id": "65f1234567890abcdef12346",
      "name": "Sakhile Ndlazi",
      "email": "sakhile@monkeyandriver.com"
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

### 4. Dismiss Alert
**PATCH** `/api/alerts/:id/dismiss`

Dismisses a specific alert.

#### Example Request
```bash
curl -X PATCH "http://localhost:5000/api/alerts/65f1234567890abcdef12345/dismiss" \
  -H "Authorization: Bearer <your-jwt-token>"
```

#### Example Response
```json
{
  "message": "Alert dismissed",
  "alert": {
    "_id": "65f1234567890abcdef12345",
    "title": "System Maintenance",
    "message": "Scheduled maintenance will occur tonight.",
    "type": "info",
    "priority": "low",
    "isRead": true,
    "isDismissed": true,
    "user": {
      "_id": "65f1234567890abcdef12346",
      "name": "Sakhile Ndlazi",
      "email": "sakhile@monkeyandriver.com"
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

### 5. Create Alert
**POST** `/api/alerts`

Creates a new alert for the authenticated user.

#### Request Body
```json
{
  "title": "New Test Result Available",
  "message": "Your latest diagnostic test results are ready for review.",
  "type": "success",
  "priority": "medium",
  "expiresAt": "2024-02-15T23:59:59.000Z"
}
```

#### Field Descriptions
- `title` (required): Alert title (max 100 characters)
- `message` (required): Alert message (max 500 characters)
- `type` (optional): Alert type - 'info', 'warning', 'error', 'success' (default: 'info')
- `priority` (optional): Alert priority - 'low', 'medium', 'high', 'critical' (default: 'medium')
- `expiresAt` (optional): Expiration date for the alert

#### Example Request
```bash
curl -X POST "http://localhost:5000/api/alerts" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Test Result Available",
    "message": "Your latest diagnostic test results are ready for review.",
    "type": "success",
    "priority": "medium"
  }'
```

#### Example Response
```json
{
  "message": "Alert created successfully",
  "alert": {
    "_id": "65f1234567890abcdef12347",
    "title": "New Test Result Available",
    "message": "Your latest diagnostic test results are ready for review.",
    "type": "success",
    "priority": "medium",
    "isRead": false,
    "isDismissed": false,
    "user": {
      "_id": "65f1234567890abcdef12346",
      "name": "Sakhile Ndlazi",
      "email": "sakhile@monkeyandriver.com"
    },
    "expiresAt": null,
    "createdAt": "2024-01-15T12:00:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z",
    "isActive": true
  }
}
```

## Additional Utility Endpoints

### 6. Get Unread Alert Count
**GET** `/api/alerts/unread/count`

Returns the count of unread alerts for the authenticated user.

#### Example Request
```bash
curl -X GET "http://localhost:5000/api/alerts/unread/count" \
  -H "Authorization: Bearer <your-jwt-token>"
```

#### Example Response
```json
{
  "unreadCount": 5
}
```

### 7. Mark All Alerts as Read
**PATCH** `/api/alerts/read-all`

Marks all unread alerts as read for the authenticated user.

#### Example Request
```bash
curl -X PATCH "http://localhost:5000/api/alerts/read-all" \
  -H "Authorization: Bearer <your-jwt-token>"
```

#### Example Response
```json
{
  "message": "All alerts marked as read",
  "updatedCount": 5
}
```

## Alert Types and Priorities

### Alert Types
- `info`: General information alerts
- `warning`: Warning alerts requiring attention
- `error`: Error alerts indicating issues
- `success`: Success alerts for positive outcomes

### Alert Priorities
- `low`: Low priority alerts
- `medium`: Medium priority alerts (default)
- `high`: High priority alerts requiring immediate attention
- `critical`: Critical alerts requiring urgent action

## Error Responses

### 400 Bad Request
```json
{
  "message": "Title and message are required"
}
```

### 401 Unauthorized
```json
{
  "message": "No token provided"
}
```

### 404 Not Found
```json
{
  "message": "Alert not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Error fetching alerts",
  "error": "Database connection error"
}
```

## Database Schema

### Alert Model
```javascript
{
  title: String (required, max 100 chars),
  message: String (required, max 500 chars),
  type: String (enum: ['info', 'warning', 'error', 'success']),
  priority: String (enum: ['low', 'medium', 'high', 'critical']),
  isRead: Boolean (default: false),
  isDismissed: Boolean (default: false),
  user: ObjectId (ref: 'User', required),
  expiresAt: Date (optional),
  createdAt: Date,
  updatedAt: Date
}
```

## Features

- **Pagination**: Efficient pagination for large numbers of alerts
- **Filtering**: Filter alerts by read status, dismissed status, type, and priority
- **User Isolation**: Users can only access their own alerts
- **Expiration**: Optional expiration dates for alerts
- **Virtual Fields**: `isActive` field to check if alert is still active
- **Indexing**: Optimized database indexes for efficient queries
- **Validation**: Comprehensive input validation and error handling

## Testing

To test the API endpoints, you can use the provided sample data by running:

```bash
node seedData.js
```

This will create sample users and alerts for testing purposes. 
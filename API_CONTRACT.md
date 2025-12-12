# API Contract - Frontend to Backend

This document defines the exact API contract between your React frontend and Express.js backend.

## Base URL
```
http://localhost:3000/api
```

## Authentication Headers
All authenticated requests (except login/register) must include:
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

---

## 1. Register New User

**Endpoint:** `POST /auth/register`

### Request
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Success Response (200)
```json
{
  "message": "User created successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Error Response (400)
```json
{
  "message": "Email already exists"
}
```

### Error Response (500)
```json
{
  "message": "Internal server error"
}
```

### Frontend Behavior
- On success: Show toast "Registration successful! Please login.", redirect to /login
- On error: Show error message in toast
- Loading state: Show "Creating account..." on button

---

## 2. Login User

**Endpoint:** `POST /auth/login`

### Request
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Success Response (200)
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Response (401)
```json
{
  "message": "Invalid email or password"
}
```

### Error Response (400)
```json
{
  "message": "Email and password are required"
}
```

### Frontend Behavior
- On success: 
  - Store `accessToken` in `localStorage.accessToken`
  - Store `refresh_token` in `localStorage.refreshToken`
  - Store `user` object in `localStorage.user` (as JSON string)
  - Show toast "Login successful!"
  - Redirect to home page `/`
- On error: Show error message in toast
- Loading state: Show "Signing in..." on button

---

## 3. Logout User

**Endpoint:** `POST /auth/logout`

### Request
```json
{
  "token": "refresh_token_value"
}
```

### Headers Required
```
Authorization: Bearer {accessToken}
```

### Success Response (200)
```json
{
  "message": "Logged out successfully"
}
```

### Error Response (401)
```json
{
  "message": "Invalid or expired token"
}
```

### Frontend Behavior
- Clear `localStorage.accessToken`
- Clear `localStorage.refreshToken`
- Clear `localStorage.user`
- Show toast "Logged out successfully"
- Redirect to `/login`
- Reset form fields

---

## 4. Refresh Access Token

**Endpoint:** `POST /auth/refresh`

### Request
```json
{
  "token": "refresh_token_value"
}
```

### Headers
```
Content-Type: application/json
(No Authorization header needed)
```

### Success Response (200)
```json
{
  "accessToken": "new_jwt_token_here",
  "refresh_token": "new_refresh_token_here"
}
```

### Error Response (401)
```json
{
  "message": "Invalid or expired refresh token"
}
```

### Frontend Behavior
- Called automatically when accessToken expires
- Update `localStorage.accessToken` with new token
- Update `localStorage.refreshToken` with new token (if provided)
- Retry original request with new token
- User doesn't see any interruption

---

## Data Models

### User Object
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

Possible roles: `user`, `author`, `admin`

### JWT Tokens Structure
Both accessToken and refresh_token are JWT tokens.

Typical structure:
```
Header: { "alg": "HS256", "typ": "JWT" }
Payload: { "userId": "...", "iat": 1234567890, "exp": 1234567890 }
Signature: HMACSHA256(...)
```

---

## Error Codes & Handling

| Status | Code | Message | Frontend Action |
|--------|------|---------|-----------------|
| 200 | - | Success | Proceed normally |
| 400 | VALIDATION_ERROR | Invalid input | Show error toast |
| 401 | INVALID_CREDENTIALS | Wrong password | Show error toast |
| 401 | TOKEN_EXPIRED | Token expired | Refresh token, retry |
| 401 | INVALID_TOKEN | Invalid/malformed token | Logout, redirect to login |
| 409 | CONFLICT | Email already exists | Show error toast |
| 500 | SERVER_ERROR | Server error | Show generic error message |

---

## Frontend Implementation

### How Frontend Stores Data
```javascript
// After successful login
localStorage.setItem('accessToken', data.accessToken);
localStorage.setItem('refreshToken', data.refresh_token);
localStorage.setItem('user', JSON.stringify(data.user));
```

### How Frontend Sends Authenticated Requests
```javascript
const token = localStorage.getItem('accessToken');
const response = await fetch(url, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

### How Frontend Handles 401
```javascript
if (response.status === 401) {
  // Try to refresh token
  const newToken = await refreshAccessToken();
  if (newToken) {
    // Retry request with new token
  } else {
    // Redirect to login
  }
}
```

---

## Expected Backend Routes

Your Express backend should have these routes:

```javascript
// Auth routes
POST   /api/auth/register      // Create new user
POST   /api/auth/login         // User login, returns tokens
POST   /api/auth/logout        // User logout
POST   /api/auth/refresh       // Refresh access token

// Example: User routes (protected)
GET    /api/user/profile       // Get current user profile (requires token)
PUT    /api/user/profile       // Update user profile (requires token)

// Example: Posts routes
GET    /api/posts              // Get all posts (public)
POST   /api/posts              // Create post (requires token, author+)
GET    /api/posts/:id          // Get single post (public)
PUT    /api/posts/:id          // Update post (requires token, author+)
DELETE /api/posts/:id          // Delete post (requires token, author+)
GET    /api/posts/user/my      // Get user's posts (requires token)
```

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Refresh Token
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"token": "YOUR_REFRESH_TOKEN"}'
```

### Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer YOUR_accessToken" \
  -H "Content-Type: application/json" \
  -d '{"token": "YOUR_REFRESH_TOKEN"}'
```

### Make Authenticated Request
```bash
curl -X GET http://localhost:3000/api/user/profile \
  -H "Authorization: Bearer YOUR_accessToken"
```

---

## Important Notes

1. **CORS Headers Required**
   Backend must include:
   ```
   Access-Control-Allow-Origin: http://localhost:5173
   Access-Control-Allow-Credentials: true
   ```

2. **Token Expiration**
   - Access tokens: Recommend 15-30 minutes
   - Refresh tokens: Recommend 7-30 days

3. **Password Hashing**
   - Never send passwords as plaintext in responses
   - Always hash passwords with bcrypt or similar

4. **Rate Limiting**
   - Consider implementing rate limiting on auth endpoints
   - Prevent brute force attacks

5. **HTTPS in Production**
   - Always use HTTPS in production
   - Never expose tokens in URLs

---

## Example: Complete Login Flow

### Step 1: Frontend sends login request
```
POST http://localhost:3000/api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Step 2: Backend authenticates and responds
```
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Step 3: Frontend stores tokens
```
localStorage.accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
localStorage.refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
localStorage.user = '{"id":"507f1f77bcf86cd799439011",...}'
```

### Step 4: Frontend redirects to home
```
window.location = '/'
```

### Step 5: User makes authenticated request
```
GET http://localhost:3000/api/user/profile
Headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Step 6: Backend validates token and responds
```
{
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "createdAt": "2024-01-01T00:00:00Z",
  ...
}
```

---

## Checklist for Backend Verification

- [ ] `/auth/register` endpoint exists and working
- [ ] `/auth/login` endpoint exists and returns tokens
- [ ] `/auth/logout` endpoint exists and invalidates tokens
- [ ] `/auth/refresh` endpoint exists and returns new tokens
- [ ] CORS enabled for `http://localhost:5173`
- [ ] Passwords are hashed (bcryptjs or similar)
- [ ] Tokens are valid JWT tokens
- [ ] Tokens include expiration time
- [ ] Response format matches this contract exactly
- [ ] Error responses include `message` field
- [ ] Database stores refresh tokens for validation

---

This contract ensures your frontend and backend work together seamlessly.
If there are any mismatches, update either frontend code or backend API to match this specification.

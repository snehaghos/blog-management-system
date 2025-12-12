# Frontend-Backend Authentication Integration Guide

## Overview
Your frontend AuthContext is now fully integrated with the backend API. Here's what has been implemented:

## What Was Set Up

### 1. **API Configuration** (`src/lib/api.js`)
- Centralized API base URL: `http://localhost:3000/api`
- Helper functions for authenticated API calls
- Automatic token refresh mechanism
- Authorization header management

### 2. **AuthContextProvider** (`src/modules/Auth/context/AuthContextProvider.jsx`)
Updated with complete backend integration:

#### Login Flow:
```jsx
const handleLogin = async (e) => {
  // Makes POST request to: http://localhost:3000/api/auth/login
  // Body: { email, password }
  // Response: { user, accessToken, refresh_token }
  // Stores tokens in localStorage
  // Redirects to home page on success
}
```

#### Register Flow:
```jsx
const handleRegister = async (e) => {
  // Makes POST request to: http://localhost:3000/api/auth/register
  // Body: { name, email, password }
  // Response: { message, user }
  // Redirects to login page on success
}
```

#### Logout Flow:
```jsx
const handleLogout = async () => {
  // Makes POST request to: http://localhost:3000/api/auth/logout
  // Clears all tokens and user data from localStorage
  // Redirects to login page
}
```

### 3. **Login Component** (`src/modules/Auth/components/Login.jsx`)
- Uses `useAuthContext` hook to access auth state and methods
- Form inputs: email, password, role
- Handles form submission through `handleLogin`
- Shows loading state while authenticating

### 4. **Register Component** (`src/modules/Auth/components/Register.jsx`)
- Uses `useAuthContext` hook
- Form inputs: fullName, email, password, confirmPassword, role
- Client-side validation for password matching
- Handles form submission through `handleRegister`
- Shows loading state while registering

## Key Features

### ✅ Token Management
- Access tokens stored in `localStorage.accessToken`
- Refresh tokens stored in `localStorage.refreshToken`
- Automatic token refresh when access token expires
- Bearer token sent in all authenticated requests

### ✅ Error Handling
- Try-catch blocks for network errors
- User-friendly error messages via `react-toastify`
- Error responses from backend properly handled

### ✅ State Management
- Form state (email, password, fullName, confirmPassword)
- Loading state to disable buttons during requests
- User data stored in localStorage for persistence

### ✅ Navigation
- Automatic redirect after login (to home page)
- Automatic redirect after register (to login page)
- Automatic redirect after logout (to login page)

## How to Use in Components

### Example 1: Using Auth Context in a Component
```jsx
import useAuthContext from '@/modules/Auth/context/features/useAuthContext';

function MyComponent() {
  const { 
    email, 
    password, 
    handleLogin, 
    handleLogout, 
    isLoading 
  } = useAuthContext();

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
```

### Example 2: Making Authenticated API Calls
```jsx
import { apiCall } from '@/lib/api';

const fetchUserProfile = async () => {
  const response = await apiCall('/user/profile');
  const data = await response.json();
  return data;
};
```

### Example 3: Checking if User is Logged In
```jsx
const isLoggedIn = !!localStorage.getItem('accessToken');
const user = JSON.parse(localStorage.getItem('user') || '{}');
```

## Protected Routes Implementation

To create protected routes that only logged-in users can access:

```jsx
// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
  const token = localStorage.getItem('accessToken');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Usage in router:
<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
```

## Configuration

### Backend API URL
If your backend is running on a different URL, update `API_BASE_URL` in:
- `src/modules/Auth/context/AuthContextProvider.jsx` (line 3)
- `src/lib/api.js` (line 1)

Example: If backend is at `http://localhost:3000/api`
```jsx
const API_BASE_URL = "http://localhost:3000/api";
```

## Expected Backend Response Formats

### Login Response
```json
{
  "user": {
    "id": "...",
    "name": "...",
    "email": "...",
    "role": "user|author|admin"
  },
  "accessToken": "eyJ...",
  "refresh_token": "eyJ..."
}
```

### Register Response
```json
{
  "message": "User created successfully",
  "user": {
    "id": "...",
    "name": "...",
    "email": "...",
    "role": "user"
  }
}
```

### Error Response
```json
{
  "message": "Email already exists"
}
```

## Testing the Integration

1. **Start your backend server:**
   ```bash
   npm start
   # Backend should be running on http://localhost:3000
   ```

2. **Start your frontend dev server:**
   ```bash
   npm run dev
   # Frontend should be running on http://localhost:5173
   ```

3. **Test Registration:**
   - Go to `/register`
   - Fill in form with test data
   - Click "Sign Up"
   - Should redirect to login page with success message

4. **Test Login:**
   - Go to `/login`
   - Use registered email/password
   - Click "Sign In"
   - Should redirect to home page with success message
   - Check localStorage to verify tokens are stored

5. **Test Logout:**
   - Click logout button (in Navbar)
   - Should clear localStorage and redirect to login

## Troubleshooting

### "Failed to fetch" errors?
- Check if backend is running on `http://localhost:3000`
- Check if CORS is properly configured in backend
- Open browser console (F12) to see detailed error messages

### Tokens not persisting?
- Check `localStorage.accessToken` in browser DevTools
- Verify browser allows localStorage (not in private/incognito mode)

### Still redirecting to login after login?
- Check if access token is actually saved in localStorage
- Verify backend is returning `accessToken` in response
- Check API response format matches expected format

### Role field not being used?
- Backend currently stores role as default "user" for register
- Frontend login/register captures role in state but doesn't send it to backend yet
- Update Register form if you need to send role selection to backend

## Next Steps

1. Create a ProtectedRoute component for route protection
2. Update Navbar to show user info from localStorage
3. Implement user profile/dashboard pages
4. Add logout functionality to Navbar
5. Create a hook for fetching protected resources
6. Implement password reset functionality
7. Add "Remember me" functionality

## Files Modified

- ✅ `src/modules/Auth/context/AuthContextProvider.jsx` - Complete API integration
- ✅ `src/modules/Auth/components/Login.jsx` - Updated to use isLoading
- ✅ `src/modules/Auth/components/Register.jsx` - Updated to use isLoading
- ✅ `src/lib/api.js` - New file with API utilities
- ℹ️ `src/modules/Auth/context/features/useAuthContext.jsx` - No changes needed

---

You're all set! Your authentication flow is now fully connected to your backend.

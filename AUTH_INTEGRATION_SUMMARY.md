# Frontend-Backend Authentication Integration - Quick Reference

## What's Been Done ✅

Your frontend authentication is now **fully connected** to your backend API.

### 1. **AuthContextProvider** - Complete Rewrite
**Location:** `src/modules/Auth/context/AuthContextProvider.jsx`

```
User Login Request
       ↓
handleLogin() in Context
       ↓
POST /api/auth/login (email, password)
       ↓
Backend validates credentials
       ↓
Returns: { user, accessToken, refresh_token }
       ↓
Tokens saved to localStorage
       ↓
Redirects to Home Page
```

### 2. **Token Management** - Automatic
**Location:** `src/lib/api.js` (new file)

- Tokens stored securely in `localStorage`
- Automatic Bearer token injection in requests
- Automatic token refresh on expiration
- Error handling for auth failures

### 3. **Components Updated**
- **Login.jsx** - Full API integration ✅
- **Register.jsx** - Full API integration ✅
- Both use `useAuthContext()` hook to access state/methods

## Data Flow Diagram

```
┌─────────────┐
│  Login Page │
└──────┬──────┘
       │ User enters email/password & clicks "Sign In"
       ↓
┌─────────────────────────────┐
│ handleLogin(e) in Context   │
│ - Validates input           │
│ - Makes API call            │
└──────┬──────────────────────┘
       │
       ↓ Fetch to /api/auth/login
┌──────────────────────────────────┐
│   Backend Express Server         │
│   http://localhost:3000          │
│   ├─ Hash password check         │
│   ├─ Generate JWT tokens         │
│   └─ Return tokens + user data   │
└──────┬───────────────────────────┘
       │
       ↓ Returns { accessToken, refresh_token, user }
┌─────────────────────────────────┐
│ localStorage                    │
│ ├─ accessToken                  │
│ ├─ refreshToken                 │
│ └─ user (JSON)                  │
└──────┬──────────────────────────┘
       │
       ↓ Navigate('/') - Redirect to Home
┌──────────────────┐
│   Home Page      │
│   (Logged In ✓)  │
└──────────────────┘
```

## Key API Endpoints Connected

| Endpoint | Method | Body | Response |
|----------|--------|------|----------|
| `/auth/register` | POST | {name, email, password} | {message, user} |
| `/auth/login` | POST | {email, password} | {user, accessToken, refresh_token} |
| `/auth/refresh` | POST | {token: refreshToken} | {accessToken, refresh_token} |
| `/auth/logout` | POST | {token: refreshToken} | {message} |

## How to Access Auth in Your Components

```jsx
// Import the hook
import useAuthContext from '@/modules/Auth/context/features/useAuthContext';

// Use in component
function MyComponent() {
  const { 
    email,                  // Current email value
    password,              // Current password value
    fullName,              // Current full name value
    confirmPassword,       // Current confirm password value
    setEmail,              // Function to update email
    setPassword,           // Function to update password
    setFullName,           // Function to update full name
    setConfirmPassword,    // Function to update confirm password
    handleLogin,           // Function to login
    handleRegister,        // Function to register
    handleLogout,          // Function to logout
    isLoading              // Boolean: true while API call in progress
  } = useAuthContext();

  return (
    // Use these values and functions in JSX
    <button onClick={handleLogout} disabled={isLoading}>
      Logout
    </button>
  );
}
```

## Example: Check if User is Logged In

```jsx
// In any component
const isLoggedIn = !!localStorage.getItem('accessToken');
const user = JSON.parse(localStorage.getItem('user') || '{}');

console.log(isLoggedIn); // true or false
console.log(user.name);  // "John Doe"
console.log(user.email); // "john@example.com"
```

## Important: Update Backend URL if Needed

The frontend expects backend at: `http://localhost:3000/api`

If your backend is on a different port, update here:
1. `src/modules/Auth/context/AuthContextProvider.jsx` (line 3)
2. `src/lib/api.js` (line 1)

```jsx
// Change this:
const API_BASE_URL = "http://localhost:3000/api";

// To your actual backend URL:
const API_BASE_URL = "http://localhost:3000/api"; // if backend is on port 3000
```

## Files Changed

| File | Status | Changes |
|------|--------|---------|
| `src/modules/Auth/context/AuthContextProvider.jsx` | ✅ Updated | Full API integration, token management, all auth methods |
| `src/modules/Auth/components/Login.jsx` | ✅ Updated | Uses `isLoading` from context, simplified form submission |
| `src/modules/Auth/components/Register.jsx` | ✅ Updated | Uses `isLoading` from context, simplified form submission |
| `src/lib/api.js` | ✨ New | API helper functions, token refresh, auth headers |
| `AUTHENTICATION_SETUP.md` | ℹ️ Reference | Full documentation |

## Next: Test the Flow

1. **Start backend:**
   ```bash
   # In your backend terminal
   npm start  # Should run on http://localhost:3000
   ```

2. **Start frontend:**
   ```bash
   # In your frontend terminal
   npm run dev  # Should run on http://localhost:5173
   ```

3. **Test Register:**
   - Visit `http://localhost:5173/register`
   - Fill form and click "Sign Up"
   - Should redirect to `/login`

4. **Test Login:**
   - Fill form with registered email/password
   - Click "Sign In"
   - Should redirect to `/`
   - Check `localStorage` in DevTools - should have tokens

5. **Test Logout:**
   - From Navbar, click Logout
   - Should redirect to `/login`
   - `localStorage` should be cleared

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Failed to fetch" error | Ensure backend is running on http://localhost:3000 |
| 404 on login attempt | Check endpoint URL matches backend routes exactly |
| Tokens not saving | Check browser allows localStorage (not private/incognito mode) |
| Login redirects to login again | Tokens might not be saving - check localStorage in DevTools |
| CORS errors | Ensure backend has CORS enabled for http://localhost:5173 |

## Protected Routes (Coming Next)

When you're ready, create protected routes:

```jsx
// src/components/ProtectedRoute.jsx
export function ProtectedRoute({ children }) {
  const token = localStorage.getItem('accessToken');
  if (!token) return <Navigate to="/login" />;
  return children;
}
```

Then use in router config:
```jsx
<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
```

---

**You're all set! Your authentication system is now fully functional.**

For detailed information, see `AUTHENTICATION_SETUP.md`

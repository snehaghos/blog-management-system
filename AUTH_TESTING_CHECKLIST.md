# Authentication Testing Checklist

## Pre-Test Requirements ✓

- [ ] Backend server is running on `http://localhost:3000`
- [ ] Frontend dev server is running on `http://localhost:5173`
- [ ] Both servers have CORS configured properly
- [ ] MongoDB database is running (for backend)
- [ ] No errors in browser console (F12)

## Test 1: Register Flow

### Step 1: Navigate to Register Page
- [ ] Go to `http://localhost:5173/register`
- [ ] Page loads without errors
- [ ] Form fields visible: Full Name, Email, Password, Confirm Password, Account Type

### Step 2: Register with Valid Data
- [ ] Enter full name (e.g., "John Doe")
- [ ] Enter email (e.g., "john@example.com")
- [ ] Enter password (e.g., "password123")
- [ ] Confirm password (matching)
- [ ] Click "Sign Up" button
- [ ] Button shows "Creating account..." while loading
- [ ] See success toast: "Registration successful! Please login."
- [ ] Redirect to `/login` page

### Step 3: Verify Backend
- [ ] Check backend console - should log POST request to `/api/auth/register`
- [ ] Check database - new user record created
- [ ] User has fields: name, email, hashedPassword, role (default: "user")

## Test 2: Login Flow

### Step 1: Login with Registered Credentials
- [ ] On login page, enter email (from Test 1)
- [ ] Enter password (from Test 1)
- [ ] Click "Sign In"
- [ ] Button shows "Signing in..." while loading
- [ ] See success toast: "Login successful!"
- [ ] Redirect to home page (`/`)

### Step 2: Verify Token Storage
- [ ] Open DevTools (F12)
- [ ] Go to Application → Local Storage
- [ ] Check `accessToken` exists and is not empty (should be JWT)
- [ ] Check `refreshToken` exists and is not empty
- [ ] Check `user` contains: {name, email, id, role}

### Step 3: Verify Backend
- [ ] Check backend console - should log POST request to `/api/auth/login`
- [ ] Response should include `accessToken`, `refresh_token`, and `user` object

## Test 3: Protected User State

### Step 1: Check If User State is Accessible
- [ ] Open browser console (F12)
- [ ] Type: `JSON.parse(localStorage.getItem('user'))`
- [ ] Should return user object with name, email, id, role
- [ ] Navigate to different pages - user data should persist

### Step 2: Verify Navbar Updates
- [ ] Navbar should show user's name
- [ ] Logout button should be visible
- [ ] "Sign In" / "Sign Up" buttons should be hidden

## Test 4: Logout Flow

### Step 1: Logout
- [ ] Click "Logout" button in Navbar
- [ ] See success toast: "Logged out successfully"
- [ ] Redirect to login page (`/login`)

### Step 2: Verify Token Cleared
- [ ] Open DevTools → Local Storage
- [ ] `accessToken` should be deleted
- [ ] `refreshToken` should be deleted
- [ ] `user` should be deleted

### Step 3: Verify Page State
- [ ] Sign In / Sign Up buttons should be visible again
- [ ] User name should not display in Navbar

## Test 5: Login Failures

### Test 5A: Wrong Password
- [ ] Go to `/login`
- [ ] Enter correct email, wrong password
- [ ] Click "Sign In"
- [ ] Should see error toast: "Invalid credentials" or similar
- [ ] Should NOT redirect
- [ ] Tokens should NOT be created

### Test 5B: Email Not Found
- [ ] Go to `/login`
- [ ] Enter non-existent email
- [ ] Click "Sign In"
- [ ] Should see error toast
- [ ] Should NOT redirect
- [ ] Tokens should NOT be created

### Test 5C: Missing Fields
- [ ] Go to `/login`
- [ ] Leave email or password empty
- [ ] Click "Sign In"
- [ ] Should see error: "Please fill in all fields."
- [ ] Should NOT make API call
- [ ] Form values should persist

## Test 6: Register Failures

### Test 6A: Email Already Exists
- [ ] Try registering with an email that already exists
- [ ] Should see error toast: "Email already exists" (or similar)
- [ ] Should NOT redirect
- [ ] Form should remain filled

### Test 6B: Passwords Don't Match
- [ ] Go to `/register`
- [ ] Fill form but passwords don't match
- [ ] Click "Sign Up"
- [ ] Should see client error: "Passwords do not match."
- [ ] Should NOT make API call

### Test 6C: Missing Fields
- [ ] Leave one field empty
- [ ] Click "Sign Up"
- [ ] Should see error: "Please fill in all fields."
- [ ] Should NOT make API call

## Test 7: Token Refresh (Advanced)

### Step 1: Verify Token Refresh Mechanism
- [ ] Login successfully
- [ ] In browser console, simulate token expiration:
  ```javascript
  localStorage.setItem('accessToken', 'expired_token_here');
  ```
- [ ] Make an API call to a protected endpoint
- [ ] New token should be requested from `/api/auth/refresh`
- [ ] Old token should be replaced with new one

### Step 2: Verify Refresh Token Invalid
- [ ] Delete refresh token:
  ```javascript
  localStorage.removeItem('refreshToken');
  ```
- [ ] Set access token to invalid value
- [ ] Try to make authenticated request
- [ ] Should redirect to login (token refresh fails)

## Test 8: Multiple Tabs/Windows

- [ ] Open login page in Tab 1
- [ ] Login successfully
- [ ] Check localStorage in Tab 1 - tokens present
- [ ] Open same site in Tab 2 (new window)
- [ ] Tab 2 should show user as logged in
- [ ] Logout in Tab 1
- [ ] Refresh Tab 2 - should redirect to login

## Test 9: Session Persistence

- [ ] Login successfully
- [ ] Refresh the page (F5)
- [ ] User should still be logged in (no redirect)
- [ ] Close browser completely
- [ ] Reopen and navigate to `http://localhost:5173/`
- [ ] User should still be logged in
- [ ] Navigate to `/login` - since logged in, might redirect to home (depends on route protection)

## Test 10: Role-Based Navigation

### For Author Role
- [ ] Register with email, password, and "Author" role (if available)
- [ ] Login
- [ ] Check localStorage: `user.role` should be "author"
- [ ] Dashboard link for authors should be visible

### For Admin Role
- [ ] If admin exists in database, login with admin account
- [ ] Check localStorage: `user.role` should be "admin"
- [ ] Admin dashboard link should be visible

## Performance Tests

- [ ] Login process completes in < 2 seconds
- [ ] Register process completes in < 2 seconds
- [ ] No console warnings/errors during auth flow
- [ ] No memory leaks when logging in/out multiple times

## API Response Validation

### Login Response Structure
```json
{
  "user": {
    "id": "...",
    "name": "...",
    "email": "...",
    "role": "..."
  },
  "accessToken": "eyJ...",
  "refresh_token": "eyJ..."
}
```
- [ ] Check response matches this structure

### Register Response Structure
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
- [ ] Check response matches this structure

## Common Issues to Check

| Issue | Check |
|-------|-------|
| Always redirects to login | Check if tokens are actually saving in localStorage |
| "Failed to fetch" errors | Backend not running or CORS issue |
| Tokens not saving | Check browser localStorage is enabled |
| Login button always loading | Check API response format matches expected |
| Page jumps/flickers | Check if ProtectedRoute causes re-renders |

## Success Criteria

All tests pass when:
- ✅ User can register with new account
- ✅ User can login with correct credentials
- ✅ User cannot login with wrong password
- ✅ Tokens are saved in localStorage after login
- ✅ User can logout and tokens are cleared
- ✅ Session persists on page refresh
- ✅ No console errors during auth flows
- ✅ API calls match backend expectations

---

**Run through this checklist to ensure your authentication system works perfectly!**

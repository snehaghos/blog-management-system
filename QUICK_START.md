# 🚀 Authentication Integration - Quick Start

## What's Complete ✅

Your frontend authentication is now **fully integrated** with your Express.js backend:

- ✅ Login endpoint connected (`POST /api/auth/login`)
- ✅ Register endpoint connected (`POST /api/auth/register`)
- ✅ Token storage in localStorage
- ✅ Token refresh mechanism
- ✅ Logout endpoint connected (`POST /api/auth/logout`)
- ✅ Error handling with toast notifications
- ✅ Loading states on buttons
- ✅ Automatic redirects after auth actions

## 5-Minute Setup

### 1. Verify Backend URL
Check your backend is running on `http://localhost:3000`

If different, update in:
- `src/modules/Auth/context/AuthContextProvider.jsx` (line 6)
- `src/lib/api.js` (line 1)

### 2. Start Your Servers

**Terminal 1 - Backend:**
```bash
cd your-backend-folder
npm start
# Should see: "Server running on port 3000"
```

**Terminal 2 - Frontend:**
```bash
cd blog-management-system
npm run dev
# Should see: "http://localhost:5173"
```

### 3. Test Registration
- Go to `http://localhost:5173/register`
- Fill in form (name, email, password)
- Click "Sign Up"
- See success message
- Redirected to login

### 4. Test Login
- Go to `http://localhost:5173/login`
- Use email/password from registration
- Click "Sign In"
- See success message
- Redirected to home
- Check DevTools → Local Storage → `accessToken` exists

### 5. Test Logout
- Click Logout button in Navbar
- Tokens cleared from localStorage
- Redirected to login

**Done!** Your auth system is working.

## Key Files

| File | Purpose |
|------|---------|
| `src/modules/Auth/context/AuthContextProvider.jsx` | Core auth logic, API calls |
| `src/modules/Auth/components/Login.jsx` | Login form |
| `src/modules/Auth/components/Register.jsx` | Register form |
| `src/lib/api.js` | API utilities, token management |
| `src/modules/Auth/context/features/useAuthContext.jsx` | Hook to use auth anywhere |

## Using Auth in Your Components

```jsx
import useAuthContext from '@/modules/Auth/context/features/useAuthContext';

function MyComponent() {
  const { email, setEmail, password, setPassword, handleLogin, isLoading } = useAuthContext();
  
  // Use in your component...
}
```

## Check If User is Logged In

```jsx
const isLoggedIn = !!localStorage.getItem('accessToken');
const user = JSON.parse(localStorage.getItem('user') || '{}');
console.log(user.name); // "John Doe"
```

## Documentation

For detailed information, read:
- **AUTH_INTEGRATION_SUMMARY.md** - Visual overview
- **AUTHENTICATION_SETUP.md** - Complete setup guide
- **AUTH_CODE_EXAMPLES.md** - 12 real-world examples
- **AUTH_TESTING_CHECKLIST.md** - Test all scenarios
- **NAVBAR_EXAMPLE.jsx** - How to update Navbar

## Common Questions

**Q: Where are tokens stored?**
A: In browser `localStorage` with keys: `accessToken`, `refreshToken`, `user`

**Q: Can I change the backend URL?**
A: Yes, update `API_BASE_URL` in AuthContextProvider.jsx line 6

**Q: How do I protect routes?**
A: See AUTH_CODE_EXAMPLES.md example #2 (ProtectedRoute component)

**Q: How do I show different UI for different roles?**
A: See AUTH_CODE_EXAMPLES.md example #7 (Role-based component)

**Q: How do I make authenticated API calls?**
A: See AUTH_CODE_EXAMPLES.md example #4 (API calls with token)

**Q: What if tokens expire?**
A: Automatic refresh from `src/lib/api.js` (refreshAccessToken function)

**Q: Can I use this in multiple tabs?**
A: Yes, localStorage is synced across tabs. See example #11 for sync hook

## Troubleshooting

| Problem | Solution |
|---------|----------|
| 404 errors on login | Check backend routes match: `/api/auth/login`, `/api/auth/register` |
| Tokens not saving | Check localStorage enabled in browser |
| "Failed to fetch" | Backend not running or CORS issue |
| Still redirects to login | Check tokens are actually in localStorage (DevTools) |

## Next Steps

1. ✅ Test the flow (register → login → check tokens)
2. Create ProtectedRoute component (see example #2)
3. Update Navbar to show user info
4. Create user profile page
5. Implement role-based navigation

---

**Everything is ready! Start testing your authentication flow now.** 🎉

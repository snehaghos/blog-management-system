# Common Authentication Use Cases - Code Examples

## 1. Check if User is Logged In

```jsx
// Method 1: Check if token exists
const isLoggedIn = !!localStorage.getItem('accessToken');

// Method 2: Get full user object
const user = JSON.parse(localStorage.getItem('user') || '{}');
const isLoggedIn = !!user?.id;

// Method 3: Use in conditional rendering
{isLoggedIn ? (
  <span>Welcome, {user.name}!</span>
) : (
  <span>Please log in</span>
)}
```

## 2. Create a Protected Route Component

```jsx
// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Check if user is logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role (optional)
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// Usage in router:
import { ProtectedRoute } from '@/components/ProtectedRoute';

const routes = [
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminPanel />
      </ProtectedRoute>
    ),
  },
];
```

## 3. Get User Info in Any Component

```jsx
// src/hooks/useUser.js
export function useUser() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = !!localStorage.getItem('accessToken');

  return {
    user,
    isLoggedIn,
    name: user.name || '',
    email: user.email || '',
    role: user.role || 'user',
    id: user.id || '',
  };
}

// Usage in any component:
import { useUser } from '@/hooks/useUser';

function Profile() {
  const { user, isLoggedIn, name, email } = useUser();

  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
```

## 4. Make Authenticated API Calls

```jsx
// Method 1: Using the apiCall helper
import { apiCall } from '@/lib/api';

async function fetchUserPosts() {
  const response = await apiCall('/posts/my-posts');
  const data = await response.json();
  return data;
}

// Method 2: Manual fetch with token
async function fetchUserPosts() {
  const token = localStorage.getItem('accessToken');
  const response = await fetch('http://localhost:3000/api/posts/my-posts', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

// Method 3: In a component with useEffect
import { useEffect, useState } from 'react';

function MyPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:3000/api/posts/my-posts', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>{post.title}</article>
      ))}
    </div>
  );
}
```

## 5. Handle Logout in Navbar

```jsx
// src/components/Navbar.jsx
import useAuthContext from '@/modules/Auth/context/features/useAuthContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { handleLogout, isLoading } = useAuthContext();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = !!localStorage.getItem('accessToken');

  const handleLogoutClick = async () => {
    await handleLogout();
    // handleLogout already redirects, but you can do extra things here
  };

  return (
    <nav>
      {isLoggedIn ? (
        <>
          <span>Welcome, {user.name}</span>
          <button onClick={handleLogoutClick} disabled={isLoading}>
            {isLoading ? 'Logging out...' : 'Logout'}
          </button>
        </>
      ) : (
        <>
          <a href="/login">Sign In</a>
          <a href="/register">Sign Up</a>
        </>
      )}
    </nav>
  );
}

export default Navbar;
```

## 6. Update User Profile After Login

```jsx
// If you need to fetch additional user data after login
async function fetchAndUpdateUserProfile() {
  const token = localStorage.getItem('accessToken');
  const response = await fetch('http://localhost:3000/api/user/profile', {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  
  if (!response.ok) {
    // Token might be invalid, logout
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
    return;
  }

  const profileData = await response.json();
  
  // Update user in localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const updatedUser = { ...user, ...profileData };
  localStorage.setItem('user', JSON.stringify(updatedUser));

  return updatedUser;
}
```

## 7. Show Different UI Based on Role

```jsx
// src/components/RoleBasedComponent.jsx
function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { role } = user;

  return (
    <div>
      {role === 'admin' && (
        <section>
          <h2>Admin Controls</h2>
          {/* Admin UI */}
        </section>
      )}

      {role === 'author' && (
        <section>
          <h2>Author Dashboard</h2>
          {/* Author UI */}
        </section>
      )}

      {role === 'user' && (
        <section>
          <h2>User Home</h2>
          {/* User UI */}
        </section>
      )}
    </div>
  );
}

export default Dashboard;
```

## 8. Handle Errors During Authentication

```jsx
// Authentication error handling examples
async function handleAuthError(error) {
  if (error.response?.status === 401) {
    // Unauthorized - token expired or invalid
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  } else if (error.response?.status === 403) {
    // Forbidden - user doesn't have permission
    console.error('Access denied');
  } else if (error.response?.status === 400) {
    // Bad request - validation error
    console.error('Invalid input:', error.response.data);
  } else {
    // Network or server error
    console.error('An error occurred:', error);
  }
}

// Usage in fetch:
try {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
} catch (error) {
  await handleAuthError(error);
}
```

## 9. Auto-Redirect on Login

```jsx
// Redirect user to requested page after login
function Login() {
  const { handleLogin, isLoading, email, setEmail, password, setPassword } = useAuthContext();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect') || '/';

  const handleSubmit = async (e) => {
    await handleLogin(e);
    // Redirect to requested page or home
    navigate(redirectPath);
  };

  return (
    // Form JSX...
  );
}

// Generate login link with redirect:
<Link to={`/login?redirect=/dashboard`}>Login to access dashboard</Link>
```

## 10. Token Validation Hook

```jsx
// src/hooks/useTokenValidity.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useTokenValidity() {
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        setIsValid(false);
        return;
      }

      // Try to use the token
      try {
        const response = await fetch('http://localhost:3000/api/user/profile', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.status === 401) {
          // Token invalid
          localStorage.removeItem('accessToken');
          setIsValid(false);
          navigate('/login');
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        setIsValid(false);
      }
    };

    checkToken();
  }, [navigate]);

  return isValid;
}

// Usage:
function ProtectedComponent() {
  const isValid = useTokenValidity();

  if (!isValid) {
    return <Navigate to="/login" />;
  }

  return <Dashboard />;
}
```

## 11. Sync Auth State Across Tabs

```jsx
// src/hooks/useSyncAuthAcrossTabs.js
import { useEffect } from 'react';

export function useSyncAuthAcrossTabs() {
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'accessToken') {
        // Token changed in another tab
        if (!e.newValue) {
          // User logged out in another tab
          window.location.href = '/login';
        } else {
          // User logged in in another tab
          window.location.href = '/';
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
}

// Usage in main App component:
import { useSyncAuthAcrossTabs } from '@/hooks/useSyncAuthAcrossTabs';

function App() {
  useSyncAuthAcrossTabs();
  return <Outlet />;
}
```

## 12. Request Interceptor for All Requests

```jsx
// src/lib/apiClient.js
export class ApiClient {
  constructor(baseURL = 'http://localhost:3000/api') {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const token = localStorage.getItem('accessToken');

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      // Unauthorized - logout
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }

    return response;
  }

  get(endpoint, options) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, data, options) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data, options) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint, options) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

// Usage:
const api = new ApiClient();

// In components:
const response = await api.get('/user/profile');
const data = await response.json();
```

---

**Pick the patterns that best fit your use case!**

import {lazy} from 'react';
const AuthorDashboard = lazy(() => import('./components/AuthorDashboard'));
const AuthorPosts = lazy(() => import('./components/AuthorPosts'));
const CreatePost = lazy(() => import('./components/CreatePost'));
export { AuthorDashboard, AuthorPosts, CreatePost };
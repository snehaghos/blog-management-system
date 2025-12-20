import {lazy} from 'react';
const AuthorDashboard = lazy(() => import('./components/AuthorDashboard'));
const AuthorPosts = lazy(() => import('./components/AuthorPosts'));
const CreatePost = lazy(() => import('./components/CreatePost'));
const EditPost = lazy(() => import('./components/EditPost'));
const AuthorProfile = lazy(() => import('./components/AuthorProfile'));
export { AuthorDashboard, AuthorPosts, CreatePost, EditPost, AuthorProfile };
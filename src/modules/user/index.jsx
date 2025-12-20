import {lazy} from 'react';

const UserHome = lazy(() => import('./components/UserHome'));
const ReaderProfile = lazy(() => import('./components/ReaderProfile'));

export {  UserHome, ReaderProfile };
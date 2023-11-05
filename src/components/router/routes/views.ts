import { lazy } from 'react';

/** Lazy loaded views */
export const SignIn = lazy(() => import('../../../views/SignIn'));
export const PageNotFound = lazy(() => import('@/components/reuseables/Misc/PageNotFound'));

 // Dashboard
export const Dashboard = lazy(() => import('@/views/Dashboard'));


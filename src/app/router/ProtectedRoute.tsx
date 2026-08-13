import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { tokenStorage } from '../../features/auth/storage/tokenStorage';

export function ProtectedRoute() {
  const location = useLocation();

  const token = tokenStorage.getToken();

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return <Outlet />;
}
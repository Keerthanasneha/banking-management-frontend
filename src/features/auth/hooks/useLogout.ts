import { useNavigate } from 'react-router-dom';

import { tokenStorage } from '../storage/tokenStorage';

export function useLogout() {
  const navigate = useNavigate();

  const logout = () => {
    // Remove JWT
    tokenStorage.clearToken();

    // Go back to login
    navigate('/login', {
      replace: true,
    });
  };

  return logout;
}
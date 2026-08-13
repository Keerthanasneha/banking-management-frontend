import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { authApi, type LoginRequest } from '../api/authApi';

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (request: LoginRequest) => {
      const response = await authApi.login(request);

      return response.data;
    },

    onSuccess: (_, variables) => {
  navigate('/otp-verification', {
    state: {
      email: variables.email,
    },
  });
},
  });
}
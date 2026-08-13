import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import {
  authApi,
  type VerifyOtpRequest,
} from '../api/authApi';

import { tokenStorage } from '../storage/tokenStorage';

export function useVerifyOtp() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (request: VerifyOtpRequest) => {
      const response = await authApi.verifyOtp(request);

      return response.data;
    },

    onSuccess: (data) => {
      tokenStorage.setToken(data.token);

      navigate('/dashboard', {
        replace: true,
      });
    },
  });
}
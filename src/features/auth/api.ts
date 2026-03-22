import { useMutation } from '@tanstack/react-query';
import { loginWithCredentials, useAuthStore } from '@/stores/authStore';

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginWithCredentials(email, password),
    onSuccess: ({ user, token }) => {
      setAuth(user, token);
    },
  });
};

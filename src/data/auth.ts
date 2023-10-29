import { useMutation } from "@tanstack/react-query";
import client from "./client";

export function useLogin() {
  return useMutation({ mutationFn: client.auth.login });
}

export const useRegisterMutation = () => {
  // const queryClient = useQueryClient();
  // const { t } = useTranslation();

  return useMutation({
    mutationFn: client.auth.register,
    // onSuccess: () => {
    //   toast.success(t('common:successfully-register'));
    // },
    // // Always refetch after error or success:
    // onSettled: () => {
    //   queryClient.invalidateQueries(API_ENDPOINTS.REGISTER);
    // },
  });
};

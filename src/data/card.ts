import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "./client/api-endpoints";
import client from "./client";

// export function useCardsIssues(params?: any, options?: any) {
//     // const { isAuthorized } = useMe();

//     const { data, isLoading, error } = useQuery<Card[], Error>(
//       [API_ENDPOINTS.CARDS, params],
//       () => client.cards.all(params),
//       {
//         enabled: isAuthorized,
//         ...options,
//       }
//     );

//     return {
//       cards: data ?? [],
//       isLoading,
//       error,
//     };
//   }

export const useIssueCardMutation = () => {
  // const queryClient = useQueryClient();
  // const { t } = useTranslation();

  return useMutation({
    mutationFn: client.cards.issueCard,
    // onSuccess: () => {
    //   toast.success(t('common:successfully-register'));
    // },
    // // Always refetch after error or success:
    // onSettled: () => {
    //   queryClient.invalidateQueries(API_ENDPOINTS.REGISTER);
    // },
  });
};

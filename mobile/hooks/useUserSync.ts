import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/expo";
import { useApiClient, userApi } from "../utils/api";

export const useUserSync = () => {
  const { isSignedIn } = useAuth();
  const api = useApiClient();

  const syncUserMututation = useMutation({
    mutationFn: () => userApi.syncUser(api),
    onSuccess: (response: any) =>
      console.log("User synced sucessfully:", response.data.user),
    onError: (error: any) => {
      console.error("Sync status:", error.response?.status);
      console.error("Sync response:", error.response?.data);
    },
  });

  useEffect(() => {
    // if user is signed in and user is not synced yet sync user
    if (isSignedIn && !syncUserMututation.data) {
      syncUserMututation.mutate();
    }
  }, [isSignedIn]);
  return null;
};

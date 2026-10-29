import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../utils/api";
import { Notification } from "../types/index.types";

export const useNotifications = () => {
	const api = useApiClient();
	const queryClient = useQueryClient();

	const {
		data: notificationData,
		isLoading,
		error,
		refetch,
		isRefetching,
	} = useQuery({
		queryKey: ["notifications"],
		queryFn: () => api.get("/notifications"),
		select: (res) => res.data.notifications,
	});

	const deleteNotificationMutation = useMutation({
		mutationFn: (notificationId: string) =>
			api.delete(`/notifications/${notificationId}`),
		onSuccess: (res) => {
			queryClient.invalidateQueries({ queryKey: ["notifications"] });
			console.log("notification deleted successfully", res.status);
		},
	});

	const deleteNotification = (notificationId: string) => {
		deleteNotificationMutation.mutate(notificationId);
	};

	return {
		notifications: (notificationData as Notification[]) || [],
		isLoading,
		error,
		refetch,
		isRefetching,
		deleteNotification,
		isDeletingNotification: deleteNotificationMutation.isPending,
	};
};

import {
	View,
	Text,
	TouchableOpacity,
	ActivityIndicator,
	RefreshControl,
	FlatList,
} from "react-native";
import { useNotifications } from "../../../hooks/useNotifications";
import { Feather } from "@expo/vector-icons";
import NoNotificationsFound from "@/components/NonotificationCard";
import NotificationCard from "@/components/NotificationCard";

const NotificationsScreen = () => {
	const {
		notifications,
		isLoading,
		error,
		refetch,
		isRefetching,
		deleteNotification,
	} = useNotifications();
	if (error) {
		return (
			<View className="flex-1 items-center justify-center p-8">
				<Text className="text-gray-500 mb-4">Failed to load notifications</Text>
				<TouchableOpacity
					className="bg-blue-500 px-4 py-2 rounded-lg"
					onPress={() => refetch()}>
					<Text className="text-white font-semibold">Retry</Text>
				</TouchableOpacity>
			</View>
		);
	}
	return (
		<View className="flex-1">
			{isLoading ? (
				<View className="flex-1 items-center justify-center p-8">
					<ActivityIndicator size="large" color="#1DA1F2" />
					<Text className="text-gray-500 mt-4">Loading notifications...</Text>
				</View>
			) : (
				<FlatList
					data={notifications}
					renderItem={({ item }) => (
						<NotificationCard
							key={item._id}
							notification={item}
							onDelete={deleteNotification}
						/>
					)}
					keyExtractor={(item) => item._id}
					ListEmptyComponent={() => <NoNotificationsFound />}
					refreshControl={
						<RefreshControl
							refreshing={isRefetching}
							onRefresh={refetch}
							tintColor={"#1DA1F2"}
						/>
					}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 100 }}
					className="w-full"
					ListHeaderComponent={
						<View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
							<Text className="text-xl font-bold text-gray-900">
								Notifications
							</Text>
							<TouchableOpacity>
								<Feather name="settings" size={24} color="#657786" />
							</TouchableOpacity>
						</View>
					}
				/>
			)}
		</View>
	);
};

export default NotificationsScreen;

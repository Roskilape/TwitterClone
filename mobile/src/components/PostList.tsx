import {
	View,
	Text,
	ActivityIndicator,
	TouchableOpacity,
	FlatList,
	RefreshControl,
} from "react-native";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { usePosts } from "../../hooks/usePost";
import PostCard from "./PostCard";
import { Post } from "../../types/index.types";
import { useState } from "react";
import CommentsModal from "./CommentsModal";
import ProfileComponentHeader from "./ProfileComponentHeader";
import { Ionicons } from "@expo/vector-icons";
import SignOutButton from "./SignOutButton";
import PostComposer from "./PostComposer";

interface PostListProps {
	username?: string;
	screenType: "home" | "profile";
	openEditModal?: () => void;
}

const PostList = ({ username, screenType, openEditModal }: PostListProps) => {
	const { currentUser } = useCurrentUser();
	const [selectedPostId, setSelectedPostId] = useState<string | null>();
	const {
		posts,
		isLoading,
		error,
		toggleLike,
		refetch,
		deletePost,
		checkIsLiked,
		isRefetching,
	} = usePosts(username);

	const selectedPost = selectedPostId
		? posts.find((p: Post) => p._id === selectedPostId)
		: null;
	if (isLoading) {
		return (
			<View className="p-8 items-center">
				<ActivityIndicator size="large" color="#1DA1F2" />
				<Text className="text-gray-500 mt-2">Loading posts...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View className="p-8 items-center">
				<Text className="text-gray-500 mb-4">Failed to load posts</Text>
				<TouchableOpacity
					className="bg-blue-500 px-4 py-2 rounded-lg"
					onPress={() => refetch()}>
					<Text className="text-white font-semibold">Retry</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View>
			<FlatList
				data={posts}
				renderItem={({ item }) => (
					<PostCard
						post={item}
						onDelete={deletePost}
						onLike={toggleLike}
						currentUser={currentUser}
						isLiked={checkIsLiked(item.likes, currentUser)}
						onComment={(item) => setSelectedPostId(item._id)}
					/>
				)}
				keyExtractor={(item) => item._id}
				ListEmptyComponent={
					<View className="p-8 items-center">
						<Text className="text-gray-500">No post yet</Text>
					</View>
				}
				ListHeaderComponent={
					screenType === "profile" ? (
						<ProfileComponentHeader
							currentUser={currentUser}
							openEditModal={openEditModal ? openEditModal : () => {}}
							totalPost={posts.length}
						/>
					) : (
						<>
							<View className="flex-row justify-between px-4 py-3 border-b border-gray-100">
								<Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
								<Text className="text-xl font-bold text-gray-900">Home</Text>
								<SignOutButton />
							</View>

							<PostComposer />
						</>
					)
				}
				refreshControl={
					<RefreshControl
						refreshing={isRefetching}
						onRefresh={refetch}
						tintColor={"#1DA1F2"}
					/>
				}
			/>

			<CommentsModal
				selectedPost={selectedPost}
				onClose={() => setSelectedPostId(null)}
			/>
		</View>
	);
};

export default PostList;

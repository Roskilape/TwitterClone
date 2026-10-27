import { useComments } from "../../hooks/useComments";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { Post } from "../../types/index.types";
import {
	View,
	Text,
	Modal,
	TouchableOpacity,
	ScrollView,
	Image,
	FlatList,
	TextInput,
	ActivityIndicator,
} from "react-native";

interface CommentsModalProps {
	selectedPost: Post | null | undefined;
	onClose: () => void;
}

const CommentsModal = ({ selectedPost, onClose }: CommentsModalProps) => {
	const { commentText, setCommentText, createComment, isCreatingComment } =
		useComments();
	const { currentUser } = useCurrentUser();

	const handleClose = () => {
		onClose();
		setCommentText("");
	};

	return (
		<Modal
			visible={!!selectedPost}
			animationType="slide"
			presentationStyle="pageSheet">
			{/* MODAL HEADER */}
			<View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
				<TouchableOpacity onPress={handleClose}>
					<Text className="text-blue-500 text-lg">close</Text>
				</TouchableOpacity>
				<Text className="text-lg font-semibold">Comments</Text>
				<View className="w-12" />
			</View>
			{selectedPost && (
				<ScrollView className="flex-1">
					{/* OROGINAL POST */}
					<View className="border-b border-gray-100 bg-white p-4">
						<View className="flex-row">
							<Image
								source={{ uri: selectedPost.user.profilePicture }}
								className="size-12 rounded-full mr-3"
							/>
							<View className="flex-1">
								<View className="flex-row items-center mb-1">
									<Text className="font-bold text-gray-900 mr-1">
										{selectedPost.user.firstName} {selectedPost.user.lastName}
									</Text>
									<Text className="text-gray-500 ml-1">
										@{selectedPost.user.username}
									</Text>
								</View>
								{selectedPost.content && (
									<Text className="text-gray-900 text-base leading-5 mb-3">
										{selectedPost.content}
									</Text>
								)}
								{selectedPost.image && (
									<Image
										source={{ uri: selectedPost.image }}
										className="w-full h-48 rounded-2xl mb-3"
										resizeMode="cover"
									/>
								)}
							</View>
						</View>
					</View>
					<FlatList
						data={selectedPost.comments}
						renderItem={({ item }) => (
							<View className="border-b border-gray-100 bg-red-100">
								<View className="flex-row">
									<Image
										source={{ uri: item.user.profilePicture }}
										className="size-10 rounded-full mr-3"
									/>
									<View className="flex-1">
										<View className="flex-row" items-center mb-1>
											<Text>
												{item.user.firstName} {item.user.lastName}
											</Text>
											<Text className="text-gray-500 ml-1">
												@{item.user.username}
											</Text>
										</View>
										<Text className="text-gray-900 text-base leading-5 mb-2">
											{item.content}
										</Text>
									</View>
								</View>
							</View>
						)}
						keyExtractor={(item) => item._id}
					/>
					{/* ADD COMMENT INPUT */}
					<View className="p-4 border-t border-gray-100">
						<View className="flex-row">
							<Image
								source={{ uri: currentUser?.profilePicture }}
								className="size-10 rounded-full mr-3"
							/>
							<View>
								<TextInput
									className="border border-gray-200 rounded-lg p-3 text-base mb-3"
									placeholder="write a comment..."
									value={commentText}
									onChangeText={setCommentText}
									multiline
									numberOfLines={3}
									textAlignVertical="top"
								/>

								<TouchableOpacity
									className={`px-4 py-2 rounded-lg self-start ${
										commentText.trim() ? "bg-blue-500" : "bg-gray-300"
									}`}
									onPress={() => createComment(selectedPost._id)}
									disabled={isCreatingComment || !commentText.trim()}>
									{isCreatingComment ? (
										<ActivityIndicator size={"small"} color={"white"} />
									) : (
										<Text
											className={`font-semibold ${
												commentText.trim() ? "text-white" : "text-gray-500"
											}`}>
											Reply
										</Text>
									)}
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</ScrollView>
			)}
		</Modal>
	);
};

export default CommentsModal;

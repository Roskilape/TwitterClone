import { useComments } from "../../hooks/useComments";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { Post } from "../../types/index.types";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
	FlatList,
	TextInput,
	ActivityIndicator,
} from "react-native";
import CommentHeaderComponent from "./CommentHeaderComponent";
import CommentFooterComponent from "./CommentFooterComponent";
import SheetModal from "./SheetModal";

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
		<SheetModal visible={!!selectedPost} onClose={handleClose}>
			{/* MODAL HEADER */}
			<View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
				<TouchableOpacity onPress={handleClose}>
					<Text className="text-blue-500 text-lg">close</Text>
				</TouchableOpacity>
				<Text className="text-lg font-semibold">Comments</Text>
				<View className="w-12" />
			</View>
			{selectedPost && (
				<>
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
						ListHeaderComponent={
							<CommentHeaderComponent selectedPost={selectedPost} />
						}
						ListFooterComponent={
							<CommentFooterComponent
								currentUser={currentUser}
								commentText={commentText}
								setCommentText={setCommentText}
								createComment={createComment}
								isCreatingComment={isCreatingComment}
								selectedPost={selectedPost}
							/>
						}
						className="flex-1"
					/>
				</>
			)}
		</SheetModal>
	);
};

export default CommentsModal;

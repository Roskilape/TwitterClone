import {
	View,
	Text,
	Image,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { Post, User } from "../../types/index.types";
import { Dispatch, SetStateAction } from "react";

interface CommentFooterProps {
	currentUser: User;
	commentText: string;
	setCommentText: Dispatch<SetStateAction<string>>;
	createComment: (value: string) => void;
	isCreatingComment: boolean;
	selectedPost: Post;
}

const CommentFooterComponent = ({
	currentUser,
	commentText,
	setCommentText,
	createComment,
	isCreatingComment,
	selectedPost,
}: CommentFooterProps) => {
	return (
		<View className="p-4 border-t border-gray-100">
			<View className="flex-row">
				<Image
					source={{ uri: currentUser?.profilePicture }}
					className="size-10 rounded-full mr-3"
				/>
				<View>
					<TextInput
						className="border border-gray-200 w-full rounded-lg p-3 text-base mb-3"
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
	);
};

export default CommentFooterComponent;

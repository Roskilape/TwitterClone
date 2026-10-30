import { View, Text, Image } from "react-native";

import { Post } from "../../types/index.types";

const CommentHeaderComponent = ({ selectedPost }: { selectedPost: Post }) => {
	return (
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
	);
};

export default CommentHeaderComponent;

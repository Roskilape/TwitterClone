import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postApi, useApiClient, userApi } from "../utils/api";
import { Post } from "../types/index.types";

export const usePosts = (username?: string) => {
	const api = useApiClient();
	const queryClient = useQueryClient();
	api.get("/posts");
	const {
		data: postsData,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: username ? ["userPost", username] : ["posts"],
		queryFn: () =>
			username ? postApi.getUserPost(api, username) : postApi.getPosts(api),
		select: (response) => response.data.posts,
	});

	const likePostMutation = useMutation({
		mutationFn: (postId: string) => postApi.likePost(api, postId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			if (username) {
				queryClient.invalidateQueries({ queryKey: ["userPosts", username] });
			}
		},
	});
	const deletePostMutation = useMutation({
		mutationFn: (postId: string) => postApi.deletePost(api, postId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			if (username) {
				queryClient.invalidateQueries({ queryKey: ["userPosts", username] });
			}
		},
	});

	const checkIsLiked = (postLikes: string[], currentUser: any) => {
		const isLiked = currentUser && postLikes.includes(currentUser._id);
		return isLiked;
	};
	return {
		posts: (postsData as Post[]) || [],
		isLoading,
		error,
		refetch,
		toggleLike: (postId: string) => likePostMutation.mutate(postId),
		deletePost: (postId: string) => deletePostMutation.mutate(postId),
		checkIsLiked,
	};
};

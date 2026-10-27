import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postApi, useApiClient, userApi } from "../utils/api";
import { Post } from "../types/index.types";

export const usePosts = () => {
	const api = useApiClient();
	const queryClient = useQueryClient();
	api.get("/posts");
	const {
		data: postsData,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: () => postApi.getPosts(api),
		select: (response) => response.data.posts,
	});

	const likePostMutation = useMutation({
		mutationFn: (postId: string) => postApi.likePost(api, postId),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
	});
	const deletePostMutation = useMutation({
		mutationFn: (postId: string) => postApi.deletePost(api, postId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			queryClient.invalidateQueries({ queryKey: ["userPosts"] });
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

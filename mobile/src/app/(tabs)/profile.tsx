import {
	View,
	Text,
	ActivityIndicator,
	ScrollView,
	Image,
	TouchableOpacity,
	RefreshControl,
} from "react-native";
import React from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import SignOutButton from "@/components/SignOutButton";
import { Feather } from "@expo/vector-icons";
import { format } from "date-fns";
import { usePosts } from "../../../hooks/usePost";
import PostList from "@/components/PostList";
import { useProfile } from "../../../hooks/useProfile";
import EditProfileModal from "@/components/EditProfileModal";

const ProfileScreen = () => {
	const { currentUser, isLoading } = useCurrentUser();

	const {
		isEditModalVisible,
		openEditModal,
		closeEditModal,
		formData,
		saveProfile,
		updateFormField,
		isUpdating,
	} = useProfile();

	if (isLoading) {
		return (
			<View className="flex-1 bg-white items-center justify-center">
				<ActivityIndicator size="large" color="#1DA1F2" />
			</View>
		);
	}
	return (
		<View className="flex-1">
			<PostList
				username={currentUser?.username}
				screenType="profile"
				openEditModal={openEditModal}
			/>

			<EditProfileModal
				isVisible={isEditModalVisible}
				onClose={closeEditModal}
				formData={formData}
				saveProfile={saveProfile}
				updateFormField={updateFormField}
				isUpdating={isUpdating}
			/>
		</View>
	);
};

export default ProfileScreen;

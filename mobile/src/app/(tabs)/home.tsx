import SignOutButton from "@/components/SignOutButton";
import { View, Text, ScrollView } from "react-native";
import { useUserSync } from "../../../hooks/useUserSync";
import { Ionicons } from "@expo/vector-icons";
import PostComposer from "@/components/PostComposer";
import PostList from "@/components/PostList";

const HomeScreen = () => {
	useUserSync();
	return (
		<View className="flex-1 bg-white">
			<PostList screenType="home" />
		</View>
	);
};

export default HomeScreen;

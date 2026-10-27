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
      <View className="flex-row justify-between px-4 py-3 border-b border-gray-100">
        <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
        <Text className="text-xl font-bold text-gray-900">Home</Text>
        <SignOutButton />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <PostComposer />
        <PostList />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

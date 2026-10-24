import { Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const TRENDING_TOPICS = [
  {
    topic: "#ReactNative",
    tweets: "125k",
  },
  {
    topic: "#TypeScript",
    tweets: "89k",
  },
  {
    topic: "#WebDevelopment",
    tweets: "234k",
  },
  {
    topic: "#AI",
    tweets: "567k",
  },
  {
    topic: "#TechNews",
    tweets: "98k",
  },
];

const searchScreen = () => {
  return (
    <View className="px-4 py-3 border-b border-gray-100">
      <View className="flex-row items-center bg-gray-50 rounded-full px-4 py-3">
        <Feather name="search" size={20} color={"#657786"} />
        <TextInput
          placeholder="Search Twitter"
          className="flex-1 ml-3 text-base"
          placeholderTextColor="#657786"
        />
      </View>
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Trending for you
          </Text>
          {TRENDING_TOPICS.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="py-3 border-b border-gray-100"
            >
              <Text className="text-gray-500 text-sm">
                Trending in Technology
              </Text>
              <Text className="font-bold text-gray-900 text-lg">
                {item.topic}
              </Text>
              <Text className="text-gray-500 text-sm">{item.tweets}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default searchScreen;

import { Redirect, Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "@clerk/expo";

const TabsLayout = () => {
	const { isSignedIn } = useAuth();
	if (!isSignedIn) return <Redirect href="/(auth)" />;
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#1DAIF2",
				tabBarInactiveTintColor: "#657786",
				tabBarStyle: {
					backgroundColor: "#fff",
					borderTopWidth: 1,
					borderTopColor: "#E1E8ED",
					height: 50,
					paddingTop: 8,
				},
				headerShown: false,
			}}>
			<Tabs.Screen
				name="home"

				options={{
					title: "",
					tabBarIcon: ({ color, size }) => (
						<Feather name="home" color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "",
					tabBarIcon: ({ color, size }) => (
						<Feather name="search" color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="messages"
				options={{
					title: "",
					tabBarIcon: ({ color, size }) => (
						<Feather name="mail" color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="notifications"
				options={{
					title: "",
					tabBarIcon: ({ color, size }) => (
						<Feather name="bell" color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "",
					tabBarIcon: ({ color, size }) => (
						<Feather name="user" color={color} size={size} />
					),
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;

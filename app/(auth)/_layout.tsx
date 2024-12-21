import { Redirect, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import TabNavigation from '@/app/Navigations/TabNavigation'

export const LogoutButton = () => {
	const { signOut } = useAuth();

	const doLogout = () => {
		signOut();
	};

	return (
		<Pressable onPress={doLogout} style={{ marginRight: 10 }}>
			<Ionicons name="log-out-outline" size={24} color={'#fff'} />
		</Pressable>
	);
};

const TabsPage = () => {
	const { isSignedIn } = useAuth();

	if(!isSignedIn){
		return <Redirect href="/(public)/login" />;
	}

	return (
		<TabNavigation/>
	);
};

export default TabsPage;
import { Redirect } from 'expo-router';

const StartPage = () => {
  // @ts-ignore
	return <Redirect href="/(auth)/login" />;
};

export default StartPage;
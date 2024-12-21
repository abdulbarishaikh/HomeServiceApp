import { Redirect } from 'expo-router';
import { useFonts } from 'expo-font';

const StartPage = () => {
  const [loaded, error] = useFonts({
    'Outfit-Regular': require('./../assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Bold': require('./../assets/fonts/Outfit-Bold.ttf'),
    'Outfit-Medium': require('./../assets/fonts/Outfit-Medium.ttf'),
  });
  // @ts-ignore
  return <Redirect href="/(public)/login" />;
};

export default StartPage;
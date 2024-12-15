import { ClerkProvider, ClerkLoaded, SignedIn, SignedOut } from '@clerk/clerk-expo'
import { Platform, StyleSheet, Text, View } from "react-native";
import { TokenCache } from '@clerk/clerk-expo/dist/cache/types';
import * as SecureStore from 'expo-secure-store'
import TabNavigation from './Navigations/TabNavigation';
import { useFonts } from 'expo-font';

const createTokenCache = (): TokenCache => {

  return {
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key)
        if (item) {
          console.log(`${key} was used 🔐 \n`)
        } else {
          console.log('No values stored under key: ' + key)
        }
        return item
      } catch (error) {
        console.error('secure store get item error: ', error)
        await SecureStore.deleteItemAsync(key)
        return null
      }
    },
    saveToken: (key: string, token: string) => {
      return SecureStore.setItemAsync(key, token)
    },
  }
}
export const tokenCache = Platform.OS !== 'web' ? createTokenCache() : undefined
export default function Index() {
  const [loaded, error] = useFonts({
    'Outfit-Regular': require('./../assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Bold': require('./../assets/fonts/Outfit-Bold.ttf'),
    'Outfit-Medium': require('./../assets/fonts/Outfit-Medium.ttf'),
  });
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey='pk_test_YWN0dWFsLWphZ3Vhci0yMi5jbGVyay5hY2NvdW50cy5kZXYk'>
      <View style={styles.container}>

        <TabNavigation />
        {/* <SignedIn>
        <NavigationContainer>
          <TabNavigation/>
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <Login />
        </SignedOut> */}

      </View>

    </ClerkProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
})

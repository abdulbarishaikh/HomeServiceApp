import React, { useEffect } from 'react'
import * as WebBrowser from 'expo-web-browser'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from './../../Utils/Colors'
import { Link } from 'expo-router'
import { useAuth, useOAuth, useUser } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { useNavigation } from '@react-navigation/native'

export const useWarmUpBrowser = () => {
    React.useEffect(() => {
        // Warm up the android browser to improve UX
        // https://docs.expo.dev/guides/authentication/#improving-user-experience
        void WebBrowser.warmUpAsync()
        return () => {
            void WebBrowser.coolDownAsync()
        }
    }, [])
}
WebBrowser.maybeCompleteAuthSession();
const Login = () => {
    // const { isLoaded, signUp, setActive } = useSignUp()
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
                redirectUrl: Linking.createURL('/home', { scheme: 'myapp' }),
            })

            // If sign in was successful, set the active session
            if (createdSessionId) {
                setActive({ session: createdSessionId })
            } else {
                // Use signIn or signUp returned from startOAuthFlow
                // for next steps, such as MFA
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error("OAuth Error", JSON.stringify(err, null, 2))
        }
    }, [])

    const { user } = useUser();
    const { isSignedIn } = useAuth();
    const navigation = useNavigation();
    console.log('user >>>>>> ',user)
    useEffect(()=>{
        if(isSignedIn){
            navigation.push('/home')
        }
        console.log('isSignedIn >>>>>> ',isSignedIn)
    },[isSignedIn])


    return (
        <View style={{ alignItems: "center" }}>
            <Image source={require('./../../../assets/images/react-logo.png')}
                style={styles.loginImage}
            />
            <View style={styles.subContainer}>
                <Text style={{ fontSize: 27, color: Colors.WHITE, textAlign: 'center' }}>
                    Let's Find
                    <Text style={{ fontWeight: 'bold' }}> Professional Cleaning and repair</Text> Service
                </Text>
                <Text style={{ fontSize: 17, color: Colors.WHITE, textAlign: 'center', marginTop: 23 }}>Best App to find serives near to you which deliver you professional service</Text>
                <TouchableOpacity style={styles.button} onPress={onPress}
                >
                    <Text style={{ textAlign: 'center', fontSize: 17, color: Colors.PRIMARY }}>Let's Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    loginImage: {
        width: 230,
        height: 450,
        marginTop: 70,
        borderWidth: 4,
        borderBlockColor: Colors.BLACK,
        borderRadius: 15
    },
    subContainer: {
        width: '100%',
        backgroundColor: Colors.PRIMARY,
        height: '70%',
        marginTop: -20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20
    },
    button: {
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 99,
        marginTop: 18
    }
})
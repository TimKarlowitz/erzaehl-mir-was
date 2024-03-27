import { ImageBackground, StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyles from '../utils/Styles'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'


const Home = () => {

const [text, setText] = React.useState('')
  return (
    <SafeAreaView style={styles.safeAreaView}>
        <ImageBackground source={require('../assets/images/background.png')} style={StyleSheet.absoluteFillObject} >
        <View style={styles.header}>
          <View style={styles.accountView}>
            <FontAwesome5 name="user-circle" size={50} color="black" />
          </View>
          <View style={styles.accountView}>
            <FontAwesome name="gear" size={50} color="black" />
          </View>
        </View>
        <View style={styles.bodyHeader}> 
          <View style={styles.body}>  
            <Text style={globalStyles.heading}>Erzähl mir was</Text>
            <Text style={globalStyles.paragraph}>
                ÜBER
            </Text>
          </View>
          <TextInput 
            placeholder="Drachen, Monster, Prinzessinnen" 
            style={styles.input}
            onChangeText={text => setText(text)}
            defaultValue={text}
            />
          <Text style={globalStyles.paragraph}>
            {text}
          </Text>
        </View>
        </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        backgroundColor: 'white',
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bodyHeader: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    accountView: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 50,
    },

    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 30,
    },
    safeAreaView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Home

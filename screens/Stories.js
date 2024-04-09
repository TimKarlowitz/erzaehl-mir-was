import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyles from '../utils/Styles'
import { Button } from 'react-native-paper'
import { useNavigation } from "@react-navigation/native";


const Stories = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.headerBox}>
      <Button icon="arrow-left" onPress={() => navigation.goBack()}>
  
</Button>
        <Text style={globalStyles.heading}>Deine Geschichten</Text>
      </View>
    </SafeAreaView>
  )
}

export default Stories

const styles = StyleSheet.create({
  headerBox:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  }
})
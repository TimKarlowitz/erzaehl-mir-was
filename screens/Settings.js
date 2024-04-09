import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch, TextInput, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../utils/Colors';

const Settings = () => {
  const [isLearning, setIsLearning] = React.useState(false);
  const [isFun, setIsFun] = React.useState(false);
  const [isBoth, setIsBoth] = React.useState(true);
  const [name, setName] = React.useState('');
  const [ageGroup, setAgeGroup] = React.useState('5-10');

  // Handle switch toggle logic to ensure only one switch is on at a time
  const handleToggleSwitch = (switchId) => {
    setIsLearning(switchId === 'learning'   || switchId === 'both');
    setIsFun(switchId === 'fun'|| switchId === 'both');
    setIsBoth(switchId === 'both');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <Title style={styles.title}>Einstellungen</Title>
      <View style={styles.section}>
        <Title>Geschichten Einstellungen:</Title>
        <View style={styles.switchRow}>
          <Switch value={isLearning} onValueChange={() => handleToggleSwitch('learning')} />
          <Text>Lernend</Text>
        </View>
        <View style={styles.switchRow}>
          <Switch value={isFun} onValueChange={() => handleToggleSwitch('fun')} />
          <Text>Spaßig</Text>
        </View>
        <View style={styles.switchRow}>
          <Switch value={isBoth} onValueChange={() => handleToggleSwitch('both')} />
          <Text>Beides</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Title>Account Einstellungen</Title>
        <TextInput
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
          mode="outlined"
        />
        <View style={styles.switchRow}>
          <Switch value={ageGroup === '5-10'} onValueChange={() => setAgeGroup('5-10')} />
          <Text>5 – 10 Jahre</Text>
        </View>
        <View style={styles.switchRow}>
          <Switch value={ageGroup === '10-14'} onValueChange={() => setAgeGroup('10-14')} />
          <Text>10 – 14 Jahre</Text>
        </View>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    
  },
  section: {
    marginVertical: 20,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 10,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
});

export default Settings;

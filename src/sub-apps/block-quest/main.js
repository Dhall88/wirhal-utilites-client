
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import Scene from './components/Scene';

console.ignoredYellowBox = ['THREE.WebGLRenderer'];

export default class AppContainer extends React.Component {
  render = () => (
      <View style={styles.container}>
        <Scene
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
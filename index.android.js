/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

import {
    Navigator,
    TouchableOpacity,
} from 'react-native';

import {Container, Content, Footer, FooterTab, Button, Icon, Badge, Header, Title, List, ListItem, H1, H2, Card, CardItem, Text, InputGroup, Input, ListView, Alert, Tabs} from 'native-base';

//Import scenes
import WriteQuizView from './views/writeQuizView'
import NTab from './views/NTab'
import MainTabs from './views/Maintabs'
import KanjiView from './views/KanjiView'
import ReadTextView from './views/readTextView'
import CustomTextView from './views/customTextView'

class MainView extends Component {
  _renderScene(route, navigator, kanjiId) {

    if (route.index === 1) {
      return <MainTabs navigator={navigator} />
    } else if (route.index === 2) {
      return <KanjiView kanjiId={route.kanjiId} navigator={navigator} />
    } else if (route.index === 3) {
      return <WriteQuizView kanjiId={route.kanjiId} navigator={navigator} />
    } else if (route.index === 4) {
      return <NTab kanjiId={route.kanjiId} navigator={navigator} />
    } else if (route.index === 5) {
      return <ReadTextView navigator={navigator} textString={route.textString} />
    } else if (route.index === 6) {
      return <CustomTextView navigator={navigator} />
    }
  }

  render() {
    return (
          <Navigator
            initialRoute={{index: 1}}
            renderScene={this._renderScene} />
    );    
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('kanjivo', () => MainView);

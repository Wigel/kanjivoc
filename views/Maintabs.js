import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import {Button, Icon, Container, Header, Content, Title, Tabs, List, ListItem, H1, Footer, FooterTab, InputGroup, Input} from 'native-base';

import Kanji from './kanji.json'

//Views
import NTab from './NTab';
import MainTab from './MainTab';


export default class MainTabs extends Component {
  constructor(props) {
    super(props);
    
  }

  render(){
    return (
      <Container>
        <Header>
          <Title>KanjiVo</Title>
        </Header>

        <Content>
          <MainTab navigator={this.props.navigator} tabLabel='Main' level='main'/>
        </Content>
        <Footer >
          <FooterTab style={{backgroundColor: '#6480DB'}}>
              <Button active onPress={()=> {
                       this.props.navigator.index == 1 ? this.props.navigator.push({index: 1}) : ''
                    }}>
                  カテゴリー
                  <Icon name='ios-list-box-outline' />
              </Button>
              <Button onPress={()=> {
                       this.props.navigator.push({index: 6})
                    }}>
                  Custom Text
                  <Icon name='ios-search' />
              </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
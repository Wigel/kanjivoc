import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import {Icon, Container, Header, Content, Title, Tabs, List, ListItem, H1, Card, CardItem, FooterTab, Text, Footer, Button, H3} from 'native-base';

import KanjiImport from './kanji'


export default class KanjiView extends Component {
  constructor(props) {
    super(props);
    this.state = {literal: "", readings: [], meanings: [], jlpt: ""}
    this.fetchKanjiInfo(this.props.kanjiId)

    
  }

  fetchKanjiInfo(kanji) {
    return fetch('http://api.nihongoresources.com/kanji/find/'+kanji)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(responseJson[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateState(kanji){
    this.fetchKanjiInfo(kanji);
  }
 
  render(){ 
     return(
      <Container>
        <Header>
          <Button onPress={()=>{this.props.navigator.pop()}}   transparent>
              <Icon name='ios-arrow-back' />
          </Button>
          <Title>KanjiVo</Title>
        </Header>
        <Content>
          <Card>
            <CardItem header style={{flexDirection: 'row', justifyContent: "space-between"}}>                    
                <H1 style={{fontSize: 80, paddingTop: 45, paddingBottom: 6,}}>{this.state.literal}</H1>
                <View style={{flexDirection: 'column'}}>
                  <H3 style={{textAlign: 'center'}}>Readings</H3>
                  <Text style={{textAlign: 'center'}}>{this.state.readings.map(function(x){return x+"\n"})}</Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <H3 style={{textAlign: 'center'}}>Meanings</H3>
                  <Text style={{textAlign: 'center'}}>{this.state.meanings.map(function(x){return x+"\n"})}</Text>
                </View>
            </CardItem>
            <CardItem>
              <Button Large info block onPress={()=> {
                          this.props.navigator.push({index: 3, kanjiId: this.props.kanjiId});
                        }}>
                クイズ
              </Button>
            </CardItem>
         </Card>
        </Content>
        <Footer >
          <FooterTab info style={{backgroundColor: '#6480DB'}}>
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
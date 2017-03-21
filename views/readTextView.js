import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  ListView,
  Text,
} from 'react-native';

import { Container, Content, Footer, FooterTab, Button, Icon, Badge, Header, Title, H1, H2, Card, CardItem, InputGroup, Input, Alert, TextInput, List, ListItem} from 'native-base';
import Kanji from './kanji.json'

import KanjiListButton from './components/kanjiListButton'

export default class NTab extends Component {
  constructor(props) {
    super(props);
    const textArray = this.props.textString.split("");
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {texto: textArray, texti: this.splitnParseKanji(this.props.textString)};
   
  }

  splitnParseKanji (text){
    var myRe = /([一-龯])/g;
    var myArray;
    kanjiArray = [];
    let i = 0
    while ((myArray = myRe.exec(text)) !== null) {
      kanjiArray[i] = myArray[0];
      i++;
    }

    var unique = kanjiArray.filter(function(elem, index, self) {
      return index == self.indexOf(elem);
    })
    return unique;
  }

  ifIsKanji(value){
      
  }


  render(){

        return (
          <Container>
            <Header>
              <Button onPress={()=>{this.props.navigator.pop()}}   transparent>
                  <Icon name='ios-arrow-back' />
              </Button>
              <Title>KanjiVo</Title>
            </Header>
            <Content>
              <Card>
                <CardItem>
                  <Text style={{fontSize: 23}}>
                    {this.state.texto.map(function(value){
                      if (value.search(/([一-龯])/g) != -1) {
                        return <Text Text style={{fontSize: 23}} onPress={()=>{this.props.navigator.push({index: 2, kanjiId: value})}}>{value}</Text>
                      } else {
                        return <Text style={{fontSize: 23}}>{value}</Text>
                      }
                    }, this)}
                  </Text>
                </CardItem>
              </Card>
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
        )
  }
}
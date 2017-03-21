import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  ListView,
  TextInput,
} from 'react-native';

import { Container, Content, Footer, FooterTab, Button, Icon, Badge, Header, Title, H1, H2, Card, CardItem, Alert, List, ListItem, Text} from 'native-base';
import Kanji from './kanji.json'

import KanjiListButton from './components/kanjiListButton'


export default class CustomTextView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      height: 0,
    };
   
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
              
              <Button info onPress={()=> {
                          this.props.navigator.push({index: 5, textString: this.state.text});
                        }}>
                Submit Text
              </Button>
            </Header>
            <Content>
              <TextInput
                  multiline={true}
                  autoFocus={true}
                  placeholder="Write/Paste text here"
                  onChangeText={(text) => {
                    this.setState({text});
                  }}
                  onContentSizeChange={(event) => {
                    this.setState({height: event.nativeEvent.contentSize.height});
                  }}
                  style={{height: Math.max(35, this.state.height), fontSize: 18}}
                  value={this.state.text}
                />
            </Content>
            <Footer >
            <FooterTab style={{backgroundColor: '#6480DB'}}>
                <Button onPress={()=> {
                         this.props.navigator.index != 1 ? this.props.navigator.push({index: 1}) : ''
                      }}>
                    カテゴリー
                    <Icon name='ios-list-box-outline' />
                </Button>
                <Button active onPress={()=> {
                         this.props.navigator.index == 6 ? this.props.navigator.index = ({index: 6}) : ''
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
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Container, Content, Footer, FooterTab, Button, Icon, Badge, Header, Title, List, ListItem, H1, H2, Card, CardItem, Text, InputGroup, Input, ListView, TextInput} from 'native-base';
import Kanji from './kanji.json';
//import Kanji3 from './kanjidic2.json';
import Kanji2 from './kanji_n5.json';

import KanjiListButton from './components/kanjiListButton';

import xml2js from 'react-native-xml2js';
import parse from 'japaneasy/lib/parse.js';
const compounds = {};

function fetchCompounds(kanji) {
  return fetch('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?1ZUP企')
    .then((response) => response.formData())
    .then((responseJson) => {
      return parseNSortCompounds(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });
}

function parseNSortCompounds(text){
    const parseWordsChunk = JSON.stringify(text).toString().slice(232, -28);
    let nSplitter = "\\n"
    seperateWordsArray = parseWordsChunk.split(nSplitter);
    kanji = seperateWordsArray[0].split("/"); //get the kanji word and hiragana in an array
    if (kanji[7].charAt(0) == ("(")){
      tempKanji = kanji[7].replace(/ *\([^)]*\) /g, "");
    }
    return tempKanji;
}
 
var parser = new xml2js.Parser();
// fs.readFile(__dirname + '/kanjidic2.xml', function(err, data) {
//     parser.parseString(data, function (err, result) {
//         console.dir(result);
//         console.log('Done');
//     });
// });



export default class NTab extends Component {
	constructor(props) {
		super(props);
    let marketingText = "マーケティング（英: marketing）とは、企業などの組織が行うあらゆる活動のうち、「顧客が真に求める商品やサービスを作り、その情報を届け、顧客がその価値を効果的に得られるようにする」ための概念である。また顧客のニーズを解明し、顧客価値を生み出すための経営哲学、戦略、仕組み、プロセスを指す。";
    this.state = {texto: marketingText};
    //this.state.kanji = this.getWordsFromApi();
    //this.state = this.getWordsFromApi();
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

	render(){

        return (
	        <Content>
              <Header>
                <Button onPress={()=>{this.props.navigator.pop()}} transparent>
                    <Icon name='ios-arrow-back' />
                </Button>
                <Title>KanjiVo</Title>
                <Button style={{backgroundColor: '#9FC643'}} onPress={ () => Alert.alert(
                    'Marketing text',
                    this.state.texto,
                    [
                      {text: 'OK',},
                    ]
                   )
                  }>
                  Read text
                </Button>
                <Text>{this.splitnParseKanji(this.state.texto).length}</Text>
              </Header>
              <List dataArray={this.splitnParseKanji(this.state.texto)}
                  renderRow={(item) =>
                    <ListItem>
                      <TouchableOpacity onPress={()=> {
                         this.props.navigator.push({index: 2, kanjiId: item})
                      }}>               
                        <H1>{item}</H1>
                      </TouchableOpacity>
                    </ListItem>
                  }>
              </List>
	        </Content>
        )
	}
}
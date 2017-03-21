import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TextInput,
  Alert,

} from 'react-native';

import { Container, Content, Footer, FooterTab, Button, Icon, Badge, Header, Title, List, ListItem, H1, H2, Card, CardItem, Text, InputGroup, Input, ListView} from 'native-base';
import KanjiImport from './kanji.json'



export default class WriteQuizView extends Component {
  constructor(props) {
    super(props);
    const kanji = this.fetchCompounds(this.props.kanjiId);
    
    this.state = {words: [{kanji: "", hiragana: "", translations: []}]}
    wordCounter = 0;
    resultArray = [];

    //Style states
    this.state.showEnglish = true;
    this.state.correctWordBorder = true;

  }

  stateFixHiragana(){

  }

  fetchCompounds(kanji) {
  return fetch('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?1ZUP'+kanji)
    .then((response) => response.formData())
    .then((responseJson) => {
      this.setState({words: this.parseNSortCompounds(responseJson)});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  parseNSortCompounds(text){
    const parseWordsChunk = JSON.stringify(text).toString().slice(232, -28);

    let nSplitter = "\\n";
    let kanjiObj = [];
    let hiraganaWord = "";
    seperateWordsArray = parseWordsChunk.split(nSplitter);

    for (var i = 0; i < seperateWordsArray.length-1; i++) {
        kanjiObj[i] = {};
        kanjiObj[i] = {};
        kanjiObj[i] = {};
        kanji = seperateWordsArray[i].split("/"); //get the kanji word and hiragana in an array
        kanjiAndHiragana = kanji[0].trim().split(" ") //remove spaces n put hiragana and kanji in array
        //tempKanjiAndHiragana = kanjiAndHiragana[1].replace(/[\]\[]/g, ""); //remove [] from hiragana

        if (kanjiAndHiragana[0].includes("(")) {
          kanjiWord = kanjiAndHiragana[0].replace(/ *\([^)]*\)/g, "");
        } else {
          kanjiWord = kanjiAndHiragana[0];
        }

        if (kanjiWord.includes(";")) {
          kanjiWord = kanjiWord.split(";", 1)
        }

        if (kanjiAndHiragana[1].includes("(")) {
          hiraganaWord = kanjiAndHiragana[1].replace(/ *\([^)]*\)/g, "");
        } else {
          hiraganaWord = kanjiAndHiragana[1];
        }
        if (hiraganaWord.includes(";")) {
          hiraganaWord = hiraganaWord.split(";", 1)
        }

        kanji.splice(0, 1);
        kanji.pop();
        kanji.pop();

        let translations = kanji.map(function(word, index){
          if (word.charAt(0) == "(") {
            tempword = word.replace(/ *\([^)]*\) /g, "")
            //tempword = word.split(" ", 3)
            return tempword
          }

          return word

          // if (word.charAt(0) == "("){
          //   return word.replace(/ *\([^)]*\) /g, "");
          // } else {
          //   return word;
          // }
        })

        if (hiraganaWord.isArray) {
          hiraganaWord.toString();
        }

        //tempHiragana = kanjiAndHiragana[1]

        kanjiObj[i].kanji = kanjiWord;
        kanjiObj[i].hiragana = hiraganaWord.toString().substring(1,hiraganaWord.toString().length-1);
        kanjiObj[i].translations = translations;
    }
    kanjiObj = this.shuffle(kanjiObj);
    return kanjiObj;
  }

  onSkipPress(){
   // this.setState({text: ''});
    this.state.words.push(this.state.words[wordCounter]);
    this.state.words.splice(wordCounter, 1)
    this.setState({text: ''});
    this.setState(this.state.words[wordCounter]);
  }

  onInputChange() {

    //kolla om alla ord är done = resultat/exit 0!= nästa ord.
    if (wordCounter == this.state.words.length-1) {
      this.props.navigator.pop();
    } else {
      wordCounter++;
      this.setState({text: ''});
      this.setState(this.state.words[wordCounter]);
    }
    
  }

  // iDontKnow() {
  //   this.state.words.push(this.state.words[wordCounter]);
  //   this.state.words.splice(wordCounter, 1);
  //   this.setState(this.state.words[wordCounter]);
  // }

  onWordSubmit(hiragana, text) {
    if (hiragana == text) {this.setState({text: 'hej'})}
  }
  
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  
  

  render(){
    
    var styles = StyleSheet.create({
      hideEnglish: {
        height: 0
      },
      showEnglish: {
        flex: 0
      },
      greenBorder: {
        borderColor: '#C1E899',
        fontSize: 24,
        flex: 1,
        alignSelf: 'center',
        borderWidth: 1,
        paddingLeft: 8,
      },
      hiddenBorder: {
        borderColor: '#C1E899',
        fontSize: 25,
        flex: 1,
        borderWidth: 0,
        paddingLeft: 5,
        paddingBottom: 5,
        paddingTop: 0
      }
    })

    return (
      <Container>
        <Header style={{}}>
          <Button onPress={()=>{this.props.navigator.pop()}} transparent>
              <Icon name='ios-arrow-back' />
          </Button>

          <Title>KanjiVo</Title>

        </Header>
        <Content style={{}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
            <Button info onPress={() => this.state.showEnglish == true ? this.setState({showEnglish: false}) : this.setState({showEnglish: true})}>
              {this.state.showEnglish == true ? 'Hide English' : 'Show English'}
            </Button>

              <H1 style={{paddingTop: 5, color: 'black'}}>
                 {wordCounter+'/'}{this.state.words.length} 正解
              </H1>

            <Button info onPress={ () => Alert.alert(
                '正しい答えは',
                this.state.words[wordCounter].hiragana+'',
                [
                  {text: 'OK', onPress: () => this.onSkipPress()},
                ]
               )
              }>
              スキップ
            </Button>
          </View>
          <List>
            <ListItem style={{marginRight: 0, marginLeft: 0, borderWidth: 0,}}>
                <H1 style={{fontSize: 40, paddingTop: 3, paddingBottom: 3}} >{this.state.words[wordCounter].kanji}</H1>
                <TextInput
                  style={this.state.correctWordBorder == true ? styles.hiddenBorder : styles.greenBorder}
                  onChangeText={(text) => this.state.words[wordCounter].hiragana == text ? this.onInputChange() : this.setState({text})}
                  //onSubmitEditing={this.onWordSubmit(this.state.hiragana, text)}
                  placeholder="ひらがな入力"
                  value={this.state.text} />
            </ListItem>
            <ListItem>
              <Card style={this.state.showEnglish == true ? styles.showEnglish : styles.hideEnglish}>
                <CardItem>
                  <List dataArray={this.state.words[wordCounter].translations}
                      renderRow={(item) =>
                        <Text style={{textAlign: 'center'}}>{item}</Text>
                      }>
                  </List>
                  
                </CardItem>
              </Card>
            </ListItem>
          </List>
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

/*render(){
              {this.state.words.map(function(word, index){return <Text>{this.state.words[index].kanji} </Text>})}

              {this.state.english.map(function(word, id){return <Text style={{textAlign: 'center'}}>{id}</Text>})}
  }*/
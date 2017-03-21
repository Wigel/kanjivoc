import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import { Container, Content, Footer, FooterTab, Button, Icon, Badge, Header, Title, List, ListItem, H1, H2, H3, Card, CardItem, Text, InputGroup, Input, ListView, Alert, TextInput} from 'native-base';
import Texts from './texts.json'

import KanjiListButton from './components/kanjiListButton'

export default class NTab extends Component {
	constructor(props) {
		super(props);

    this.state = Texts;
	}


	render(){

        return (
	        <Content>
            <ListItem itemDivider>
              <H3>ビジネス</H3>
            </ListItem> 
            <List dataArray={this.state.business}
                renderRow={(item) =>
                  <ListItem>
                    <TouchableOpacity onPress={()=> {
                       this.props.navigator.push({index: 5, textString: item.text})
                    }}>               
                      <H3>{item.title}</H3>
                    </TouchableOpacity>
                  </ListItem>
                }>
            </List>
            <ListItem itemDivider>
              <H3>物理学</H3>
            </ListItem>
            <List dataArray={this.state.physics}
                renderRow={(item) =>
                  <ListItem>
                    <TouchableOpacity onPress={()=> {
                       this.props.navigator.push({index: 5, textString: item.text})
                    }}>               
                      <H3>{item.title}</H3>
                    </TouchableOpacity>
                  </ListItem>
                }>
            </List>
            <ListItem itemDivider>
              <H3>コンピュータ科学</H3>
            </ListItem>
            <List dataArray={this.state.computer}
                renderRow={(item) =>
                  <ListItem>
                    <TouchableOpacity onPress={()=> {
                       this.props.navigator.push({index: 5, textString: item.text})
                    }}>               
                      <H3>{item.title}</H3>
                    </TouchableOpacity>
                  </ListItem>
                }>
            </List>
	        </Content>
        )
	}
}
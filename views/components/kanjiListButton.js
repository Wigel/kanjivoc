import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import {H1} from 'native-base';


export default class kanjiListButton extends Component {
	constructor(props) {
		super(props);
		
	}

	isKanjiLvl (jlpt){
    	if (jlpt == this.props.level) {
      		return <H1>{this.props.item.character}</H1>;
    	}
  	}
	render(){
		return(
			<TouchableOpacity onPress={()=> {
			  this.props.navigator.push({index: 2, kanjiId: id});
			  }}>
			  <H1 accessible={false}>{this.props.item.jlpt == this.props.level ? this.props.item.character : ''}</H1>
			</TouchableOpacity>
		);
	}
}

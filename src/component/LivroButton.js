import React, { Component } from 'react';
import {  View, TouchableOpacity  } from 'react-native';
import { Text } from 'native-base';

export default class LivroButton extends Component {
   state = {
   };

  constructor(){
    super();
  }


  _call = () => this.props.callback(this.props.el)
  
  render() {
   let {el, width} = this.props;

    return (
        <TouchableOpacity 
            onPress={this._call} 
            style={{flex: 0, width: width,
            margin: 5}} >
            <View>
            <Text style={{fontFamily:'serif', }}> 
            <Text style={{fontSize: 25, fontFamily:'serif', fontWeight:'bold', color: 'red'}}>{el.title[0]}</Text> {el.title.substring(1, el.title.length)} 
            </Text>

            </View>
        </TouchableOpacity>
    )
  }
}
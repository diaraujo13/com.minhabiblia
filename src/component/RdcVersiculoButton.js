import React, { Component } from 'react';
import {  View, TouchableOpacity  } from 'react-native';
import { Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class RdcVersiculoButton extends Component {
   state = {
   };

  constructor(){
    super();
  }


  render() {
   let {item, active} = this.props;

    return (
      <TouchableOpacity >
        <View style={{ flexDirection:'column', flex: 1, backgroundColor: active ? '#ccc' : item.marked ? '#f7f17b' :  '#f8f8f8' }} >
        <Text style={{ fontFamily:'Avenir-Medium', flex: 1, fontSize: 19, margin: 10}}>
          {item.content} 

        </Text>
        <Text style={{fontWeight:'bold', textAlign:'center'}}> {item.title}, {item.chapter}:{item.position}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
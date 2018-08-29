import React, { Component } from 'react';
import {  View, TouchableOpacity  } from 'react-native';
import { Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class VersiculoButton extends Component {
   state = {
   };

  constructor(){
    super();
  }


  _call = () => this.props.callback(this.props.item)
  
  render() {
   let {item, active} = this.props;

    return (
      <TouchableOpacity onPress={this._call}>
        <View style={{ flexDirection:'row', flex: 1, backgroundColor: active ? '#ccc' : item.marked ? '#f7f17b' :  '#f8f8f8' }} >
        <Text style={{ fontFamily:'Avenir-Medium', flex: 1, fontSize: 19, margin: 10}}>
          <Text style={{color: 'red', textAlign:'justify', fontWeight:'bold', marginTop: -15}}>{item.position}  </Text> 
          {item.content} 

        </Text>
        {item.fav == 1 ? <Icon  style={{flex: 0, width: 20, alignItems:'center', justifyContent:'center', marginTop: 20}} name='heart' color={'#ff6b6b'} size={16}></Icon> : <View style={{width: 20}}></View>} 
        </View>
      </TouchableOpacity>
    )
  }
}
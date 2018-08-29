import React, { Component } from 'react';
import {  View, TouchableOpacity  } from 'react-native';
import { Text } from 'native-base';

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
      
        <View style={{ backgroundColor: active ? '#ccc' : '#f8f8f8' }} >
        <Text style={{ fontFamily:'Avenir-Medium', fontSize: 19, margin: 10}}>
          <Text style={{color: 'red', fontWeight:'bold', marginTop: -15}}>{item.position}  </Text> 
          {item.content}
        </Text> 
        
        </View>
      </TouchableOpacity>
    )
  }
}
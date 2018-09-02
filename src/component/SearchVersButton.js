import React, { Component } from 'react';
import {  View, TouchableOpacity  } from 'react-native';
import { Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class SearchVersButton extends Component {
   state = {
   };

  constructor(){
    super();
  }


  render() {
   let {item, active, searchTerm} = this.props;

   let regex = new RegExp(searchTerm, "g");

   let text = item.content.replace(regex, "<Text style={{backgroundColor: 'yellow'}}>"+searchTerm+"</Text>");
  
   text = "<Text style={{ fontFamily:'Avenir-Medium', flex: 1, fontSize: 19, margin: 10}}>" + text + "</Text>"
    return (
      <TouchableOpacity >
        <View style={{ flexDirection:'column', flex: 1, backgroundColor: active ? '#ccc' : item.marked ? '#f7f17b' :  '#f8f8f8' }} >
          <Text>

          {text} 
          </Text>

        
        <Text style={{fontWeight:'bold', textAlign:'center'}}> {item.title}, {item.chapter}:{item.position}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
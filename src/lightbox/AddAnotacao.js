import React, { Component } from 'react';
import { Platform, StyleSheet, View, ActivityIndicator, Dimensions, Image } from 'react-native';
import {List, ListItem, Toast, Right, Fab, Grid, Col, Thumbnail,  Textarea,
Form, Title, Spinner, Item, Input, Label, Container, Header, Card,Body, 
CardItem, Button, Content, Icon, ActionSheet, Text, Root } from 'native-base';

export default class AddAnotacao extends Component {
   state = {
    carregando: false,
   };

  constructor(){
    super();
  }

  saveAnotation = async () => {
    await this.setState({ carregando: true });
  }

  render() {
    if(this.state.carregando){
        return (<View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>

          <ActivityIndicator> </ActivityIndicator>      
          </View>
          );
      }else {
    return (
      <View style={{flex: 0, padding: 20, marginHorizontal: 20, height: 300, backgroundColor: '#f8f8f8', borderRadius: 10}}>
        <Text style={{textAlign:'center', fontWeight:'bold', color: '#444'}}> ADICIONAR ANOTAÇÃO </Text>
        <Textarea
        style={{flex: 1, borderColor:'#ccc', borderWidth: 1, margin: 10, padding: 4, borderRadius: 4}}
        autoFocus
        >

        </Textarea>
        <Button onPress={this.saveAnotation} block>
            <Text>
            Adicionar
            </Text>
        </Button>
      </View>
    );
    }
  }
}
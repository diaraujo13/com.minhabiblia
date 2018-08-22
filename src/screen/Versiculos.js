import React, { Component } from 'react';
import { Platform, StyleSheet, View, ActivityIndicator, Dimensions, Image } from 'react-native';
import {List, ListItem, Toast, Right, Fab, Grid, Col, Thumbnail, 
Form, Title, Spinner, Item, Input, Label, Container, Header, Card,Body, 
CardItem, Button, Content, Icon, ActionSheet, Text, Root } from 'native-base';

export default class Versiculos extends Component {
   state = {
    carregando: false,
   };

  constructor(){
    super();
  }

  render() {
    if(this.state.carregando){
      return (<View style={{backgroundColor: MAIN_COLOR}}>
        <ActivityIndicator>
        </ActivityIndicator>      
        </View>
        );
    }else {
    return (
     <Root>
      <View style={{flex: 1}}>
        <Text> My Component Versiculos </Text>
      </View>
    </Root>
    );
   }
  }
}
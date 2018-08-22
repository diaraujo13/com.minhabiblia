import React, { Component } from 'react';
import { Platform, StyleSheet, View, ActivityIndicator, Dimensions, Image } from 'react-native';
import {List, ListItem, Toast, Right, Fab, Grid, Col, Thumbnail, 
Form, Title, Spinner, Item, Input, Label, Container, Header, Card,Body, 
CardItem, Button, Content, Icon, ActionSheet, Text, Root, StyleProvider } from 'native-base';

import getTheme from '../config/native-base-theme/components';
import material from '../config/native-base-theme/variables/material';

import { connect } from 'react-redux';

import * as livros from '../config/livros.json';
import { setBook } from '../action';

class LivrosScreen extends Component {
   state = {
    carregando: false,
   };

  constructor(){
    
    super();
  }

  selectBook = (el) => {

     this.props.selectBook(el);

     this.props.navigator.push({
       screen: 'vers',
       title: el.title,
       subtitle: 'Capítulo 1',
       animated: true, // does the push have transition animation or does it happen immediately (optional)
       animationType: 'slide-horizontal', 
     })
    
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
          <Container>
            <Content>

              <View style={{flex: 1, padding: 15}}>

                { this.props.selectedBook.id !== 0 ? (<View>
                    <Text>Continuar {this.props.selectedBook.title.toUpperCase()}</Text>   
                 </View>) : null} 
                <Text style={{fontWeight:'bold', color:'#444', fontFamily:'serif', fontSize: 25, letterSpacing:1, textAlign:'center'}}> VELHO TESTAMENTO </Text>
               
               <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                {livros.velho.map( el => {
                  return (
                    <Button 
                          onPress={this.selectBook.bind(this, el)} 
                          key={el.id} 
                          style={{flex: 0, width: Dimensions.get('window').width/2-30, margin: 5}} >
                      <Text style={{fontFamily:'serif'}}> <Text style={{fontSize: 25, fontWeight:'bold', color: 'yellow'}}>{el.title[0]}</Text> {el.title.substring(1, el.title.length)} </Text>
                    </Button>)
                })}
                </View>

               <Text  style={{fontWeight:'bold', color:'#444', fontFamily:'serif', fontSize: 25, letterSpacing:1, textAlign:'center'}}> NOVO TESTAMENTO </Text>
               <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                {livros.novo.map( el => {
                  return (
                    <Button  
                          onPress={this.selectBook.bind(this, el)} 
                          success key={el.id} 
                          style={{flex: 0, width: Dimensions.get('window').width/2-30, margin: 5}} >
                      <Text style={{fontFamily:'serif'}}> <Text style={{fontSize: 25, fontWeight:'bold', color: 'yellow'}}>{el.title[0]}</Text> {el.title.substring(1, el.title.length)} </Text>
                    </Button>)
                })}
                </View>

              </View>
            </Content>
          </Container>
    </Root>
    );
   }
  }
}


 /** listen state */
 const mapStateToProps = ({
    livroReducer, 
  } = state) => ({
  selectedBook: livroReducer.selectedBook,

});

/** dispatch actions */
const mapDispatchToProps = dispatch => ({
  selectBook: (book) => dispatch(setBook(book))
});



export default connect(mapStateToProps, mapDispatchToProps )(LivrosScreen);
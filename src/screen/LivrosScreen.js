import React, { Component } from 'react';
import { Platform, StyleSheet, View, ActivityIndicator, Dimensions, Image, TouchableOpacity } from 'react-native';
import {List, ListItem, Toast, Right, Fab, Grid, Col, Thumbnail, 
Form, Title, Spinner, Item, Input, Label, Container, Header, Card,Body, 
CardItem, Button, Content, Icon, ActionSheet, Text, Root, StyleProvider } from 'native-base';

import getTheme from '../config/native-base-theme/components';
import material from '../config/native-base-theme/variables/material';

import { connect } from 'react-redux';

import { setBook } from '../action';
import LivroButton from '../component/LivroButton';
const livros = {
  "velho": [{
          "id": 1,
          "title": "Gênesis"
      }, {
          "id": 2,
          "title": "Êxodo"
      }, {
          "id": 3,
          "title": "Levítico"
      }, {
          "id": 4,
          "title": "Números"
      },
      {
          "id": 5,
          "title": "Deuteronômio"
      },
      {
          "id": 6,
          "title": "Josué"
      },
      {
          "id": 7,
          "title": "Juízes"
      },
      {
          "id": 8,
          "title": "Rute"
      },
      {
          "id": 9,
          "title": "1 Samuel"
      },
      {
          "id": 10,
          "title": "2 Samuel"
      },
      {
          "id": 11,
          "title": "1 Reis"
      },
      {
          "id": 12,
          "title": "2 Reis"
      },
      {
          "id": 13,
          "title": "1 Crônicas"
      },
      {
          "id": 14,
          "title": "2 Crônicas"
      },
      {
          "id": 15,
          "title": "Esdras"
      },
      {
          "id": 16,
          "title": "Neemias"
      },
      {
          "id": 17,
          "title": "Ester"
      },
      {
          "id": 18,
          "title": "Jó"
      },
      {
          "id": 19,
          "title": "Salmos"
      },
      {
          "id": 20,
          "title": "Provérbios"
      },
      {
          "id": 21,
          "title": "Eclesiastes"
      },
      {
          "id": 22,
          "title": "Cânticos"
      },
      {
          "id": 23,
          "title": "Isaías"
      },
      {
          "id": 24,
          "title": "Jeremias"
      },
      {
          "id": 25,
          "title": "Lamentações"
      },
      {
          "id": 26,
          "title": "Ezequiel"
      },
      {
          "id": 27,
          "title": "Daniel"
      },
      {
          "id": 28,
          "title": "Oséias"
      },
      {
          "id": 29,
          "title": "Joel"
      },
      {
          "id": 30,
          "title": "Amós"
      },
      {
          "id": 31,
          "title": "Obadias"
      },
      {
          "id": 32,
          "title": "Jonas"
      },
      {
          "id": 33,
          "title": "Miquéias"
      },
      {
          "id": 34,
          "title": "Naum"
      },
      {
          "id": 35,
          "title": "Habacuque"
      },
      {
          "id": 36,
          "title": "Sofonias"
      },
      {
          "id": 37,
          "title": "Ageu"
      },
      {
          "id": 38,
          "title": "Zacarias"
      },
      {
          "id": 39,
          "title": "Malaquias"
      }
  ],
  "novo": [{
      "id": 39,
      "title": "Mateus"
  }, {
      "id": 40,
      "title": "Marcos"
  }, {
      "id": 41,
      "title": "Lucas"
  }, {
      "id": 42,
      "title": "João"
  }, {
      "id": 43,
      "title": "Atos"
  }, {
      "id": 44,
      "title": "Romanos"
  }, {
      "id": 45,
      "title": "1 Coríntios"
  }, {
      "id": 46,
      "title": "2 Coríntios"
  }, {
      "id": 47,
      "title": "Gálatas"
  }, {
      "id": 48,
      "title": "Efésios"
  }, {
      "id": 49,
      "title": "Filipenses"
  }, {
      "id": 50,
      "title": "Colossenses"
  }, {
      "id": 51,
      "title": "1 Tessalonicenses"
  }, {
      "id": 52,
      "title": "2 Tessalonicenses"
  }, {
      "id": 53,
      "title": "1 Timóteo"
  }, {
      "id": 54,
      "title": "2 Timóteo"
  }, {
      "id": 55,
      "title": "Tito"
  }, {
      "id": 56,
      "title": "Filemom"
  }, {
      "id": 57,
      "title": "Hebreus"
  }, {
      "id": 58,
      "title": "Tiago"
  }, {
      "id": 59,
      "title": "1 Pedro"
  }, {
      "id": 60,
      "title": "2 Pedro"
  }, {
      "id": 61,
      "title": "1 João"
  }, {
      "id": 62,
      "title": "2 João"
  }, {
      "id": 63,
      "title": "3 João"
  }, {
      "id": 64,
      "title": "Judas"
  }, {
      "id": 65,
      "title": "Apocalipse"
  }]
};


const deviceWidth = Dimensions.get('window').width/2-30;

class LivrosScreen extends Component {
   state = {
    carregando: false,
   };

  constructor(){
    
    super();
  }

  componentWillMount(){
  }

  selectBook =  (el) => {


     this.props.navigator.push({
       screen: 'vers',
       title: el.title,
       passProps: {
         selectedBook: el.id,
       },
       animated: true, // does the push have transition animation or does it happen immediately (optional)
       animationType: 'slide-horizontal', 
     });

     this.props.selectBook(el);
    
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
                <Text style={{fontWeight:'bold', color:'#444', fontFamily:'serif',
                 fontSize: 25, letterSpacing:1, textAlign:'center', 
                 borderRadius: 0.5,}}> VELHO TESTAMENTO </Text>
               
               <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                {livros.velho.map( (el, pos) => {
                  return <LivroButton el={el} key={pos} width={deviceWidth} callback={this.selectBook}></LivroButton>
                })}
                </View>

               <Text  style={{fontWeight:'bold', color:'#444', fontFamily:'serif', fontSize: 25, letterSpacing:1, textAlign:'center'}}> NOVO TESTAMENTO </Text>
               <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                {livros.novo.map( (el, pos) => {
                  return <LivroButton el={el} key={pos} width={deviceWidth} callback={this.selectBook}></LivroButton>
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
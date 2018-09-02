import React, { Component } from 'react';
import { Alert, View,FlatList,ActivityIndicator, StatusBar, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Root, Container, Header, Item, Input,  Button, Text } from 'native-base';
import SQLite from 'react-native-sqlite-storage';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RdcVersiculoButton from '../component/RdcVersiculoButton';


export default class Busca extends Component {
   state = {
    carregando: false,
    items: [],
    query:''
   };

  constructor(){
    super();
  }

  async componentDidMount(){



}


_query = () => {

  if (this.state.query.length < 4)
  {
    alert('O termo a ser pesquisado necessita possui mais de 3 caracteres.');
    return;
  }

  this.setState({carregando: true })
  var db = SQLite.openDatabase({
    name : "biblia",
    createFromLocation : 1
  }, () => {
    db.transaction(async (tx) => {

        await tx.executeSql(
          `
          SELECT 
          Versiculo.id,
          Versiculo.content,
          Versiculo.position,
          Versiculo.chapter,
          Livros.title
          
          FROM Versiculo
          LEFT OUTER JOIN Livros ON Versiculo.book = Livros.id
          WHERE Versiculo.content LIKE '%${this.state.query}%'
          GROUP BY Versiculo.id
          ` , [] ,
          async (tx, results) => {
          
          let rows = results.rows.raw();
          // console.log(rows);
          
          await this.setState({
              items: rows,
              carregando: false
            })
          });
      });


    }, () => {
      console.log("Error");
    }
  );
}

  renderRow = ( {item, index} = data ) => <RdcVersiculoButton searchTerm={this.state.query} item={item} ></RdcVersiculoButton>

  render() {
  
    return (
     <Root>
      <View style={{flex: 1}}>
      <StatusBar
        backgroundColor="black"
        barStyle="light-content"
      />
      <Header androidStatusBarColor='black' style={{backgroundColor:'#000'}} searchBar warning rounded>
          <Item >
            
            <Input onChangeText={ query => this.setState({ query })}  placeholder="Pesquise..." />
          </Item>
        </Header>
          <Button onPress={this._query} block danger>
            <Icon name='magnify' color='white' size={22}></Icon>
            <Text>BUSCAR </Text>
          </Button>


     { this.state.carregando ? (<View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
        <ActivityIndicator/>  
        </View>) :( <FlatList 
        style={{flex: 1}}
          keyExtractor={item => item.id.toString()}
          data={this.state.items} renderItem={this.renderRow}>
        </FlatList>)}
      </View>
    </Root>
    );
   
  }
}
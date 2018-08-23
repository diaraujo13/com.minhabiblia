import React, { Component } from 'react';
import { Platform, StyleSheet, View,FlatList,ActivityIndicator, Dimensions, Imagem, TouchableOpacity } from 'react-native';
import {List, ListItem, Toast, Right, Fab, Grid, Col, Thumbnail, 
Form, Title, Spinner, Item, Input, Label, Container, Header, Card,Body, 
CardItem, Button, Content,ActionSheet, Text, Root } from 'native-base';
import SQLite from 'react-native-sqlite-storage';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


class Versiculos extends Component {
   state = {
    carregando: false,
    items: [],


    /** Barra de tarefas superior */
    showSuperior: false,
    vers: {},   //Qual id do item selecionado
   };

  constructor(){
    super();
  }

  componentWillMount(){

    var db = SQLite.openDatabase({
      name : "biblia",
      createFromLocation : 1
    }, () => {
      db.transaction((tx) => {
        tx.executeSql(
          
           `
           SELECT 
            Versiculo.id,
            Versiculo.content,
            Versiculo.position,
            Versiculo.marked,
            Versiculo.markColor, 
            ( SELECT Favoritos.id FROM Favoritos WHERE Favoritos.versiculo = Versiculo.id) as favId,
            ( SELECT COUNT(*) FROM Anotacoes WHERE Anotacoes.versId = Versiculo.id) as quantidadeAnotacoes,
            '["' || GROUP_CONCAT(Anotacoes.content, '","') || '"]' as anotacaoArray

            FROM Versiculo
            LEFT OUTER JOIN Anotacoes ON Anotacoes.versId = Versiculo.id
            WHERE Versiculo.book = ${this.props.selectedBook.id} AND  Versiculo.chapter = ${this.props.selectedChapter}
            GROUP BY Versiculo.id, Anotacoes.content
          `
          , [] ,
        async (tx, results) => {

          
          let rows = results.rows.raw();
          console.log(rows);
          
          await this.setState({
              items: rows
            })
        });
      });
    }, () => {
      console.log("Error");
    }
  );


    
  }

  showSuperiorBar = async (item) => {
    // alert(JSON.stringify(item));
    
    console.log(item);

    
    await this.setState({
      showSuperior: !this.state.showSuperior,
      vers: this.state.vers.id == item.id ? {} : item,
    });

    console.log(this.state);
  }

  highlight = ()=>{

  }

  renderRow = ( {item, index} = data ) => {


    return (
      <TouchableOpacity onPress={() => this.showSuperiorBar(item)}>
      
        <View style={{ backgroundColor: this.state.vers.id == item.id ? '#ccc' : '#f8f8f8' }} >
        <Text style={{ fontFamily:'Avenir-Medium', fontSize: 19, margin: 10}}>
          <Text style={{color: 'red', fontWeight:'bold', marginTop: -15}}>{item.position}  </Text> 
          {item.content}
        </Text> 
        
        </View>
      </TouchableOpacity>
    )
  }

//   <View style={{
//     width: 250,
//      elevation: 12, 
//    marginVertical: 4,
//    padding: 6,
//    position:'absolute',
//    top: 20,
//    right: 10,
//    zIndex: 1030030203,
//    shadowColor:'#000', shadowOffset:{x: 3, y: 5}, shadowRadius: 4, backgroundColor:'#f2f2f2'}}>
  
//   <TouchableOpacity style={{flex: 1}}>
//     <Icon name={'share'} size={27}></Icon>
//   </TouchableOpacity>

//  </View>
  render() {
    if(this.state.carregando){
      return (<View style={{backgroundColor: MAIN_COLOR}}>
        <ActivityIndicator> </ActivityIndicator>      
        </View>
        );
    }else {
      /**
       * By passing extraData={this.state} to FlatList we make sure FlatList itself will re-render when the state.selected changes. Without setting this prop, FlatList would not know it needs to re-render any items because it is also a PureComponent and the prop comparison will not show any changes.
       */
    return (
     <Root>
      <View style={{flex: 1}}>
      <View style={{height: typeof this.state.vers.id !== 'undefined' ? 40 : 0, flexDirection:'row', backgroundColor:'#222'}}>
          <TouchableOpacity style={{flex: 1,  alignItems:'center',justifyContent:'center'}}>
            <Icon name='share' color='white' size={30}></Icon>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, alignItems:'center',justifyContent:'center'}}>
            <Icon name='heart' color='white' size={30}></Icon>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={ () => {
            this.props.navigator.showLightBox({
                  screen: "add_anotacao", 
                  passProps: {},
              
                  style: {
                      width: Dimensions.get('window').width-40,
                      justifyContent: 'center',
                      backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
                  },
                  adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
              });
            }}
            style={{flex: 1, alignItems:'center',justifyContent:'center'}}>
            <Icon name='note-plus-outline' color='white' size={30}></Icon>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.highlight} style={{flex: 1, alignItems:'center',justifyContent:'center'}}>
            <Icon name='playlist-edit' color='white' size={30}></Icon>
            <Text style={{ backgroundColor:'red', opacity: this.state.vers.quantidadeAnotacoes > 0 ? 1 :0, color:'white', padding: 3, fontSize: 13, borderRadius: 7, position:'absolute', top: 3, left: 12,}}>{this.state.vers.quantidadeAnotacoes}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.highlight} style={{flex: 1, alignItems:'center',justifyContent:'center'}}>
            <Icon name='palette' color='yellow' size={30}></Icon>
          </TouchableOpacity>
   
      </View>
        <FlatList data={this.state.items} extraData={this.state.showSuperior} renderItem={this.renderRow}>
        </FlatList>
      </View>
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
 selectedChapter: livroReducer.selectedChapter,

});

/** dispatch actions */
const mapDispatchToProps = dispatch => ({
  
});



export default connect(mapStateToProps, mapDispatchToProps )(Versiculos);
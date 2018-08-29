import React, { Component } from 'react';
import { Alert, View,FlatList,ActivityIndicator, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import {Text, Root } from 'native-base';
import SQLite from 'react-native-sqlite-storage';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import VersiculoButton from '../component/VersiculoButton';
import { setChapterId, setBook } from '../action';
import Share from 'react-native-share';

const deviceWidth = Dimensions.get('window').width-40;
const deviceHeight = Dimensions.get('window').height;

class Versiculos extends Component {
   state = {
    carregando: true,
    items: [],
    chapterId: 1,
    
    maxChapter: [],
    carregandomaxChapter: true,

    /** Barra de tarefas superior */
    showSuperior: false,
    vers: {},   //Qual id do item selecionado
   };

  constructor(){
    super();
  }

  componentWillMount(){

    this.props.selectBook(this.props.book);
    
  }

  async componentDidMount(){


      var db = SQLite.openDatabase({
        name : "biblia",
        createFromLocation : 1
      }, () => {
        db.transaction(async (tx) => {

         await tx.executeSql(`SELECT MAX(chapter) as MAXIMUM FROM Versiculo WHERE book=${this.props.selectedBook}`, [] ,
              async (tx, results) => {
              
              let rows = results.rows.raw();
              // console.log(rows[0]['MAXIMUM']);
              
              await this.setState({
                 maxChapter: new Array(rows[0]['MAXIMUM']).fill(0),
                 carregandomaxChapter: false
              });
          });

          await tx.executeSql(
            `
            SELECT 
              Versiculo.id,
              Versiculo.content,
              Versiculo.position,
              Versiculo.marked,
              Versiculo.markColor, 
              Versiculo.fav,
              ( SELECT Favoritos.id FROM Favoritos WHERE Favoritos.versiculo = Versiculo.id) as favId,
              ( SELECT COUNT(*) FROM Anotacoes WHERE Anotacoes.versId = Versiculo.id) as quantidadeAnotacoes,
              '["' || GROUP_CONCAT(Anotacoes.content, '","') || '"]' as anotacaoArray
              FROM Versiculo
              LEFT OUTER JOIN Anotacoes ON Anotacoes.versId = Versiculo.id
              WHERE Versiculo.book = ${this.props.selectedBook} AND  Versiculo.chapter = ${this.state.chapterId}
              GROUP BY Versiculo.id, Anotacoes.content
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

  showSuperiorBar = async (item) => {
    // alert(JSON.stringify(item));
    
    // console.log(item);

    
    await this.setState({
      showSuperior: !this.state.showSuperior,
      vers: this.state.vers.id == item.id ? {} : item,
    });

    console.log(this.state);
  }

  highlight = ()=>{

  }

  _selectChapter = (value) => {
    this.setState({
      carregando: true,
       chapterId: value});

       
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
              Versiculo.marked,
              Versiculo.markColor, 
              Versiculo.fav,
              ( SELECT COUNT(*) FROM Anotacoes WHERE Anotacoes.versId = Versiculo.id) as quantidadeAnotacoes,
              '["' || GROUP_CONCAT(Anotacoes.content, '","') || '"]' as anotacaoArray
              FROM Versiculo
              LEFT OUTER JOIN Anotacoes ON Anotacoes.versId = Versiculo.id
              WHERE Versiculo.book = ${this.props.selectedBook} AND  Versiculo.chapter = ${this.state.chapterId}
              GROUP BY Versiculo.id, Anotacoes.content
            ` , [] ,
            async (tx, results) => {
          
              console.log('atualizado');
 
              let rows = results.rows.raw();
              // console.log(rows);
              
              await this.setState({
                  items: rows,
                  carregando: false
                })

            });
        });


      }, () => {
        Alert.alert("Erro ao exibir dados, tente novamente");
        console.log("Error");
      }
    );

  }

  _fav_versc = () => {
    var db = SQLite.openDatabase({
      name : "biblia",
      createFromLocation : 1
    }, () => {
      db.transaction(async (tx) => {

        await tx.executeSql(
          `
          UPDATE Versiculo 
          SET fav = CASE WHEN fav = 1 THEN 0 ELSE 1 END
          WHERE Versiculo.id = ${this.state.vers.id};
          ` , [] ,
          async (tx, results) => {
            this._selectChapter(this.state.chapterId);
          });
      });
    });
  }

  _color_versc = () => {
    var db = SQLite.openDatabase({
      name : "biblia",
      createFromLocation : 1
    }, () => {
      db.transaction(async (tx) => {

        await tx.executeSql(
          `
          UPDATE Versiculo 
          SET marked = CASE WHEN marked = 1 THEN 0 ELSE 1 END
          WHERE Versiculo.id = ${this.state.vers.id};
          ` , [] ,
          async (tx, results) => {
            this._selectChapter(this.state.chapterId);
          });
      });
    });
  }

  renderRow = ( {item, index} = data ) => <VersiculoButton active={this.state.vers.id == item.id} item={item} callback={this.showSuperiorBar}></VersiculoButton>

  render() {

    console.log(this.state.maxChapter)
    if(this.state.carregando && this.state.carregandomaxChapter){
      return (<View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
        <ActivityIndicator/>  
        </View>
        );
    }else {
      /**
       * By passing extraData={this.state} to FlatList we make sure FlatList itself will re-render when the state.selected changes. Without setting this prop, FlatList would not know it needs to re-render any items because it is also a PureComponent and the prop comparison will not show any changes.
       */
    return (
     <Root>
      <View style={{flex: 1}}>
      <View style={{height:typeof this.state.vers.id !== 'undefined' ? 40 : 0, opacity: typeof this.state.vers.id !== 'undefined' ? 40 : 0, flexDirection:'row', backgroundColor:'#222'}}>
          <TouchableOpacity onPress={() => {
             let shareOptions = {
              title: "Compartilhamento",
              message: this.state.vers.content + " - " +this.state.chapterId+":"+this.state.vers.position +", "+ this.props.book.title + " - Leve Bíblia ",
            };

            Share.open(shareOptions);
          }} style={{flex: 1,  alignItems:'center',justifyContent:'center'}}>
            <Icon name='share-variant' color='white' size={30}></Icon>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={this._fav_versc} 
            style={{flex: 1, alignItems:'center',justifyContent:'center'}}>
            <Icon name='heart' color='white' size={30}></Icon>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={ () => {
            this.props.navigator.showLightBox({
                  screen: "add_anotacao", 
                  passProps: {
                    vers: this.state.vers
                  },
              
                  style: {
                      width: deviceWidth,
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

          <TouchableOpacity onPress={this._color_versc} style={{flex: 1, alignItems:'center',justifyContent:'center'}}>
            <Icon name='palette' color='yellow' size={30}></Icon>
          </TouchableOpacity>
   
      </View>
        <View style={{flex: 1, flexDirection:'row',}}>
        <View style={{backgroundColor:'#222', width: 60, flex: 0, padding: 5 }}>
            <ScrollView>

          {this.state.maxChapter.map( (el, inx) => {
            return (
              <TouchableOpacity key={inx} onPress={this._selectChapter.bind(this, inx+1)}>
                <View style={{width: 45, height: 40, alignItems:'center', justifyContent:'center', borderRadius: 5,  marginBottom: 4}}>
                  <Text style={{color: this.state.chapterId == inx+1 ? 'red' : '#fff',}}>{inx+1}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
          </ScrollView>
        </View>
        <FlatList 
        style={{flex: 1}}
          keyExtractor={item => item.id.toString()}
          data={this.state.items} extraData={this.state.showSuperior} renderItem={this.renderRow}>
        </FlatList>

        </View>
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

 selectedChapter: livroReducer.selectedChapter,

});

/** dispatch actions */
const mapDispatchToProps = dispatch => ({
  setChapterId: (value) => dispatch(setChapterId(value)),
  selectBook: (value) => dispatch(setBook(value))
});



export default connect(mapStateToProps, mapDispatchToProps )(Versiculos);
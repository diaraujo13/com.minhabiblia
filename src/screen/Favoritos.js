import React, {Component} from 'react';
import {
  Alert,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {Text, Root} from 'native-base';
import SQLite from 'react-native-sqlite-storage';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RdcVersiculoButton from '../component/RdcVersiculoButton';

export default class Favoritos extends Component {
  state = {
    carregando: true,
    items: []
  };

  constructor() {
    super();
  }

  screenDidAppear() {
    console.log('screenDidAppear')
  }

  async componentDidMount() {

    var db = SQLite.openDatabase({
      name: "biblia",
      createFromLocation: 1
    }, () => {
      db.transaction(async(tx) => {

        await tx.executeSql(`
          SELECT 
          Versiculo.id,
          Versiculo.content,
          Versiculo.position,
          Versiculo.chapter,
          Livros.title
          
          FROM Versiculo
          LEFT OUTER JOIN Livros ON Versiculo.book = Livros.id
          WHERE Versiculo.fav = 1
          GROUP BY Versiculo.id
          `, [], async(tx, results) => {

          let rows = results
            .rows
            .raw();
          // console.log(rows);

          await this.setState({items: rows, carregando: false})
        });
      });

    }, () => {
      console.log("Error");
    });

  }

  renderRow = ({item, index} = data) => <RdcVersiculoButton item={item}></RdcVersiculoButton>

  render() {
    if (this.state.carregando) {
      return (
        <View
          style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ActivityIndicator/>
        </View>
      );
    } else if (!this.state.carregando && this.state.items.length === 0) {
      return (
        <Root>
          <View
            style={{
            flex: 1,
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon name='heart' size={145} color='#ccc'></Icon>
            <Text style={{
              textAlign:'center',
              color:'#ccc'
            }}>Nenhum versículo foi salvo em favorito ainda.</Text>
          </View>
        </Root>
      )
    } else {
      return (
        <Root>
          <View style={{
            flex: 1,
            padding: 20
          }}>
            <FlatList
              style={{
              flex: 1
            }}
              keyExtractor={item => item
              .id
              .toString()}
              data={this.state.items}
              renderItem={this.renderRow}></FlatList>
          </View>
        </Root>
      );
    }
  }
}
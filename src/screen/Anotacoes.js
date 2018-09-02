/*************************************************************************
*
*  [2018] Izaías Araújo | Visional Studio
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Izaías Araújo and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Izaías Araújo
* and its suppliers and may be covered by U.S. and Foreign Patents,
* patents in process, and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Izaías Araújo.
*/

import React, {Component} from 'react';
import {
  Platform,
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
  Image
} from 'react-native';
import {
  List,
  ListItem,
  Toast,
  Right,
  Fab,
  Grid,
  Col,
  Thumbnail,
  Form,
  Title,
  Spinner,
  Item,
  Input,
  Label,
  Container,
  Header,
  Card,
  Body,
  CardItem,
  Button,
  Content,
  ActionSheet,
  Text,
  Root
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SQLite from 'react-native-sqlite-storage';

export default class Anotacoes extends Component {
  state = {
    carregando: true,
    anotacoes: []
  };

  constructor() {
    super();
  }

  componentDidMount() {
    var db = SQLite.openDatabase({
      name: "biblia",
      createFromLocation: 1
    }, () => {
      db.transaction(async(tx) => {

        await tx.executeSql(`
            SELECT * FROM Anotacoes
            WHERE Anotacoes.versId = ${this.props.versId};
            `, [], async(tx, results) => {
          let rows = results
            .rows
            .raw();

          await this.setState({anotacoes: rows, carregando: false});;

        });
      });
    });
  }

  render() {
    if (this.state.carregando) {
      return (
        <View style={AppStyle.center}>
          <ActivityIndicator></ActivityIndicator>
        </View>
      );
    } else {
      return (
        <Root>
          <View style={AppStyle.centerized}>
            <Text style={AppStyle.h1Header}>
              {this.state.anotacoes.length} anotações foram encontradas
            </Text>
            <FlatList
              data={this.state.anotacoes}
              renderItem={({item, index}) => <Text style={AppStyle.row}>{item.content}</Text>}></FlatList>
          </View>
        </Root>
      );
    } // fim do else
  } // fim do render ()
} // fim da class

const AppConfiguration = {

  lightgreen: '#25D366',
  white: '#FFFFFF',
  blue: '#34B7F1',
  bg: '#ECE5DD',
  fontBody: '#8a8a8a',
  black: '#000'
}

const AppStyle = StyleSheet.create({
  /** Container */
  centerized: {
    flex: 1
  },

  /** Typography */
  h1Header: {
    color: AppConfiguration.fontBody,
    fontWeight: 'bold',
    fontSize: 20,
    padding: 20
  },
  subHeader: {
    color: AppConfiguration.fontBody,
    marginTop: 10,
    fontSize: 15
  },

  row: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
});
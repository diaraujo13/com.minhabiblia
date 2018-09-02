import React, {Component} from 'react';
import {
  Platform,
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
  Textarea,
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
  Icon,
  ActionSheet,
  Text,
  Root
} from 'native-base';
import SQLite from 'react-native-sqlite-storage';

export default class AddAnotacao extends Component {
  state = {
    carregando: false,
    anotacaoSalva: false,
    anotacao: ''
  };

  constructor() {
    super();
  }

  saveAnotation = async() => {
    let {anotacao} = this.state;

    this.setState({carregando: true});

    var db = SQLite.openDatabase({
      name: "biblia",
      createFromLocation: 1
    }, () => {
      db.transaction(async(tx) => {

        await tx.executeSql(`
          INSERT INTO Anotacoes (versId, content)
          VALUES (${this.props.vers.id}, '${anotacao}' )`, [], async(tx, results) => {

          let rows = results
            .rows
            .raw();

          await this.setState({anotacaoSalva: true, carregando: false});;
        });
      });

    }, () => {
      console.log("Error");
    });
  }

  render() {
    if (this.state.carregando) {
      return (
        <View
        style={{
        flex: 0,
        padding: 20,
        marginHorizontal: 20,
        height: 300,
        backgroundColor: '#f8f8f8',
        borderRadius: 10
      }}>
        <ActivityIndicator></ActivityIndicator>
        
      </View>
      );
    } else if (this.state.carregando && this.state.anotacaoSalva){
      return (<View
        style={{
        flex: 0,
        padding: 20,
        marginHorizontal: 20,
        height: 300,
        backgroundColor: '#f8f8f8',
        borderRadius: 10
      }}>
        <Text
          style={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#444'
        }}>
          ANOTAÇÃO ADICIONADA COM SUCESSO
        </Text>
     
        
      </View>)
    }else {
      return (
        <View
          style={{
          flex: 0,
          padding: 20,
          marginHorizontal: 20,
          height: 300,
          width: this.props.deviceWidth,
          backgroundColor: '#f8f8f8',
          borderRadius: 10
        }}>
          <Text
            style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#444'
          }}>
            ADICIONAR ANOTAÇÃO
          </Text>
          <Textarea
            onChangeText={ anotacao => this.setState({anotacao}) }
            style={{
            flex: 1,
            borderColor: '#ccc',
            borderWidth: 1,
            margin: 10,
            padding: 4,
            borderRadius: 4
          }}
            autoFocus></Textarea>
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
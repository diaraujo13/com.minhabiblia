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
  StyleSheet,
  TouchableOpacity,
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
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';

const height = Dimensions
  .get('window')
  .height / 2;

const width = Dimensions
  .get('window')
  .width;

export default class ImageGen extends Component {
  state = {
    carregando: false,
    fontSize: 15
  };

  constructor() {
    super();
  }

  componentDidMount() {}

  _shareImage = () => {
    this
      .refs
      .viewShot
      .capture()
      .then(uri => {

        console.log(uri);

        const shareOptions = {
          title: 'Compartilhe a imagem',
          message: 'Compartilhado via - Minha Bíblia Sagrada - Leia a Bíblia sem Internet -market://details?id=com.minhabiblia',
          url: uri
        };

        Share.open(shareOptions);
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
        <Root >
          <View style={AppStyle.container}>

            <ViewShot
              ref="viewShot"
              options={{
              format: "jpg",
              quality: 1
            }}>
              <View style={AppStyle.centerized}>

                <Image style={[AppStyle.image]} source={require('../images/bg_one.jpg')}></Image>
                <View
                  style={{
                  flex: 3,
                  alignContent: 'center',
                  justifyContent: 'center'
                }}>

                  <Text
                    style={[
                    AppStyle.descr, {
                      flex: 0,
                    }
                  ]}>
                    "{this.props.vers.content}"
                  </Text>
                </View>
                <Text style={[AppStyle.descr, AppStyle.subdescr]}>{this.props.vers.book} {this.props.vers.chapterId}:{this.props.vers.position}</Text>
                <Text
                  style={{
                  flex: 0,
                  alignSelf: 'flex-end',
                  textAlign: 'center',
                  color: 'white',
                  opacity: .3,
                  fontSize: 12
                }}>Minha Bíblia Sagrada</Text>
              </View>
            </ViewShot>
            <View style={{}}>
              <TouchableOpacity onPress={this._shareImage}>
                <View
                  style={{
                  flex: 0,
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: AppConfiguration.fontBody,
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <Icon color={AppConfiguration.fontBody} size={32} name='share-variant'></Icon>
                  <Text
                    style={[
                     {
                    marginLeft: 20,
                      flex: 0,
                      color: AppConfiguration.fontBody,
                    }
                  ]}>COMPARTILHAR IMAGEM</Text>
                </View>
              </TouchableOpacity>

            </View>
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
  container: {
    flex: 2,
    justifyContent: 'center',
  },
  centerized: {
    flex: 0,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: height,
    padding: 10,
    backgroundColor: AppConfiguration.black
  },
  subdescr: {
    fontWeight: 'bold',
    textAlign: 'right',
    alignSelf: 'flex-end'
  },
  image: {
    minHeight: height,
    width: width,
    flex: 1,
    position: 'absolute',
    opacity: .4,
    resizeMode: 'cover'
  },

  /** Typography */
  h1Header: {
    color: AppConfiguration.lightgreen,
    fontWeight: 'bold',
    fontSize: 30
  },
  subHeader: {
    color: AppConfiguration.fontBody,
    marginTop: 10,
    fontSize: 15
  },
  descr: {
    flex: 1,
    color: 'white',
    fontStyle: 'italic',
    fontFamily: 'serif'
  }
});
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import SQLite from 'react-native-sqlite-storage';

import {Provider} from 'react-redux';

import store from './store';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LivrosScreen from './screen/LivrosScreen';
import Versiculos from './screen/Versiculos';
import AddAnotacao from './lightbox/AddAnotacao';


const MainStore = store();

// Registro das telas para receberem um identificador
Navigation.registerComponent('start', () => LivrosScreen, MainStore, Provider);
Navigation.registerComponent('vers', () => Versiculos, MainStore, Provider);
Navigation.registerComponent('add_anotacao', () => AddAnotacao, MainStore, Provider);



Promise.all([
Icon.getImageSource("view-grid", 30),

Icon.getImageSource("heart", 30),
Icon.getImageSource("magnify", 30),
Icon.getImageSource("history", 30),
]).then(results => {


Navigation.startTabBasedApp({
  tabs: [
    {
      title:'Livros',
      label: 'Livros', // tab label as appears under the icon in iOS (optional)
      screen: 'start', // unique ID registered with Navigation.registerScreen
      icon: results[0], // local image asset for the tab icon unselected state (optional on iOS)
      navBarHidden: true
    }, 
    {
      title:'Favoritos',
      label: "Favoritos", // tab label as appears under the icon in iOS (optional)
      screen: 'start', // unique ID registered with Navigation.registerScreen
      icon: results[1]
    },
    {
      title:'Buscar',
      label: "Buscar", // tab label as appears under the icon in iOS (optional)
      screen: 'start', // unique ID registered with Navigation.registerScreen
      icon: results[2]
    },
    {
      title:'Mais',
      label: "Buscar", // tab label as appears under the icon in iOS (optional)
      screen: 'start', // unique ID registered with Navigation.registerScreen
      icon: results[2]
    },
  ],

  appStyle: {
    keepStyleAcrossPush: false,
    tabBarBackgroundColor: '#f8f8f8',
    tabBarButtonColor:'#ccc',
    tabBarSelectedButtonColor: '#222',
    statusBarHidden: true,
  }});
})
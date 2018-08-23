import SQLite from 'react-native-sqlite-storage';

var db = SQLite.openDatabase({
    name : "biblia.db",
    createFromLocation : 1
  } 
);


export default db;
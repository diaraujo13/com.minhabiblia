import { SET_BOOK, SET_CHAPTER_ID, SET_VERS_ID } from "../action";

const initialState = {
    velhoTestamento: [],
    novoTestamento: [],

    selectedBook: {
      id: 0,
      title: ''
    },
    selectedChapter: 1,
    selectedVers: 1,

    totalChaptersBook: 0,
    totalVersChapter: 0,

    prevChapter: null,
    nextChapter: null
    
};


const livroReducer = (state = initialState, action) => {
    switch (action.type) {

      case SET_BOOK:
        return { ...state, selectedBook: action.payload };
      break;

      case SET_CHAPTER_ID:
        return { ...state, selectedChapter: action.payload };
      break;
    

      case SET_VERS_ID:
        return { ...state, selectedChapter: action.payload };
      break;


      default:
        return state;
    }
  };
  

  export default livroReducer;

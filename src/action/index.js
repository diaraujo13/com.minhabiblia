export const SET_BOOK = 'SET_BOOK';

export const  setBook = (book = { 
    id: 1,
    title: 'Genesis'
}) => ({
    type: SET_BOOK,
    payload: book
});

export const SET_CHAPTER_ID = 'SET_CHAPTER_ID';

export const setChapterId = id  => ({
    type: SET_CHAPTER_ID,
    payload: id
});

export const SET_VERS_ID = 'SET_VERS_ID';

export const setVersId = id => ({
    type: SET_VERS_ID,
    payload: id
});
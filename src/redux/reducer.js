import { GET_VG, GET_BY_NAME, GET_BY_ID, ORDER_ALPHABETIC, ORDER_RATING, FILTER_ORIGIN, SET_CURRENT_PAGE, FILTER_GENDER } from './action-types';

const initialState = {
  allVideogames: [],
  allVideogamesBackup: [],
  currentPage: 1,
  pageSize: 15,
};

const convertToBoolean = (value) => {
  return value === 'true';
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VG:
      return { 
        ...state, 
        allVideogames: action.payload, 
        allVideogamesBackup: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        allVideogames: action.payload,
      };
    case GET_BY_ID:
      return {
        ...state,
        gameDetails: action.payload,
      };
    case ORDER_RATING:
      const sortedByRating = [...state.allVideogames];
      if (action.payload === 'A') {
        sortedByRating.sort((a, b) => a.rating - b.rating); 
      } else if (action.payload === 'D') {
        sortedByRating.sort((a, b) => b.rating - a.rating);
      }
      return {
        ...state,
        allVideogames: sortedByRating,
        currentPage: 1,
      };
    case ORDER_ALPHABETIC:
      const sortedAlphabetically = [...state.allVideogames];
      if (action.payload === 'A') {
        sortedAlphabetically.sort((a, b) => a.name.localeCompare(b.name));
      } else if (action.payload === 'D') {
        sortedAlphabetically.sort((a, b) => b.name.localeCompare(a.name));
      }
      return {
        ...state,
        allVideogames: sortedAlphabetically,
        currentPage: 1,
      };
    case FILTER_ORIGIN: 
      if (action.payload === 'all') {
        return { 
          ...state, 
          allVideogames: state.allVideogamesBackup,
          currentPage: 1,
        };
      } else {
        const filteredByOrigin = state.allVideogamesBackup.filter((videogame) => 
          videogame.created === convertToBoolean(action.payload)
        );
        
        return {
          ...state,
          allVideogames: filteredByOrigin,
          currentPage: 1,
        };
      };
    case FILTER_GENDER:
      if (action.payload === 'all') {
        return {
          ...state,
          allVideogames: state.allVideogames,
          currentPage: 1,
        };
      } else {
        const filteredByGenre = state.allVideogames.filter((videogame) => 
          videogame.genres && videogame.genres.some(genre => genre.name === action.payload)
        );

        return {
          ...state,
          allVideogames: filteredByGenre,
          currentPage: 1,
        };
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    default:
      return {...state};
  }
};

export default rootReducer;
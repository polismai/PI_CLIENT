import { 
  GET_VG, 
  GET_BY_NAME, 
  ORDER_ALPHABETIC, 
  ORDER_RATING, 
  FILTER_ORIGIN, 
  SET_CURRENT_PAGE, 
  FILTER_GENDER, 
  GET_GENRES, 
  SET_ERROR, 
  GET_PLATFORMS, 
  SET_ALL_VIDEOGAMES, 
  SET_SEARCH_STRING, 
  GET_DETAIL,
  CLEAN_DETAIL,
  SET_ORIGIN_VALUE,
  SET_GENDER_VALUE
} from './action-types';

import { ORDERS, DEFAULT_VALUE } from '../constants';

const initialState = {
  allVideogames: [],
  filteredVideogames: [],
  detail: {},
  currentPage: 1,
  pageSize: 15,
  allGenres: [],
  allPlatforms: [],
  searchString: '',
  error: '',
  selectedOriginValue: DEFAULT_VALUE,
  selectedGenderValue: DEFAULT_VALUE
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VG:
      return { 
        ...state, 
        allVideogames: action.payload, 
      };
    case SET_SEARCH_STRING: 
      return {
        ...state,
        searchString: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        filteredVideogames: action.payload,
        currentPage: 1,
      };
    case SET_ALL_VIDEOGAMES:
      return {
        ...state,
        filteredVideogames: [],
        currentPage: 1,
        searchString: '',
        error: ''
      };
    case GET_DETAIL:
      return {
        ...state, 
        detail: action.payload,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        detail: {},
      };
    case ORDER_RATING:
      const sortedByRating = [...(state.filteredVideogames.length ? state.filteredVideogames : state.allVideogames)];
      if (action.payload === ORDERS.A) {
        sortedByRating.sort((a, b) => a.rating - b.rating); 
      } else if (action.payload === ORDERS.D) {
        sortedByRating.sort((a, b) => b.rating - a.rating);
      }
      return {
        ...state,
        filteredVideogames: sortedByRating,
        currentPage: 1,
      };
    case ORDER_ALPHABETIC:
      const sortedAlphabetically = [...(state.filteredVideogames.length ? state.filteredVideogames : state.allVideogames)];
      if (action.payload === ORDERS.A) {
        sortedAlphabetically.sort((a, b) => a.name.localeCompare(b.name));
      } else if (action.payload === ORDERS.D) {
        sortedAlphabetically.sort((a, b) => b.name.localeCompare(a.name));
      }
      return {
        ...state,
        filteredVideogames: sortedAlphabetically,
        currentPage: 1,
      };
    case FILTER_ORIGIN: 
      let filteredByOrigin;

      if (state.searchString !== '') {
        filteredByOrigin = state.filteredVideogames.filter((videogame) => 
          typeof videogame.id === action.payload
        );
      } else if (state.filteredVideogames.length > 0) {
        filteredByOrigin = state.filteredVideogames.filter((videogame) => 
          typeof videogame.id === action.payload
        );
      } else {
        filteredByOrigin = state.allVideogames.filter((videogame) => 
          typeof videogame.id === action.payload
        );
      }  
      return {
        ...state,
        filteredVideogames: filteredByOrigin,
        currentPage: 1,
        error: filteredByOrigin.length ? '' : "No se encontraron videojuegos"
      };
    case FILTER_GENDER:
      let filteredByGenre;

      if (state.searchString !== '') {
        filteredByGenre = state.filteredVideogames.filter((videogame) => 
          videogame.genres && videogame.genres.some(genre => genre.name === action.payload)
        );
      } else if (state.filteredVideogames.length > 0) {
        filteredByGenre = state.filteredVideogames.filter((videogame) => 
          videogame.genres && videogame.genres.some(genre => genre.name === action.payload)
        );
      } else {
        filteredByGenre = state.allVideogames.filter((videogame) =>
        videogame.genres && videogame.genres.some(genre => genre.name === action.payload)
        );
      }
      return {
        ...state,
        filteredVideogames: filteredByGenre,
        currentPage: 1,
        error: filteredByGenre.length ? '' : 'No se encontraron videojuegos para ese género'
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    case GET_GENRES:
      return {
        ...state,
        allGenres: action.payload
      };
    case GET_PLATFORMS:
      return {
        ...state,
        allPlatforms: action.payload
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_ORIGIN_VALUE:
      return {
        ...state,
        selectedOriginValue: action.payload
      }
    case SET_GENDER_VALUE:
      return {
        ...state,
        selectedGenderValue: action.payload
      }
    default:
      return {...state};
  }
};

export default rootReducer;
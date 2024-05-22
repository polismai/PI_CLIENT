import { GET_VG, GET_BY_NAME, ORDER_ALPHABETIC, ORDER_RATING, FILTER_ORIGIN, SET_CURRENT_PAGE, FILTER_GENDER, GET_GENRES, SET_ERROR, GET_PLATFORMS } from './action-types';

const initialState = {
  allVideogames: [],
  allVideogamesBackup: [],
  reloadGames: undefined,
  currentPage: 1,
  pageSize: 15,
  allGenres: [],
  allPlatforms: [],
  searchString: '',
  error: '',
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
        allVideogames: action.payload.videogameByName,
        searchString: action.payload.searchString,
        currentPage: 1,
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
        let filteredByOrigin;

        if (state.searchString !== '') {
          filteredByOrigin = state.allVideogames.filter((videogame) => 
            videogame.created === convertToBoolean(action.payload)
          );
        } else {
          filteredByOrigin = state.allVideogamesBackup.filter((videogame) => 
            videogame.created === convertToBoolean(action.payload)
          );
        }
        
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
          allVideogames: state.allVideogamesBackup,
          currentPage: 1,
          error: ''
        };
      } else {
        let filteredByGenre;

        if (state.searchString !== '') {
          filteredByGenre = state.allVideogames.filter((videogame) => 
            videogame.genres && videogame.genres.some(genre => genre.name === action.payload)
          );
        } else {
          filteredByGenre = state.allVideogamesBackup.filter((videogame) => 
            videogame.genres && videogame.genres.some(genre => genre.name === action.payload)
          );
        }

        if (!filteredByGenre.length) {
          return {
            ...state,
            allVideogames: [],
            currentPage: 1,
            error: 'No se encontraron videojuegos para ese género'
          };
        } else {
          return {
            ...state,
            allVideogames: filteredByGenre,
            currentPage: 1,
            error: ''
          };
        }
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
    default:
      return {...state};
  }
};

export default rootReducer;
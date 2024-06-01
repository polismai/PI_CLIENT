import { 
  GET_VG, 
  GET_BY_NAME, 
  GET_DETAIL,
  CLEAN_DETAIL,
  ORDER_ALPHABETIC, 
  ORDER_RATING, 
  FILTER_ORIGIN, 
  FILTER_GENDER,
  SET_CURRENT_PAGE, 
  GET_GENRES,
  GET_PLATFORMS,
  SET_ERROR,
  SET_SEARCH_STRING,
  SET_ALL_VIDEOGAMES
} from './action-types';
import axios from 'axios';
import { URL_BASE } from '../constants';

export const getAllVideogames = () => {
  return async (dispatch) => {
    try {
      const { data: { allVideogames }} = await axios.get(URL_BASE);
    
      dispatch({
        type: GET_VG,
        payload: allVideogames,
      });
    } catch (error) {
      console.error('Error al cargar los videojuegos:', error)
      throw error;
    }
  };
};

export const setSearchString = (searchString) => {
  return {
    type: SET_SEARCH_STRING,
    payload: searchString,
  };
};

export const getByName = (name) => {
  return async (dispatch) => {
    try {
      const { data: { videogameByName }} = await axios.get(`${URL_BASE}?name=${name}`);

      if (!videogameByName.length) {
        throw new Error('No se encontraron videojuegos con ese nombre');
      }

      dispatch({
        type: GET_BY_NAME,
        payload: videogameByName,
      });

    } catch (error) {
      console.error('Error al cargar el videogame:', error);
      throw error;
    }
  };
};

export const setAllVideogames = (videogames) => {
  return {
    type: SET_ALL_VIDEOGAMES,
    payload: videogames,
  };
};

export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data: { videogameDetail }} = await axios.get(`${URL_BASE}/${id}`);
    
      dispatch({
        type: GET_DETAIL,
        payload: videogameDetail,
      });
    } catch (error) {
      console.error('Error al cargar el detalle del videojuego:', error)
      throw error;
    }
  };
};

export const cleanDetail = () => {
  return {
    type: CLEAN_DETAIL
  };
};

export const orderByRating = (order_rating) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ORDER_RATING,
        payload: order_rating
      })
    } catch (error) {
      console.log("error")
    }
  };
};

export const orderByAlphabetic = (order_alphabetic) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ORDER_ALPHABETIC,
        payload: order_alphabetic
      })
    } catch (error) {
      console.log("error")
    }
  };
};

export const filterByOrigin = (origin) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FILTER_ORIGIN,
        payload: origin
      })
    } catch (error) {
      console.log("error")
    }
  };
};

export const filterByGender = (gender) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FILTER_GENDER,
        payload: gender
      })
    } catch (error) {
      console.log("error")
    }
  };
};

export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page
  };
};

export const getAllGenres = () => {
  return async (dispatch) => {
    const endpoint = 'http://localhost:3001/genres';
    try {
      const { data: { allGenres }} = await axios.get(endpoint);
    
      dispatch({
        type: GET_GENRES,
        payload: allGenres,
      })
    } catch (error) {
      console.error('Error al cargar los generos:', error)
      throw error
    }
  };
 };

 export const getAllPlatforms = () => {
  return async (dispatch) => {
    try {
      const { data: { allVideogames }} = await axios.get(URL_BASE);

      const uniquePlatforms = new Set();
      allVideogames.forEach((game) => {
        game.platforms.forEach((platform) => {
          uniquePlatforms.add(platform.name);
        });
      });
      const allPlatforms = Array.from(uniquePlatforms);

      dispatch({
        type: GET_PLATFORMS,
        payload: allPlatforms
      });
    } catch (error) {
      console.error('Error al obtener las plataformas:', error);
    }
  };
 };

 export const setError = (error) => {
  return {
     type: SET_ERROR,
     payload: error
  };
};

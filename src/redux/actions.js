import { 
  GET_VG, 
  GET_BY_NAME, 
  ORDER_ALPHABETIC, 
  ORDER_RATING, 
  FILTER_ORIGIN, 
  FILTER_GENDER, 
  SET_CURRENT_PAGE, 
  GET_GENRES,
  SET_ERROR
} from './action-types';
import axios from 'axios';

export const getAllVideogames = () => {
  return async (dispatch) => {
    const endpoint = 'http://localhost:3001/videogames/';
    const { data: { allVideogames }} = await axios.get(endpoint);
    
    dispatch({
      type: GET_VG,
      payload: allVideogames,
    });
  };
};

export const getByName = (name) => {
  return async (dispatch) => {
    try {
      const endpoint = `http://localhost:3001/videogames?name=${name}`;
      const { data: { videogameByName }} = await axios.get(endpoint);

      if (!videogameByName.length) {
        throw new Error('No se encontraron videojuegos con este nombre');
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

export const orderByRating = (order_rating) => {
  return {
    type: ORDER_RATING,
    payload: order_rating
  };
};

export const orderByAlphabetic = (order_alphabetic) => {
  return {
    type: ORDER_ALPHABETIC,
    payload: order_alphabetic
  };
};

export const filterByOrigin = (origin) => {
  return {
    type: FILTER_ORIGIN,
    payload: origin
  };
};

export const filterByGender = (gender) => {
  return {
    type: FILTER_GENDER,
    payload: gender
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
    const { data: { allGenres }} = await axios.get(endpoint);
    
    dispatch({
      type: GET_GENRES,
      payload: allGenres,
    })
  };
 };

 export const setError = (error) => {
  return {
     type: SET_ERROR,
     payload: error
  };
};

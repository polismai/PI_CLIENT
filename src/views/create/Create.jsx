import { useState, useEffect } from 'react';
import axios from 'axios';
import validate from './Validate';
import { useNavigate } from 'react-router-dom';
import { PLATFORMS } from '../../constants';
import MiniNavbar from '../../components/miniNavbar/MiniNavbar';
import { useSelector, useDispatch } from 'react-redux';
import { getAllGenres } from '../../redux/actions';

import style from './Create.module.css';


const Create = () => {

  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.allGenres);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        await dispatch(getAllGenres());
      } catch (error) {
        console.error('Error al cargar los generos:', error);
      }
    };

    fetchGenres();
  }, []);

  const [input, setInput] = useState({
    name: '',
    background_image: '',
    description: '',
    platforms: [],
    released: '',
    rating: '',
    genres: [],
  });

  const [errors, setErrors] = useState({
    name: [],
    background_image: [],
    description: [],
    platforms: [],
    released: [],
    rating: [],
    genres: [],
  });
 
  const handleChange = (event) => {

    const property = event.target.name;
    let value = event.target.value;

    setInput({
      ...input,
      [property]: value
    });

    const listaDeErrores = validate({...input, [property]: value});
    setErrors(listaDeErrores)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      return
    }

    const listaDeErrores = validate(input);
    setErrors(listaDeErrores);
    const hasErrors = Object.values(listaDeErrores).every(arr => Array.isArray(arr) && arr.length > 0);
    if (hasErrors) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3001/videogames', input);
      const videogameID = response.data.newId;

      console.log('Nuevo videojuego creado con ID:', videogameID);

      setLoading(false);
      navigate(`/detail/${videogameID}`);
    } catch (error) {
      setLoading(false);
      console.error('Error al crear el nuevo videojuego:', error);
    }
  };
  
  const handleGenreChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    setInput({ ...input, genres: selectedOptions });
    setErrors({ ...errors, genres: []});
  };

  const handlePlatformChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    setInput({ ...input, platforms: selectedOptions });
    setErrors({ ...errors, platforms: []});
  };
  
  return (
    <>
    <MiniNavbar />
    <div className={style.formWrapper}>
      <h2>Crear nuevo videojuego</h2>
      <form className={style.form} onSubmit={handleSubmit}> 
        <div className={style.container}>
          <div className={style.input}>
            <label htmlFor='name'>Nombre</label>
            <div>
              <input name='name' value={input.name} onChange={handleChange} />
              <span>{errors.name}</span>
            </div>
          </div>
          <div className={style.input}>
            <label htmlFor='background_image'>Imagen</label>
            <div>
              <input name='background_image' value={input.background_image} onChange={handleChange} />
              <span>{errors.background_image}</span>
            </div>  
          </div>
          <div className={style.input}>
            <label htmlFor='description'>Descripción</label>
            <div>
              <input name='description' value={input.description} onChange={handleChange} />
              <span>{errors.description}</span>
            </div>
          </div>
          <div className={style.input}>
            <label htmlFor='platforms'>Plataformas</label>
            <div>
              <select multiple onChange={handlePlatformChange} name='platforms'>
                {PLATFORMS.map((platform, id) => (
                  <option key={id} value={platform}>{platform}</option>
                ))}
              </select>
              <span>{errors.platforms}</span>
            </div>
          </div>
          <div className={style.input}>
            <label htmlFor='released'>Fecha de lanzamiento</label>
            <div>
              <input name='released' placeholder='aaaa-mm-dd'value={input.released} onChange={handleChange} />
              <span>{errors.released}</span>
            </div>
          </div>
          <div className={style.input}>
            <label htmlFor='rating'>Rating</label>
            <div>
              <input type='number' name='rating' value={input.rating} onChange={handleChange} />
              <span>{errors.rating}</span>
            </div>  
          </div>
          <div className={style.input}>
            <label>Géneros</label>
            <div>
              <select multiple onChange={handleGenreChange} name='genres'>
                {allGenres.map(genre => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
              </select>
              <span>{errors.genres}</span>
            </div>  
          </div>
        </div>
        <button type='submit' className={style.submit} disabled={loading}>{loading ? 'Creando videojuego....' : 'Crear videojuego'}</button>
      </form>
    </div>
    </>
  );
};

export default Create;
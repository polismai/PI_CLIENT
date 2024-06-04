import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import validate from './Validate';
import MiniNavbar from '../../components/miniNavbar/MiniNavbar';
import { getAllGenres, getAllPlatforms, getAllVideogames } from '../../redux/actions';

import style from './Create.module.css';

const Create = () => {

  const allGenres = useSelector((state) => state.allGenres);
  const allPlatforms = useSelector((state) => state.allPlatforms);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        await dispatch(getAllGenres());
      } catch (error) {
        throw new Error('Error al cargar los generos:', error.message);
      }
    };

    fetchGenres();
  }, [dispatch]);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        await dispatch(getAllPlatforms());
      } catch (error) {
        throw new Error('Error al cargar las plataformas:', error.message);
      }
    };

    fetchPlatforms();
  }, [dispatch]);
  
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

  const [formTouched, setFormTouched] = useState(false);
  const [interacted, setInteracted] = useState({
    name: false,
    background_image: false,
    description: false,
    platforms: false,
    released: false,
    rating: false,
    genres: false
  });
 
  const handleChange = (event) => {
    setFormTouched(true);

    const property = event.target.name;
    const value = event.target.value;

    setInteracted({...interacted, [property]: true});
    setInput({
      ...input,
      [property]: value
    });

    const listaDeErrores = validate({...input, [property]: value});
    setErrors(listaDeErrores)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3001/videogames', input);
      const videogameID = response.data.newId;

      setLoading(false);
      dispatch(getAllVideogames());
      navigate(`/detail/${videogameID}`);
    } catch (error) {
      setLoading(false);
      throw new Error('Error al crear el nuevo videojuego:', error.message);
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

  const disable = () => {
    if (!formTouched) {
      return true;
    }
  
    for (const key in errors) {
      if (errors[key].length > 0) {
        return true;
      }
    }
  
    return loading;
  };

  return (
    <>
    <MiniNavbar />
    <div className={style.formWrapper}>
      <form className={style.form} onSubmit={handleSubmit}> 
        <div className={style.container}>
          <div className={style.input}>
            <label htmlFor='name'>Nombre</label>
            <div>
              <input name='name' value={input.name} className={errors.name.length ? style.error : (interacted.name ? style.success : undefined)} onChange={handleChange} />
              {errors.name && <span className={style.text_error}>{errors.name}</span>}
            </div>
          </div>
          <div className={style.input}>
            <label htmlFor='background_image'>Imagen</label>
            <div>
              <input name='background_image' value={input.background_image} className={errors.background_image.length ? style.error : (interacted.background_image ? style.success : undefined)} onChange={handleChange} />
              {errors.background_image && <span className={style.text_error}>{errors.background_image}</span>}
            </div>  
          </div>
          <div className={style.input}>
            <label htmlFor='description'>Descripción</label>
            <div>
              <textarea name='description' value={input.description} rows={10} style={{width: "100%"}} className={errors.description.length ? style.error : (interacted.description ? style.success : undefined)} onChange={handleChange}>
              </textarea>
              {errors.description && <span className={style.text_error}>{errors.description}</span>}
            </div>
          </div>
          <div className={style.input}>
            <label htmlFor='platforms'>Plataformas</label>
            <div>
              <select multiple className={errors.platforms.length ? style.error : (interacted.platforms ? style.success : undefined)} onChange={handlePlatformChange} name='platforms'>
                {allPlatforms.map((platform, id) => (
                  <option key={id} value={platform}>{platform}</option>
                ))}
              </select>
              {errors.platforms && <span className={style.text_error}>{errors.platforms}</span>}
            </div>
          </div>
          <div className={style.input}>
            <label htmlFor='released'>Fecha de lanzamiento</label>
            <div>
              <input name='released' placeholder='aaaa-mm-dd' value={input.released} className={errors.released.length ? style.error : (interacted.released ? style.success : undefined)} onChange={handleChange} />
              {errors.released && <span className={style.text_error}>{errors.released}</span>}
            </div>
          </div>
          <div className={style.input}>
            <label htmlFor='rating'>Rating</label>
            <div>
              <input type='number' name='rating' value={input.rating} className={errors.rating.length ? style.error : (interacted.rating ? style.success : undefined)} onChange={handleChange} />
              {errors.rating && <span className={style.text_error}>{errors.rating}</span>}
            </div>  
          </div>
          <div className={style.input}>
            <label>Géneros</label>
            <div>
              <select multiple className={errors.genres.length ? style.error : (interacted.genres ? style.success : undefined)}onChange={handleGenreChange} name='genres'>
                {allGenres.map(genre => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
              </select>
              {errors.genres && <span className={style.text_error}>{errors.genres}</span>}
            </div>  
          </div>
        </div>
        <button type='submit' className={style.submit} disabled={disable()}>
          {loading ? 'Creando videojuego....' : 'Crear videojuego'}
        </button>
      </form>
    </div>
    </>
  );
};

export default Create;
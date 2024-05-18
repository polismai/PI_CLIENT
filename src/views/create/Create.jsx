import { useState, useEffect } from 'react';
import axios from 'axios';
import validate from './Validate';
import { useNavigate } from 'react-router-dom';

import style from './Create.module.css';

const Create = () => {

  const navigate = useNavigate();
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const [allGenres, setAllGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const {data: { allGenres }} = await axios.get('http://localhost:3001/genres');
        setAllGenres(allGenres);
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
    const value = event.target.value;

    setInput({
      ...input,
      [property]: value
    });

    const listaDeErrores = validate({...input, [property]: value});
    setErrors(listaDeErrores)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const listaDeErrores = validate(input);
    setErrors(listaDeErrores);
    

    const hasErrors = Object.values(listaDeErrores).every(arr => Array.isArray(arr) && arr.length > 0);

    if (hasErrors) {
      return;
    }

    try {
      // Realizar la solicitud POST para crear un nuevo videojuego
      const response = await axios.post('http://localhost:3001/videogames', input);
      const videogameID = response.data.newId;

      console.log('Nuevo videojuego creado con ID:', videogameID);
      setSubmittedSuccessfully(true);
      // Redirigir a la página de inicio u otra página según sea necesario
      // Aquí puedes usar algún enrutador de cliente como react-router-dom para redirigir
      navigate('/home');
    } catch (error) {
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
                <option value="PC">PC</option>
                <option value="PlayStation 5">PlayStation 5</option>
                <option value="Xbox One">Xbox One</option>
                <option value="PlayStation 4">PlayStation 4</option>
                <option value="Xbox Series S/X">Xbox Series S/X</option>
                <option value="Nintendo Switch">Nintendo Switch</option>
                <option value="iOS">iOS</option>
                <option value="Android">Android</option>
                <option value="Nintendo 3DS">Nintendo 3DS</option>
                <option value="Nintendo DS">Nintendo DS</option>
                <option value="Nintendo DSi">Nintendo DSi</option>
              </select>
              <span>{errors.platforms}</span>
            </div>
          </div>
          <div className={style.input}>
            <label htmlFor='released'>Fecha de lanzamiento</label>
            <div>
              <input name='released' value={input.released} onChange={handleChange} />
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
        <button type='submit' className={style.submit}>Crear videojuego</button>
      </form>
      {submittedSuccessfully && <p>¡El juego se creó correctamente!</p>}
    </div>
  );
};

export default Create;
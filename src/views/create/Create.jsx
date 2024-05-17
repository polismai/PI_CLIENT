import { useState } from 'react';
import axios from 'axios';
import validate from './Validate';
import { useNavigate } from 'react-router-dom';

import style from './Create.module.css';

const Create = () => {

  const navigate = useNavigate();
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  const [input, setInput] = useState({
    name: '',
    image: '',
    description: '',
    platforms: '',
    released: '',
    rating: '',
    genres: [],
  });

  const [errors, setErrors] = useState({
    name: [],
    image: [],
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

    const listaDeErrores = validate({...input, [property]:value});
    setErrors(listaDeErrores)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    //Validar el formulario antes de enviarlo
    const listaDeErrores = validate(input);
    setErrors(listaDeErrores);
    // if (Object.keys(listaDeErrores).length > 0) {
    //   return; // No enviar el formulario si hay errores
    // }

    try {
      // Realizar la solicitud POST para crear un nuevo videojuego
      const response = await axios.post('/http://localhost:3001/videogames', input);
      const videogameID = response.data.newId;

      await Promise.all(input.genres.map(async (genreId) => {
        // await axios.post(`/http://localhost:3001/videogames/${videogameId}/genres/${genreId}`);
      }));

      // Manejar la respuesta
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
    const { value } = event.target;
    if (!input.genres.includes(value)) {
      setInput({ ...input, genres: [...input.genres, value] });
      setErrors({ ...errors, genres: [] });
    }
  };

  const removeGenre = (genre) => {
    const updatedGenres = input.genres.filter((g) => g !== genre);
    setInput({ ...input, genres: updatedGenres });
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
              <label htmlFor='image'>Imagen</label>
              <div>
                <input name='image' value={input.image} onChange={handleChange} />
                <span>{errors.image}</span>
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
                <input name='platforms' value={input.platforms} onChange={handleChange} />
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
                <select multiple onChange={handleGenreChange}>
                  <option value= 'Action'>Action</option>
                  <option value= 'Indie'>Indie</option>
                  <option value= 'Adventure'>Adventure</option>
                  <option value= 'RPG'>RPG</option>
                  <option value= 'Strategy'>Strategy</option>
                  <option value= 'Shooter'>Shooter</option>
                  <option value= 'Casual'>Casual</option>
                  <option value= 'Simulation'>Simulation</option>
                  <option value= 'Puzzle'>Puzzle</option>
                  <option value= 'Arcade'>Arcade</option>
                  <option value= 'Platformer'>Platformer</option>
                  <option value= 'Racing'>Racing</option>
                  <option value= 'Massively Multiplayer'>Massively Multiplayer</option>
                  <option value= 'Sports'>Sports</option>
                  <option value= 'Fighting'>Fighting</option>
                  <option value= 'Family'>Family</option>
                  <option value= 'Board Games'>Board Games</option>
                  <option value= 'Educational'>Educational</option>
                  <option value= 'Card'>Card</option>
                </select>
                  <span>{errors.genres}</span>
              </div>  
            </div>
            <div>
              {input.genres.map((genre, index) => (
                <span key={index} className={style.genreTag} onClick={() => removeGenre(genre)}>
                  {genre} X
                </span>
              ))}
            </div>
          </div>
          <button type='submit' className={style.submit}>Crear videojuego</button>
        </form>
        {submittedSuccessfully && <p>¡El juego se creó correctamente!</p>}
      </div>
    );
};

export default Create;
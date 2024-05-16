import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../searchBar/SearchBar';
import style from './Navbar.module.css';

const Navbar = ({ handleChange, handleSubmit, errorMessage, handleOrderByRating, handleOrderByAlphabetic, handleFilterByOrigin, handleFilterByGender }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const showNav = location.pathname !== '/';

  return (
    <>
      {showNav && (
        <div className={style.nav}>
          <button onClick = {()=> navigate("/home")}>Home</button>  
          <button onClick = {()=> navigate(-1)}>Atras</button>
          <button onClick = {()=> navigate("/create")}>Crear</button>
          <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} errorMessage={errorMessage}/>  
          <div className={style.containerSelect}>
            <select className={style.select} onChange={handleOrderByRating}>
              <option value= 'A'>Ascendente</option>
              <option value= 'D'>Descendente</option>
            </select>
            <select className={style.select} onChange={handleOrderByAlphabetic}>
              <option value= 'A'>A-Z</option>
              <option value= 'D'>Z-A</option>
            </select>
            <select className={style.select} onChange={handleFilterByOrigin}>
              <option value= 'all'>Todos</option>
              <option value= 'false'>Api</option>
              <option value= 'true'>BDD</option>
            </select>
            <select className={style.select} onChange={handleFilterByGender}>
              <option value= 'all'>Todos</option>
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
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;



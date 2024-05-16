import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames, getByName, orderByAlphabetic, orderByRating, filterByOrigin, filterByGender, setCurrentPage } from '../../redux/actions';
import Navbar from '../../components/navbar/Navbar';
import Cards from '../../components/cards/Cards';
import style from './Home.module.css';


const Home = () => {

  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.allVideogames);
  const filteredVideogames = useSelector((state) => state.filteredVideogames);
  const currentPage = useSelector((state) => state.currentPage);
  const pageSize = useSelector((state) => state.pageSize);
  // const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllVideogames());
        // setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar los videojuegos:', error);
      }
    };

    fetchData();
    // dispatch(getAllVideogames())
    // return (() => {
    //   clearDetail()
    // })
  }, [dispatch]);

  // if (isLoading) {
  //   return <div>Cargando videojuegos...</div>;
  // }

  //*FILTRO CON EL BACKEND

  const [searchString, setSearchString] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    setSearchString(event.target.value)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(getByName(searchString));
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('¡No se encontraron videojuegos con este nombre!');
    }
  };

  //* FILTRO SOBRE EL ESTADO

  // const [filtered, setFiltered] = useState(allVideogames);
  // const [searchString, setSearchString] = useState('');

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setSearchString(e.target.value)
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const filtered = allVideogames.filter(videogame => 
  //     videogame.name.includes(searchString)
  //   );
  //   setFiltered(filtered);
  // }

  const handleOrderByRating = (event) => {
    dispatch(orderByRating(event.target.value));
  };

  const handleOrderByAlphabetic = (event) => {
    dispatch(orderByAlphabetic(event.target.value));
  };

  const handleFilterByOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value));
  };

  const handleFilterByGender = (event) => {
    dispatch(filterByGender(event.target.value));
  };

  // const handlePageChange = (page) => {
  //   dispatch(setCurrentPage(page));
  // };


  const currentVideogames = filteredVideogames.length > 0 ? filteredVideogames : allVideogames;
  console.log('QUIERO VER ESTO:', allVideogames)
  console.log('Y ESTO OTRO:', currentVideogames)

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentDisplayedVideogames = currentVideogames.slice(startIndex, endIndex);

  const totalPages = Math.ceil(currentVideogames.length / pageSize);
  // const totalPages = Math.ceil((filteredVideogames.length > 0 ? filteredVideogames.length : allVideogames.length) / pageSize);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  }

  const handleFirstPage = () => {
    goToPage(1);
  };

  const handleLastPage = () => {
    goToPage(totalPages);
  };

    return (
      <div className={style.home}>
        <h2 className={style.title}>Esta es la Home page</h2>
        <Navbar 
          handleChange={handleChange} 
          handleSubmit={handleSubmit} 
          errorMessage={errorMessage}
          handleOrderByRating={handleOrderByRating} 
          handleOrderByAlphabetic={handleOrderByAlphabetic}
          handleFilterByOrigin={handleFilterByOrigin} 
          handleFilterByGender={handleFilterByGender} 
        />
        <Cards allVideogames={currentDisplayedVideogames} />
        <div className={style.pagination}>
          <button onClick={() => goToPage(currentPage - 1)}>Anterior</button>
          <button onClick={handleFirstPage}>Primera</button>
          <span>Pagina {currentPage} de {totalPages}</span>
          <button onClick={handleLastPage}>Última</button>
          <button onClick={() => goToPage(currentPage + 1)}>Siguiente</button>
        </div>
      </div>
    );
};



export default Home;

// disabled={currentPage === 1}
// disable={currentPage === totalPages}

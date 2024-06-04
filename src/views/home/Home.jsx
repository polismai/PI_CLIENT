import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames, getAllGenres, setCurrentPage, setError } from '../../redux/actions';
import Navbar from '../../components/navbar/Navbar';
import Cards from '../../components/cards/Cards';
import SearchBar from '../../components/searchBar/SearchBar'
import Loader from '../../components/loader/Loader'
import style from './Home.module.css';

const Home = () => {

  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.allVideogames);
  const filteredVideogames = useSelector((state) => state.filteredVideogames);
  const allGenres = useSelector((state) => state.allGenres);
  const currentPage = useSelector((state) => state.currentPage);
  const pageSize = useSelector((state) => state.pageSize);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllVideogames());
      } catch (error) {
        dispatch(setError('Error al cargar los videojuegos'));
        throw new Error('Error al cargar los videojuegos:', error.message);
      }
    };

    if (!allVideogames.length) {
      fetchData();
    }
  }, [allVideogames]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        await dispatch(getAllGenres());
      } catch (error) {
        throw new Error('Error al cargar los generos:', error.message);
      }
    };

    if (!allGenres.length) {
      fetchGenres();
    }
  }, [allGenres]);
    
  const [totalPages, setTotalPages] = useState(0);
  const [paginatedVideogames, setPaginatedVideogames] = useState([]);

  const calculatePage = () => {
    const dataToPaginate = filteredVideogames.length ? filteredVideogames : allVideogames;
    const totalPages = Math.ceil(dataToPaginate.length / pageSize);
    return { dataToPaginate, totalPages };
  }

  useEffect(() => {
    const { dataToPaginate, totalPages } = calculatePage();
    const startIndex = (currentPage - 1) * pageSize; //Calculo el indice de inicio para la paginacion
    const endIndex = Math.min(startIndex + pageSize, dataToPaginate.length);
    const paginatedVideogames = dataToPaginate.slice(startIndex, endIndex); //Obtengo la porcion de videojuegos de la pagina actual
    setPaginatedVideogames(paginatedVideogames);

    setTotalPages(totalPages);
  }, [filteredVideogames, allVideogames, currentPage, pageSize])

  const handleFirstPage = () => {
    dispatch(setCurrentPage(1));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    const { totalPages } = calculatePage();
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handleLastPage = () => {
    const { totalPages } = calculatePage();
    dispatch(setCurrentPage(totalPages));
  };

  return (
    <div className={style.generalWrapper}>
      <Navbar />
      <div className={style.home}>
        <SearchBar />
        <main>
          {error && <div className={style.error}>{error}</div>}
          {!error && (paginatedVideogames.length !== 0 && <Cards allVideogames={paginatedVideogames} />)} 
          {!error && (paginatedVideogames.length === 0 && <Loader />)}

          {!error && paginatedVideogames.length > 0 && (
            <div className={style.pagination}>
              <button onClick={handleFirstPage} disabled={currentPage === 1}>Inicio</button>
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
              <div>Pagina {currentPage} de {totalPages}</div>
              <button onClick={handleNextPage} disabled={currentPage === Math.ceil((filteredVideogames.length || allVideogames.length) / pageSize)}>Siguiente</button>
              <button onClick={handleLastPage} disabled={currentPage === Math.ceil((filteredVideogames.length || allVideogames.length) / pageSize)}>Ultima</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
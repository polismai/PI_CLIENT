import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames, getAllGenres, setCurrentPage, setError } from '../../redux/actions';
import Navbar from '../../components/navbar/Navbar';
import Cards from '../../components/cards/Cards';
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
        console.error('Error al cargar los videojuegos:', error);
      }
    };

    if (!allVideogames.length) {
      fetchData();
    }
  }, [dispatch, allVideogames]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        await dispatch(getAllGenres());
      } catch (error) {
        console.error('Error al cargar los generos:', error);
      }
    };

    if (!allGenres.length) {
      fetchGenres();
    }
  }, [dispatch, allGenres]);
    
  const [totalPages, setTotalPages] = useState(0);
  const [paginatedVideogames, setPaginatedVideogames] = useState([]);

  useEffect(() => {
    const dataToPaginate = filteredVideogames.length ? filteredVideogames : allVideogames;
    const startIndex = (currentPage - 1) * pageSize; //Calculo el indice de inicio para la paginacion
    const endIndex = Math.min(startIndex + pageSize, dataToPaginate.length);
    const paginatedVideogames = dataToPaginate.slice(startIndex, endIndex); //Obtengo la porcion de videojuegos de la pagina actual
    setPaginatedVideogames(paginatedVideogames);

    const totalPages = Math.ceil(dataToPaginate.length / pageSize);
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
    const dataToPaginate = filteredVideogames.length ? filteredVideogames : allVideogames;
    const totalPages = Math.ceil(dataToPaginate.length / pageSize);
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handleLastPage = () => {
    const dataToPaginate = filteredVideogames.length ? filteredVideogames : allVideogames;
    const totalPages = Math.ceil(dataToPaginate.length / pageSize);
    dispatch(setCurrentPage(totalPages));
  };

  return (
    <div className={style.home}>
      <h2 className={style.title}>Videogames</h2>
      <Navbar />

      {!error && (paginatedVideogames.length !== 0 ? <Cards allVideogames={paginatedVideogames} /> : <span>CARGANDO...</span>)}
      {error && <div>{error}</div>}

      {paginatedVideogames.length > 0 && (
        <div className={style.pagination}>
          <button onClick={handleFirstPage} disabled={currentPage === 1}>Inicio</button>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
          <span>Pagina {currentPage} de {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === Math.ceil((filteredVideogames.length || allVideogames.length) / pageSize)}>Siguiente</button>
          <button onClick={handleLastPage} disabled={currentPage === Math.ceil((filteredVideogames.length || allVideogames.length) / pageSize)}>Última</button>
        </div>
      )}
    </div>
  );
};

export default Home;
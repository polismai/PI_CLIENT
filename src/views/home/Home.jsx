import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames, setCurrentPage } from '../../redux/actions';
import Navbar from '../../components/navbar/Navbar';
import Cards from '../../components/cards/Cards';
import style from './Home.module.css';

const Home = () => {

  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.allVideogames);
  const currentPage = useSelector((state) => state.currentPage);
  const pageSize = useSelector((state) => state.pageSize);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllVideogames());
      } catch (error) {
        console.error('Error al cargar los videojuegos:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const [totalPages, setTotalPages] = useState(0);
  const [paginatedVideogames, setPaginatedVideogames] = useState([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedVideogames = allVideogames.slice(startIndex, endIndex);
    setPaginatedVideogames(paginatedVideogames);

    const totalPages = Math.ceil(allVideogames.length / pageSize);
    setTotalPages(totalPages);
  }, [allVideogames, currentPage, pageSize])

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
      <Navbar />

      {paginatedVideogames.length !== 0 ? <Cards allVideogames={paginatedVideogames} /> : <span>CARGANDO...</span>}

      <div className={style.pagination}>
        <button onClick={handleFirstPage}>Primera</button>
        <button onClick={() => goToPage(currentPage - 1)}>Anterior</button>
        <span>Pagina {currentPage} de {totalPages}</span>
        <button onClick={() => goToPage(currentPage + 1)}>Siguiente</button>
        <button onClick={handleLastPage}>Última</button>
      </div>
    </div>
  );
};

export default Home;
import style from './Landing.module.css';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className={style.landing}>
      <h1>VIDEOGAMES</h1>
      <button onClick = {()=> navigate("/home")}>Play</button>
    </div>    
  );
};

export default Landing;
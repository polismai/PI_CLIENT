import { useNavigate } from 'react-router-dom';

import style from './MiniNavbar.module.css';

const MiniNavbar = () => {

  const navigate = useNavigate();
  return (
    <div>
      <div className={style.nav}>
          <button onClick = {()=> navigate("/home")}>Home</button>  
      </div>
    </div>
  )
};

export default MiniNavbar;
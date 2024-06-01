import style from './Loader.module.css';

const Loader = () => {
  return (
    <div className={style.container}>
      <div className={style.loader}><div></div><div></div><div></div><div></div></div>
    </div>
  )
};

export default Loader;
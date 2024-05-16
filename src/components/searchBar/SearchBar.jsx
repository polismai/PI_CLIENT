import style from "./SearchBar.module.css";


const SearchBar = ({ handleChange, handleSubmit, errorMessage }) => {


    return (
        <div className={style.search_container}>
            <form onSubmit={handleSubmit} className={style.search_form}>
                <input 
                    className={style.search_input} 
                    placeholder='Escribe aqui el nombre del videojuego' 
                    type='search'
                    onChange={handleChange}
                />
                <button className={style.search_button} type='submit'>
                    Buscar
                </button>
            </form>
            {errorMessage && <div className={style.errorMessage}>{errorMessage}</div>}
        </div>
    );
}

export default SearchBar;




import { Link } from 'react-router-dom';
import './style/components.css';
import NavBar from './NavBar';

function MainScreen() {
    return(
        <div>
            <div className="principalFont">
                <NavBar/>
                <div className="moviesSquare"></div>
                <div className="crudSquare">
                    <h1 style={{position:'absolute',top:"50px"}}>GESTOR DE PELICULAS</h1>
                    <Link to="http://localhost:3000/buscarpeliculas">
                        <button className="buttons" style={{top:"250px", left:"200px"}}>BUSCAR PELICULAS</button>
                    </Link>
                    
                    <Link to="http://localhost:3000/agregarpeliculas">
                        <button className="buttons" style={{top:"350px", left:"200px"}}>AGREGAR PELICULA</button>
                    </Link>
                    
                    <Link to="http://localhost:3000/modificarpeliculas">
                        <button className="buttons" style={{top:"450px", left:"200px"}}>MODIFICAR PELICULAS</button>
                    </Link>
                    
                    <Link to="http://localhost:3000/eliminarpeliculas">
                        <button className="buttons" style={{top:"550px", left:"200px"}}>ELIMINAR PELICULAS</button>
                    </Link>
                    
                </div>
            </div>
        </div>
    );
}

export default MainScreen;
import './style/components.css';
import NavBar from './NavBar';

function AddModule() {
    return (
        <div>
            <div className="operativeFont">
                <NavBar/>
                <div className="formsSquare">
                    <h2 style={{position:"absolute", top:"200px", left:"560px"}}>TITULO</h2>
                    <input style={{position:'absolute', width:"250px", height:"50px", top:"270px", left:"480px"}}></input>

                    <h2 style={{position:"absolute", top:"200px", left:"940px"}}>IDIOMA</h2>
                    <input style={{position:'absolute', width:"250px", height:"50px", top:"270px", left:"850px"}}></input>

                    <h2 style={{position:"absolute", top:"200px", left:"1280px"}}>DIRECTOR</h2>
                    <input style={{position:'absolute', width:"250px", height:"50px", top:"270px", left:"1210px"}}></input>

                    <h2 style={{position:"absolute", top:"350px", left:"560px"}}>FECHA</h2>
                    <input style={{position:'absolute', width:"250px", height:"50px", top:"420px", left:"480px"}}></input>

                    <h2 style={{position:"absolute", top:"350px", left:"940px"}}>GENERO</h2>
                    <input style={{position:'absolute', width:"250px", height:"50px", top:"420px", left:"850px"}}></input>

                    <h2 style={{position:"absolute", top:"350px", left:"1280px"}}>DURACION</h2>
                    <input style={{position:'absolute', width:"250px", height:"50px", top:"420px", left:"1210px"}}></input>

                    <button className="buttons" style={{top: "600px", left:"830px"}}>AGREGAR</button>
                </div>
            </div>
        </div>
    );
}
export default AddModule;
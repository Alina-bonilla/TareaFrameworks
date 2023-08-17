import './style/components.css';
import fakeData from "../MOCK_DATA.json";
import NavBar from './NavBar';
import React, { useState } from 'react';
import Modal from 'react-modal';
import {useTable} from "react-table"; 
import axios from 'axios';

function SearchModule() {
    
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [actual, setActual] = useState([]);
    const [estadoInput, setEstadoInput] = useState(false);

    const [titulo, setTitulo] = useState("");
    const [edad, setEdad] = useState("");
    const [idioma, setIdioma] = useState("");
    const [director, setDirector] = useState("");
    const [fecha, setFecha] = useState("1901-01-01");
    const [genero, setGenero] = useState("");
    const [duracion, setDuracion] = useState(0);


    const setValues = (results) => {
        setActual(results);
    }

    const setEstado = (value) => {
        setEstadoInput(value);
    }

    const setRes = (values) => {
        setData(values);
    }

    const list = [
        "asdasdas",
        "sddfsdf"
    ]

    const showModal = (value) => {
        setOpenModal(value);
    }
    const busqueda = () => {
        axios.post("http://localhost:3307/buscarpeliculas", {
            titulo:titulo,
            idioma:idioma,
            fecha:fecha,
            genero:genero,
        }).then((response) => {
            console.log(response);
            setData(response.data);
            console.log("si");
        });
        
    }

    const columns = React.useMemo( () => [
        {
            Header:"ID",
            accessor:"id",
        },
        {
            Header:"TITULO",
            accessor:"titulo",
        }
    ],
    []
    );
    
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data});

    const handleRowClick = (row, value) => {
        setEstado(value);
        showModal(true);
        setValues(row.original);
        console.log("ID:", row.original.id);
        
    };

    const handleRowDelete = (row) => {
        alert("fila"+row.id+"eliminada");
    }

    return (
        <div>
            
            <Modal className= "resultModal" isOpen = {openModal}>
                <div>
                    <h1>DETALLES DE PELICULA</h1>
                </div>
                <div>
                    <h2 style={{position:'absolute', left:"80%"}}>GENEROS</h2>
                    <table className="genreTable" style={{position:'absolute', left:"76%",top:"170px"}}>
                        <thbody>
                            
                        </thbody>
                    </table>
                    <h2 style={{position:'absolute', left:"30px"}}>IDENTIFICADOR:</h2>
                    <input className="inputModal" style={{position:'absolute',top:"120px", left:"18%"}} value={actual.id}></input>

                    <h2 style={{position:'absolute', left:"30px", top:"160px"}}>TITULO:</h2>
                    <input className="inputModal" style={{position:'absolute', left:"11%", top:"177px"}} value={actual.titulo}></input>

                    <h2 style={{position:'absolute', left:"30px", top:"220px"}}>DIRECTOR:</h2>
                    <input className="inputModal" style={{position:'absolute', left:"13%", top:"237px"}} value={actual.director}></input>

                    <h2 style={{position:'absolute', left:"30px", top:"280px"}}>IDIOMA:</h2>
                    <input className="inputModal" style={{position:'absolute', left:"10%", top:"297px"}} value={actual.idioma}></input>

                    <h2 style={{position:'absolute', left:"30px", top:"340px"}}>EDAD REQUERIDA:</h2>
                    <input className="inputModal" style={{position:'absolute', left:"20%", top:"357px"}} value={actual.edad}></input>

                    <h2 style={{position:'absolute', left:"30px", top:"400px"}}>FECHA DE ESTRENO:</h2>
                    <input className="inputModal" style={{position:'absolute', left:"23%", top:"417px"}} value={actual.fecha}></input>

                    <h2 style={{position:'absolute', left:"30px", top:"460px"}}>DURACION:</h2>
                    <input className="inputModal" style={{position:'absolute', left:"15%", top:"477px"}} value={actual.duracion}></input>
                </div>
                <div>
                    <button className='buttons' style={{position: 'absolute', top:"85%", left:"37%"}} onClick={() => showModal(false)}>CERRAR</button>
                </div>
            </Modal>
            <div className="operativeFont">
            <NavBar/>
                <div className="formsSquare">
                    <h1>BUSQUEDA DE PELICULAS</h1>
                    <h2 style={{position:"absolute", top:"200px", left:"260px"}}>TITULO</h2>
                    <input onChange={(e) => {setTitulo(e.target.value)}} style={{position:'absolute', width:"250px", height:"50px", top:"270px", left:"180px"}}></input>

                    <h2 style={{position:"absolute", top:"200px", left:"640px"}}>IDIOMA</h2>
                    <input onChange={(e) => {setIdioma(e.target.value)}} style={{position:'absolute', width:"250px", height:"50px", top:"270px", left:"550px"}}></input>

                    <h2 style={{position:"absolute", top:"350px", left:"260px"}}>FECHA</h2>
                    <input onChange={(e) => {setFecha(e.target.value)}} type="date" style={{position:'absolute', width:"250px", height:"50px", top:"420px", left:"180px"}}></input>

                    <h2 style={{position:"absolute", top:"350px", left:"640px"}}>GENERO</h2>
                    <select  className="selectGenre" onChange={(e) => {setGenero(e.target.value)}} style={{position:"absolute",top:"420px", left:"550px", textAlign:"center"}}>
                        <option>DRAMA</option>
                        <option>ACCION</option>
                        <option>COMEDIA</option>
                        <option>FANTASIA</option>
                        <option>SUSPENSO</option>
                        <option>TERROR</option>
                    </select>
                
                    <button className="buttons" onClick={busqueda} style={{top: "600px", left:"350px"}}>BUSCAR</button>
                    <div className="resultsSquare">
                        <table className="resultsTable" style={{position:"absolute"}} {...getTableProps()}>
                            <thead>
                                {headerGroups.map((headerGroup)=> (
                                    <tr {...headerGroup.getHeaderGroupProps()} className="table-header">
                                        {headerGroup.headers.map((column) => (
                                            <th style={{position: "sticky"}} {...column.getHeaderProps()}>
                                                {column.render("Header")}
                                            </th>
                                            
                                        ))}
                                        <th>OPCIONES </th>
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row) => {
                                    prepareRow(row);
                                    return(
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell) => (
                                                <td {...cell.getCellProps()}>
                                                    {cell.render("Cell")}
                                                    
                                                </td>
                                            ))}
                                            <div style={{width:"400px"}}>
                                                <button className="resultButtons" onClick={() => handleRowClick(row, false)}>VER DETALLES</button>
                                                <button className="modifyButtons" onClick={() => handleRowClick(row, true)}>MODIFICAR</button>
                                                <button className="deleteButtons" onClick={() => handleRowDelete(row)}>ELIMINAR</button>
                                            </div>
                                        </tr>
                                    );
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SearchModule;
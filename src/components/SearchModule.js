import './style/components.css';
import fakeData from "../MOCK_DATA.json";
import NavBar from './NavBar';
import React, { useState } from 'react';
import Modal from 'react-modal';
import {useTable} from "react-table"; 

function SearchModule() {
    
    const data = React.useMemo( () => fakeData, []);
    const [openModal, setOpenModal] = useState(false);
    const [actual, setActual] = useState([]);
    const setValues = (results) => {
        setActual(results);
    }

    const list = [
        "asdasdas",
        "sddfsdf"
    ]

    const showModal = (value) => {
        setOpenModal(value);
    }
    const columns = React.useMemo( () => [
        {
            Header:"ID",
            accessor:"id",
        },
        {
            Header:"TITULO",
            accessor:"first_name",
        },
        {
            Header:"DIRECTOR",
            accessor:"last_name",
        }
    ],
    []
    );
    
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data});

    const handleRowClick = (row) => {
        showModal(true);
        setValues(row.original);
        console.log("ID:", row.original.id);
        
    };

    return (
        <div>
            
            <Modal className= "resultModal" isOpen = {openModal}>
                <div>
                    <h1>DETALLES DE PELICULA</h1>
                </div>
                <div>
                    <h2 style={{position:'absolute', left:"70%"}}>GENEROS</h2>
                    <table className="genreTable" style={{position:'absolute', left:"63%",top:"170px"}}>
                        <thbody>
                            
                        </thbody>
                    </table>
                    <h2 style={{position:'absolute', left:"10%"}}>ID:</h2>
                    <h2 style={{position:'absolute', left:"15%"}}>{actual.id}</h2>

                    <h2 style={{position:'absolute', left:"10%", top:"20%"}}>TITULO:</h2>
                    <h2 style={{position:'absolute', left:"23%", top:"20%"}}>{actual.id}</h2>

                    <h2 style={{position:'absolute', left:"10%", top:"25%"}}>DIRECTOR:</h2>
                    <h2 style={{position:'absolute', left:"28%", top:"25%"}}>{actual.id}</h2>

                    <h2 style={{position:'absolute', left:"10%", top:"30%"}}>IDIOMA:</h2>
                    <h2 style={{position:'absolute', left:"23%", top:"30%"}}>{actual.id}</h2>

                    <h2 style={{position:'absolute', left:"10%", top:"35%"}}>EDAD REQUERIDA:</h2>
                    <h2 style={{position:'absolute', left:"37%", top:"35%"}}>{actual.id}</h2>

                    <h2 style={{position:'absolute', left:"10%", top:"40%"}}>FECHA DE ESTRENO:</h2>
                    <h2 style={{position:'absolute', left:"40%", top:"40%"}}>{actual.id}</h2>

                    <h2 style={{position:'absolute', left:"10%", top:"45%"}}>DURACION:</h2>
                    <h2 style={{position:'absolute', left:"27%", top:"45%"}}>{actual.id}</h2>
                </div>
                <div>
                    <button className='buttons' style={{position: 'absolute', top:"80%", left:"32%"}} onClick={() => showModal(false)}>CERRAR</button>
                </div>
            </Modal>
            <div className="operativeFont">
            <NavBar/>
                <div className="formsSquare">
                    <h1>BUSQUEDA DE PELICULAS</h1>
                    <h2 style={{position:"absolute", top:"200px", left:"260px"}}>TITULO</h2>
                    <input style={{position:'absolute', width:"250px", height:"50px", top:"270px", left:"180px"}}></input>

                    <h2 style={{position:"absolute", top:"200px", left:"640px"}}>IDIOMA</h2>
                    <input style={{position:'absolute', width:"250px", height:"50px", top:"270px", left:"550px"}}></input>

                    <h2 type="datetime-local" style={{position:"absolute", top:"350px", left:"260px"}}>FECHA</h2>
                    <input type='datetime-local' style={{position:'absolute', width:"250px", height:"50px", top:"420px", left:"180px"}}></input>

                    <h2 style={{position:"absolute", top:"350px", left:"640px"}}>GENERO</h2>
                    <select  className="selectGenre" style={{position:"absolute",top:"420px", left:"550px", textAlign:"center"}}>
                        <option>DRAMA</option>
                        <option>ACCION</option>
                        <option>COMEDIA</option>
                        <option>FANTASIA</option>
                        <option>SUSPENSO</option>
                        <option>TERROR</option>
                    </select>
                
                    <button className="buttons" style={{top: "600px", left:"350px"}}>BUSCAR</button>
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
                                        <th>DETALLES</th>
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
                                            <button className="resultButtons" onClick={() => handleRowClick(row)}>VER DETALLES</button>
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
import './style/components.css';
import fakeData from "../MOCK_DATA.json";
import React from 'react';
import {useTable} from "react-table"; 

function SearchModule() {
    
    
    
    const data = React.useMemo( () => fakeData, []);
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

    return (
        <div>
            <div className="operativeFont">
                <div className="formsSquare">
                    <h1>BUSQUEDA DE PELICULAS</h1>
                    <h2 style={{position:"absolute", top:"200px", left:"160px"}}>TITULO</h2>
                    <input style={{position:'absolute', width:"250px", height:"50px", top:"270px", left:"80px"}}></input>
                    <h2 style={{position:"absolute", top:"200px", left:"540px"}}>IDIOMA</h2>
                    <input style={{position:'absolute', width:"250px", height:"50px", top:"270px", left:"450px"}}></input>

                    <h2 style={{position:"absolute", top:"350px", left:"160px"}}>FECHA</h2>
                    <input style={{position:'absolute', width:"250px", height:"50px", top:"420px", left:"80px"}}></input>
                    <h2 style={{position:"absolute", top:"350px", left:"540px"}}>GENERO</h2>
                    <input style={{position:'absolute', width:"250px", height:"50px", top:"420px", left:"450px"}}></input>

                    <button className="buttons" style={{top: "600px", left:"250px"}}>BUSCAR</button>
                    <div className="resultsSquare">
                        <table enableStickyHeader style={{position:"absolute"}} {...getTableProps()}>
                            <thead>
                                {headerGroups.map((headerGroup)=> (
                                    <tr {...headerGroup.getHeaderGroupProps()} className="table-header">
                                        {headerGroup.headers.map((column) => (
                                            <th style={{position: "sticky"}} {...column.getHeaderProps()}>
                                                {column.render("Header")}
                                            </th>
                                        ))}
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
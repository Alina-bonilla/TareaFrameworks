import MainScreen from './components/MainScreen.js';
import SearchModule from './components/SearchModule.js';
import AddModule from './components/AddModule.js';
import DeleteModule from './components/DeleteModule.js';
import ModifyModule from './components/ModifyModule.js';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path = "/" element = {<MainScreen/>}/>
            <Route exact path = "/buscarpeliculas" element = {<SearchModule/>}/>
            <Route exact path = "/agregarpeliculas" element = {<AddModule/>}/>
            <Route exact path = "/modificarpeliculas" element = {<ModifyModule/>}/>
            <Route exact path = "/eliminarpeliculas" element = {<DeleteModule/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;

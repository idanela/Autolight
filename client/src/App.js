import React from "react";
import './App.css';
import {BrowserRouter} from 'react-router-dom'
import MenuScreen from './screens/MenuScreen/MenuScreen';


function App() {
    return (
        <BrowserRouter>
            <main className="main">

                <MenuScreen/>

            </main>
        </BrowserRouter>
    );
}

export default App;




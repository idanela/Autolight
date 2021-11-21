import React from "react";
import './App.css';
import {BrowserRouter} from 'react-router-dom'
import MenuScreen from './screens/MenuScreen/MenuScreen';


function App() {

/*    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open");
    }
    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open")
    }*/

    return (
        <BrowserRouter>
            <main className="main">

                <MenuScreen/>

            </main>
        </BrowserRouter>
    );
}

export default App;




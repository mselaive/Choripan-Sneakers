import React from 'react'
import { RandomUser } from "./components/RandomUser";
import { Header } from "./components/Header";
import { Carrito } from "./components/Carrito";
import {DataProvider} from './context/DataProvider';
import { BrowserRouter as Router} from "react-router-dom";
import Pages from "./components/Page.js";
import "boxicons";
import Footer from 'components/footer';

function App() {

  return (
    <DataProvider>
    <div className="App">
      <Router>
      <Header />
      <Carrito />
      <Pages />
      <RandomUser />
      </Router>

    </div>
    <Footer/>
    </DataProvider>
  );
}

export default App;

import './App.css';
import React, { useState } from 'react';
import Upload from './Upload.js';
import Cropper from './Cropper.js';
import GridSelector from './GridSelector.js';
import Image from './Image.js';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";



function App() {
  const [images, setImages] = useState([{ src: process.env.PUBLIC_URL + '/img/museum-national-d-histoire-naturelle.png'}]);
  const [thumbs, setThumbs] = useState([])

  return (
    <div className="App">
      <Router>
        <nav id="Nav-bar">
          {/* <li><button><Link to="/upload">Télecharger une image</Link></button></li>
          <li><button><Link to="/crop">Recadrer l'image</Link></button></li>
          <li><button><Link to="/gridselector">grid</Link></button></li> */}
        </nav>
        <Switch>
            <Route
              exact
              path="/" 
              render={() => <Upload setImages={setImages}/>}
            />
            <Route
              exact
              path="/crop" 
              render={() => <Cropper src={images[0]["src"]} setImages={setImages} ></Cropper>}
            />
            <Route 
              exact
              path="/gridselector" 
              render={() => <GridSelector images={images} thumbs={thumbs} setThumbs={setThumbs}/>}
            />
              <Route
                  
                  path="/mOsaic/:id" 
                  render={(props, value) => <Image {...props} thumbs={thumbs} setThumbs={setThumbs} /> }
              />
        </Switch>
      </Router>


    </div>
  );
}

export default App;

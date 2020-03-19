import './App.css';
import React, { useState, useEffect } from 'react';
import Upload from './Upload.js';
import Cropper from './Cropper.js';
import GridSelector from './GridSelector.js';
import Image from './Image.js';
import DefaultImag from './07180db8.svg'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";



function App() {
  const [images, setImages] = useState([{ src: DefaultImag}]);
  const [thumbs, setThumbs] = useState([])


console.log(thumbs)
  return (
    <div className="App">
      <Router>
        <nav id="Nav-bar">
          <li><Link to="/upload">upload</Link></li>
          <li><Link to="/crop">crop</Link></li>
          <li><Link to="/gridselector">grid</Link></li>
        </nav>
        <Switch>
            <Route
              exact
              path="/upload" 
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
                  
                  path="/gridselector/:id" 
                  render={(props, value) => <Image {...props} thumbs={thumbs} setThumbs={setThumbs} /> }
              />


        </Switch>
        
      </Router>


    </div>
  );
}

export default App;

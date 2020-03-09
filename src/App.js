import './App.css';
import React, { useState, useEffect } from 'react';
import Upload from './Upload.js';
import Cropper from './Cropper.js';
import GridSelector from './GridSelector.js';
import Image from './Image.js';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// All route props (match, location and history) are available to User
function User(props) {
  return <h1>Hello {props.match.params.username}!</h1>;
}

function App() {
  const [images, setImages] = useState([{ src: null}]);
  const [thumbs, setThumbs] = useState([])
  useEffect(() => {
    console.log(images)
      let thumbs = JSON.parse(window.localStorage.getItem('data'))
      setThumbs(thumbs)
  }, [images])

  const setSrc = (src) => {
    setImages([
      { src: src }
    ])
  }
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
              render={() => <Upload setSrc={setSrc}/>}
            />
            <Route
              exact
              path="/crop" 
              render={() => <Cropper src={images[0]["src"]} setSrc={setSrc} ></Cropper>}
            />
            <Route 
              exact
              path="/gridselector" 
              render={() => <GridSelector images={images} />}
            />
            <Route
                
                path="/gridselector/:id" 
                render={(props) => <Image {...props}/> }
            />

        </Switch>
        
      </Router>


    </div>
  );
}

export default App;

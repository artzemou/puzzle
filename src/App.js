import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import {useDropzone} from 'react-dropzone';
import Cropper from './Cropper.js';
var helper = {
  doc: (id) => document.getElementById(id) || document.createElement("div"),

  shuffle: (id) => {
      var ul = document.getElementById(id);
      for (var i = ul.children.length; i >= 0; i--) {
          ul.appendChild(ul.children[Math.random() * i | 0]);
          console.log(ul.children[i])
      }
  }
}

var imagePuzzle = {
  zoom: 0,
  startTime: new Date().getTime(),
  cut: function (images, gridSize) {
      console.log(images, gridSize)
      this.setImage(images, gridSize);
  },
  setImage: function (images, gridSize = 10) {
      var percentage = 100 / (gridSize - 1);
      var image = images[Math.floor(Math.random() * images.length)];
      helper.doc('actualImage').setAttribute('src', image.src);
      helper.doc('sortable').innerHTML = '';
      for (var i = 0; i < gridSize * gridSize; i++) {
          var xpos = (percentage * (i % gridSize)) + '%';
          var ypos = (percentage * Math.floor(i / gridSize)) + '%';

          let li = document.createElement('li');
          li.id = i;
          li.setAttribute('data-value', i);
          li.style.backgroundImage = 'url(' + image.src + ')';
          li.style.backgroundSize = (gridSize * 100) + '%';
          li.style.backgroundPosition = xpos + ' ' + ypos;
          li.style.width = 400 / gridSize + 'px';
          li.style.height = 400 / gridSize + 'px';
          li.style.boxShadow = 'inset 0px 0px 1px 1px rgba(0, 0, 0, .1)';
          
          li.ondblclick =(event) => {
              console.log(': )')
              this.zoom=1
              li.style.transformOrigin = 50;
              li.style.transform = 'scale('+ this.zoom +')';
          }
          li.onclick =(event) => {
              console.log(': )')
              this.zoom++
              li.style.transform = 'scale('+ this.zoom +')';

          }

          helper.doc('sortable').appendChild(li);
      }
  }
};



function App() {
  const [images, setImages] = useState([]);
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: files => {
        console.log(files)
        var formData = new FormData();
        console.log(files[0])
        formData.append('file', files[0]);

        fetch('http://localhost:3000/api/v2/medias/upload', {
          method: 'POST',
          body: formData
        })
        .then(res => res.json())
        .then(json => {
          console.log(json)
          setImages([
            { src: json.url.replace('/api/containers/public/download/', process.env.PUBLIC_URL), title: json.name},
      
          ])
        })
        .catch(err => console.error(err));
      }
  });

  useEffect(() => {
    setImages([
      { src: process.env.PUBLIC_URL +'/museum-national-d-histoire-naturelle.png', title: 'museum_logo'},

    ])
  }, [])

  useEffect(() => {
    if(images.length) imagePuzzle.cut(images)

  }, [images])

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))
  
  return (
    <div className="App">
      <section className="container">
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </section>
        <div id="Grid-selector">
          <div style={{display:"inline-block", margin:"auto", width:"95%", verticalAlign:"top"}}>
                  <section>
                      <hr/>
                      <ul id="sortable" className="sortable"></ul>
                      <hr/>
                  </section>
                  <div id="actualImageBox">
                      <img alt="" id="actualImage" />
                      <Cropper></Cropper>
                      <p id="levelPanel">
                          <input 
                            type="radio" 
                            name="level" 
                            value={3} 
                            onChange={(e) => imagePuzzle.cut(images, e.target.value)}
                          /> 
                          <label htmlFor="easy">3 x 3</label>
                          <input 
                            type="radio" 
                            name="level" 
                            value={5} 
                            onChange={(e) => imagePuzzle.cut(images, e.target.value)}
                          /> 
                          <label htmlFor="medium">4 x 4</label>
                          <input 
                            type="radio" 
                            name="level" 
                            value={10} 
                            onChange={(e) => imagePuzzle.cut(images, e.target.value)}
                          /> 
                          <label htmlFor="hard">10 x 10</label>
                      </p>

                  </div>
              </div>
          </div>
        </div>
  );
}

export default App;

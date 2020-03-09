import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";

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
  
const GridSelector = (props) => {
    const images = props.images
    const [thumbs, setThumbs] = useState([])
    const cut = useCallback((images, gridSize = 10) => {
            var data = []
            var percentage = 100 / (gridSize - 1);
            var image = images[Math.floor(Math.random() * images.length)];
            helper.doc('actualImage').setAttribute('src', image.src);
            // 4961 / 3508
            for (var i = 0; i < gridSize * gridSize; i++) {
                var xpos = (percentage * (i % gridSize)) + '%';
                var ypos = (percentage * Math.floor(i / gridSize)) + '%';
      
                console.log(helper.doc('sortable').offsetWidth)
                data = [
                    ...data,
                    {
                        id: i,
                        src: image.src,
                        backgroundImage: 'url(' + image.src + ')',
                        backgroundSize: (gridSize * 100) + '%',
                        backgroundPosition: xpos + ' ' + ypos,
                        width: helper.doc('sortable').offsetWidth / gridSize + 'px',
                        height: (helper.doc('sortable').offsetHeight / gridSize) + 'px'
                    }
                ]
      
                // helper.doc('sortable').appendChild(li);
            }
            setThumbs(data)
            window.localStorage.setItem('data', JSON.stringify(data))
        }, [])

    useEffect(() => {
      if(images.length) cut(images)
    }, [cut, images])

    return (
        <div id="Grid-selector">
        <div style={{display:"inline-block", margin:"auto", width:"100%", verticalAlign:"top"}}>
                <section>
                    <ul id="sortable" className="sortable">
                        {thumbs.map((thumb)=>(
                            <li key={thumb.id} style={{
                                backgroundImage: thumb.backgroundImage,
                                backgroundSize: thumb.backgroundSize,
                                backgroundPosition: thumb.backgroundPosition,
                                width: thumb.width,
                                height: thumb.height,
                                overflow: 'hidden',
                                boxShadow: 'inset 0 0 1px rgba(0, 0, 0, .5)'}}>
                                    <Link to={`/gridselector/${thumb.id}`}></Link>
                                </li>
                        ))}
                    </ul>
                </section>
                <div id="actualImageBox">
                    <img alt="" id="actualImage" src={images[0]["src"]}/>
                    <p id="levelPanel">
                        <input 
                          type="radio" 
                          name="level" 
                          value={3} 
                          onChange={(e) => cut(images, e.target.value)}
                        /> 
                        <label htmlFor="easy">3 x 3</label>
                        <input 
                          type="radio" 
                          name="level" 
                          value={5} 
                          onChange={(e) => cut(images, e.target.value)}
                        /> 
                        <label htmlFor="medium">4 x 4</label>
                        <input 
                          type="radio" 
                          name="level" 
                          value={10} 
                          onChange={(e) => cut(images, e.target.value)}
                        /> 
                        <label htmlFor="hard">10 x 10</label>
                    </p>
                </div>
            </div>                  
        </div>
    )
}

export default GridSelector
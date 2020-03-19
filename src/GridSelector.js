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
  
const GridSelector = ({images, thumbs, setThumbs}) => {
    const cut = useCallback((images, gridX= 10, gridY= 7) => {
            var data = []
            var percentage = 100 / (gridX - 1);
            var percentageY = 100 / (gridY - 1);
            console.log(percentageY)
            var image = images[Math.floor(Math.random() * images.length)];
            helper.doc('actualImage').setAttribute('src', image.src);
            // 4961 / 3508
            for (var i = 0; i < gridX * gridY; i++) {
                var xpos = (percentage * (i % gridX)) + '%';
                // var xpos = (percentage * Math.floor(i % gridX)) + '%';
                var ypos = (percentageY * Math.floor(i / gridX)) + '%';
                // var ypos = (percentageY * (i / gridY)) + '%';
      
                data = [
                    ...data,
                    {
                        id: i,
                        src: image.src,
                        backgroundImage: 'url(' + image.src + ')',
                        backgroundSize: (gridX * 100) + '%' + (gridY * 100) + '%',
                        backgroundPosition: xpos + ' ' + ypos,
                        width: helper.doc('sortable').offsetWidth / gridX + 'px',
                        backgroundRepeat:"no-repeat",
                        height: (helper.doc('sortable').offsetHeight / gridY) + 'px'
                        
                    }
                ]
      
                // helper.doc('sortable').appendChild(li);
            }
            setThumbs(data)
        }, [setThumbs])

    useEffect(() => {
      if(images.length) cut(images)
    }, [cut, images])

    console.log(thumbs)
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
                                boxShadow: 'inset 0 0 1px rgba(0, 0, 0, .5)',
                                backgroundRepeat:thumb.backgroundRepeat}}>
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
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import panzoom from "panzoom"


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
        var element = helper.doc('Grid-selector')
        panzoom(element, {
            onDoubleClick: function(e) {
              // `e` - is current double click event.
          
              return false; // tells the library to not preventDefault, and not stop propagation
            }
          })
      
    }, [cut, images])

    console.log(thumbs)
    return (
        <>
            <div id="Grid">
                <section id="Grid-selector">
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
                                    <Link 
                                        onClick={(e) => {
                                            e.preventDefault()
                                        }} 
                                        onDoubleClick={(e) => {
                                            console.log(`${thumb.id} is dblcClicked`)
                                        }} 
                                        to={`/gridselector/${thumb.id}`}></Link>
                            </li>
                        ))} 
                    </ul>
                </section>
            </div>
            <div id="actualImageBox">
                <button onClick={(e) => {
                    if(document.querySelector("#sortable li").style.boxShadow !== 'none') {
                        document.querySelectorAll("#sortable li").forEach(el => {
                            el.style.boxShadow ='none'
                        });
                    }
                    else {
                        document.querySelectorAll("#sortable li").forEach(el => {
                            el.style.boxShadow ='inset 0 0 1px rgba(0, 0, 0, .5)'
                        });
                    }
                }}>Disable grid</button> 


                 {/* <p id="levelPanel">
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
                </p> */}
            </div>
        </>                 
    )
}

export default GridSelector
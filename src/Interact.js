import interact from 'interactjs'
import React, { useEffect } from 'react';


const Resizable = (props) => {
    useEffect(() => {
        console.log('???')
        interact('.resizable')
            .resizable({
                edges: {
                top   : true,       // Use pointer coords to check for resize.
                left  : true,      // Disable resizing from left edge.
                bottom  : true,
                right: true      // Disable resizing from left edge.
                }
            })
            .on('resizemove', event => {
                let { x, y } = event.target.dataset
            
                x = parseFloat(x) || 0
                y = parseFloat(y) || 0
            
                Object.assign(event.target.style, {
                  width: `${event.rect.width}px`,
                  height: `${event.rect.height}px`,
                  transform: `translate(${event.deltaRect.left}px, ${event.deltaRect.top}px)`
                })
            
                Object.assign(event.target.dataset, { x, y })
              })
      })
    return (
        <div data-x={0} data-y={0}  className="resizable" style={{width:300, height:300}}>
            <img 
                style={{maxWidth:'100%'}}
                src={process.env.PUBLIC_URL +'/museum-national-d-histoire-naturelle.png'} 
                alt=""/>
        </div>

    )
}

export default Resizable
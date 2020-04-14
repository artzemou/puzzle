import React from 'react';
import { Link } from "react-router-dom";

const Image = ({match, thumbs, setThumbs}) => {
    const id = match.params.id
    console.log(thumbs)
    if (thumbs.length) {
        console.log(thumbs)
        return (
            <ul id="Thumbs-list">
                <li style={{
                    backgroundImage: thumbs[id].backgroundImage, 
                    backgroundSize: thumbs[id].backgroundSize,
                    backgroundPosition: thumbs[id].backgroundPosition,
                    width: 150,
                    height: 150,
                    overflow: 'hidden'}}>{id}
                    </li>
                    {thumbs.map(thumb => {
                        if (thumb.id !== thumbs[id].id) {
                            return (
                              <li key={thumb.id} style={{
                                backgroundImage: thumb.backgroundImage,
                                backgroundSize: thumb.backgroundSize,
                                backgroundPosition: thumb.backgroundPosition,
                                width: thumb.width,
                                height: thumb.height,
                                overflow: 'hidden'}}><Link to={`/gridselector/${thumb.id}`}></Link></li>                  
                            ) 
                        }
                    })}
                                        
            </ul>
                

        )

    }
    else return null

}

export default Image
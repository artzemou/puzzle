import React from 'react';
import { Link } from "react-router-dom";

const Image = ({match, thumbs, setThumbs}) => {
    const id = match.params.id
    if (thumbs.length) {
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
                    {thumbs.map((thumb) => {
                        if (thumb.id !== thumbs[id].id) {
                            return (
                              <li key={thumb.id} style={{
                                backgroundImage: thumb.backgroundImage,
                                backgroundSize: thumb.backgroundSize,
                                backgroundPosition: thumb.backgroundPosition,
                                width: thumb.width,
                                height: thumb.height,
                                overflow: 'hidden'}}><Link to={`/mOsaic/${thumb.id}`}></Link></li>                  
                            ) 
                        }
                        return null
                    })}
                                        
            </ul>
                

        )

    }
    else return null

}

export default Image
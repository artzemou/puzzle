import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';

const Image = (props) => {
    const [thumbs, setThumbs] = useState([])
    const id = props.match.params.id
    useEffect(() => {
        let data = JSON.parse(window.localStorage.getItem('data'))
        console.log(data)
        setThumbs(data)
    }, [])
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
                    {thumbs.map(thumb => {
                        console.log(thumb.id !== thumbs[id].id )
                        if (thumb.id !== thumbs[id].id) {
                            return (
                              <li key={thumb.id} style={{
                                backgroundImage: thumb.backgroundImage,
                                backgroundSize: thumb.backgroundSize,
                                backgroundPosition: thumb.backgroundPosition,
                                width: thumb.width,
                                height: thumb.height,
                                overflow: 'hidden'}}><a href={`/gridselector/${thumb.id}`}>{thumb.id}</a></li>                  
                            ) 
                        }
                    })}
                                        
            </ul>
                

        )

    }
    else return null

}

export default Image
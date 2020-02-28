// import React, { useState, useEffect } from 'react';

// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';

// export default function CropDemo({ src }) {
//     const [crop, setCrop] = useState({ aspect: 1 / 1 });
//     console.log(crop)
//     return (
//         <ReactCrop 
//             src={'/museum-national-d-histoire-naturelle.png'} 
//             crop={crop} onChange={newCrop => setCrop(newCrop)} />
//     )
//   }
import React, { Component } from 'react';
import DropNCrop from '@synapsestudios/react-drop-n-crop';

import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';

class SetStateExample extends Component {
  state = {
    result: null,
    filename: null,
    filetype: null,
    src: null,
    error: null,
  };

  onChange = value => {
    this.setState(value);
    console.log(value)
    fetch('http://localhost:3000/api/v2/medias/greet', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(value)
        })
        .then(res => res.json())
        .then(json => {
           console.log(json)
        })
        .catch(err => console.error(err));
  };

  render() {
    return (
        <>   
            <img src={this.state.result} alt="" width="200"/>
            <DropNCrop onChange={this.onChange} value={this.state} />
        </>
    )
  }
}

export default SetStateExample;
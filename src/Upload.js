import React, {useMemo} from 'react'
import {useDropzone} from 'react-dropzone';
import { useHistory } from "react-router-dom";

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 200,
  height: 200,
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#ffffff',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const Upload = ({setImages}) => {
    let history = useHistory();
  
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
      accept: 'image/*',
      onDrop: files => {
          setImages([{ src: URL.createObjectURL(files[0])}])
          history.push('/crop')
        }
    });
  
    const files = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ))

    const style = useMemo(() => ({
      ...baseStyle,
    }), []);


    return (
        <section className="container">
          <div {...getRootProps({className: 'dropzone', style})}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </section>
    )
  }
  
  export default Upload
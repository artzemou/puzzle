import React, { useState, useCallback, useEffect } from 'react'
import Cropper from 'react-easy-crop'
import { useHistory } from "react-router-dom";
import Slider from 'react-input-slider';
import Konva from 'konva';


// const createImage = url =>
//   new Promise((resolve, reject) => {
//     const image = new Image()
//     image.addEventListener('load', () => resolve(image))
//     image.addEventListener('error', error => reject(error))
//     image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
//     image.src = url
//   })

// function getRadianAngle(degreeValue) {
//   return (degreeValue * Math.PI) / 180
// }
// async function getCroppedImg(imageSrc, pixelCrop, rotation = 0, zoom=1) {
//   const image = await createImage(imageSrc)
//   const canvas = document.createElement('canvas')
//   const ctx = canvas.getContext('2d')

//   const maxSize = Math.max(image.width, image.height)
//   const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

//   // set each dimensions to double largest dimension to allow for a safe area for the
//   // image to rotate in without being clipped by canvas context
//   canvas.width = safeArea
//   canvas.height = safeArea

//   // add background to transparent .png files
//   ctx.fillStyle = 'rgb(255,255,255)';

//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   // translate canvas context to a central location on image to allow rotating around the center.
  
//   ctx.translate(safeArea / 2, safeArea / 2)
//   ctx.rotate(getRadianAngle(rotation))
//   if(zoom) {
//     ctx.scale(zoom, zoom)
//     // ctx.setTransform(zoom, 0, 0, zoom, ctx.canvas.width / 2, ctx.canvas.height / 2);
//     // ctx.drawImage(image, -image.width / 2, -image.height / 2);
//     // const data = ctx.getImageData(0, 0, safeArea, safeArea)

//     // // set canvas width to final desired crop size - this will clear existing context
//     // canvas.width = pixelCrop.width
//     // canvas.height = pixelCrop.height
  
//     // ctx.putImageData(
//     //   data,
//     //   0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
//     //   0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
//     // )
//     // return new Promise(resolve => {
//     //   canvas.toBlob(file => {
//     //     resolve(URL.createObjectURL(file))
//     //   }, 'image/jpeg')
//     // })
//   }

//   // ctx.scale(.8, .8)
//   ctx.translate(-safeArea / 2, -safeArea / 2)
  
//   // draw rotated image and store data.
//   ctx.drawImage(
//     image,
//     safeArea / 2 - image.width * 0.5,
//     safeArea / 2 - image.height * 0.5
    
//   )
//   const data = ctx.getImageData(0, 0, safeArea, safeArea)

//   // set canvas width to final desired crop size - this will clear existing context
//   canvas.width = pixelCrop.width
//   canvas.height = pixelCrop.height

//   ctx.putImageData(
//     data,
//     0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
//     0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
//   )

//   // As Base64 string
//   // return canvas.toDataURL('image/jpeg');

//   // As a blob
//   return new Promise(resolve => {
//     canvas.toBlob(file => {
//       resolve(URL.createObjectURL(file))
//     }, 'image/jpeg')
//   })
// }





const CropperGrid = (props) => {
  let history = useHistory();
  
  const [stage, setStage] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedImage, setCroppedImage] = useState(null)



  useEffect(() => {
      transformImg(props.src, zoom, rotation)
  }, [croppedImage, props.src, rotation, zoom])


  const transformImg = (src, zoom, rotation) => {
    var stageWidth = 500;
    var stageHeight = 500;
  
    var stage = new Konva.Stage({
      container: 'container',
      width: stageWidth,
      height: stageHeight
    });

    

    var layer = new Konva.Layer();
    stage.add(layer);


    
    Konva.Image.fromURL(src || "https://spgp-api-pre.65mo.fr/api/containers/spgp/download/06c80ebb-481c-46d2-956d-5871a540cbf7.png", img => {
      console.log(img)
      img.draggable(true)
      img.offsetX(img.width() / 2);
      img.offsetY(img.height() / 2);
      img.scale({x:zoom, y:zoom})
      // img.x(img.x() + img.width() / 2);
      // img.y(img.y() + img.height() / 2);
      img.x(stage.getWidth() / 2)
      img.y(stage.getHeight() / 2)
      img.rotate(rotation);
      layer.add(img);
      layer.batchDraw();
    });

    function fitStageIntoParentContainer() {
      var container = document.querySelector('#stage-parent');

      // now we need to fit stage into parent
      var containerWidth = container.offsetWidth;
      // to do this we need to scale the stage
      var scale = containerWidth / stageWidth;

      stage.width(stageWidth * scale);
      stage.height(stageHeight * scale);
      stage.scale({ x: scale, y: scale });
      stage.draw();
    }

    fitStageIntoParentContainer();
    // adapt the stage on any window resize
    window.addEventListener('resize', fitStageIntoParentContainer);
  
//     var axisX = new Konva.Line({
//       points: [-200, 0, 200, 0],
//       stroke: 'red',
//       strokeWidth: 2,
//       lineCap: 'round',
//       lineJoin: 'round'
//     });
  
// var axisY = new Konva.Line({
//       points: [0, 200, 0, -200],
//       stroke: 'red',
//       strokeWidth: 2,
//       lineCap: 'round',
//       lineJoin: 'round'
//     }); 
    var scaleBy = 2;

    stage.on('wheel', e => {
      e.evt.preventDefault();
        var oldScale = stage.scaleX();

        var mousePointTo = {
          x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
          y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
        };

        var newScale =
          e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
        stage.scale({ x: newScale, y: newScale });

        var newPos = {
          x:
            -(mousePointTo.x - stage.getPointerPosition().x / newScale) *
            newScale,
          y:
            -(mousePointTo.y - stage.getPointerPosition().y / newScale) *
            newScale
        };
        stage.position(newPos);
        stage.batchDraw();


    });

    var lastDist = 0;

    function getDistance(p1, p2) {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }
    
    stage.on('touchmove', function(e) {
      e.evt.preventDefault();
      var touch1 = e.evt.touches[0];
      var touch2 = e.evt.touches[1];

      if (touch1 && touch2) {
        var dist = getDistance(
          {
            x: touch1.clientX,
            y: touch1.clientY
          },
          {
            x: touch2.clientX,
            y: touch2.clientY
          }
        );

        if (!lastDist) {
          lastDist = dist;
        }

        var scale = (stage.scaleX() * dist) / lastDist;

        stage.scaleX(scale);
        stage.scaleY(scale);
        stage.batchDraw();
        lastDist = dist;
      }
    });

    stage.on('touchend', function() {
      lastDist = 0;
    });


    setStage(stage)
  }

  const exportImage = () => {
    var dataURL = stage.toDataURL({ pixelRatio: 3 });
    let img = document.createElement('img')
    img.setAttribute('crossOrigin', 'anonymous');
    img.width = 300

    img.src = dataURL
    document.getElementById('apercu').appendChild(img)
  }


  

  return (
    <div className="Cropper">
      {/* <img id="id" src={croppedImage} alt="" style={{position:'absolute', zIndex:1000, display:'none'}}/> */}
      <div className="crop-container">
      </div>
      <div id="container"></div>
      <div id="stage-parent">
        <div id="container"></div>
      </div>
      <div id="apercu"></div>
      <div className="Cropper-controls">
        <div
            className="Cropper-btn-crop"
            onClick={() => exportImage()}
            variant="contained"
            color="primary"
          >Recadrer</div>
       
        <div>
          <Slider
            xmin={.1}
            xmax={3}
            xstep={.1}
            axis="x"
            x={zoom}
            onChange={({ x }) => {
              setZoom(x)
            }}
          />
          <label htmlFor="volume">Zoom</label>
          <Slider
            xmin={0}
            xmax={360}
            xstep={.1}
            axis="x"
            x={rotation}
            onChange={({ x }) => {
              setRotation(x)
            }}
          />
          <label htmlFor="volume">Rotation</label>
        </div>

      </div>
    </div>
  )
}

export default CropperGrid
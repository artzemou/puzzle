import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Slider from 'react-input-slider';
import Konva from 'konva';

const CropperGrid = ({src, setImages}) => {
  let history = useHistory();
  
  const [stage, setStage] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
      transformImg(src, zoom, rotation)
  }, [src, rotation, zoom])

  const transformImg = (src, zoom, rotation) => {
    var stageWidth = 500 ;
    var stageHeight = 350;
  
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
  

    
    //zoom on scroll
    var scaleBy = 1.5;
    stage.on('wheel', e => {
      e.evt.preventDefault();
        var oldScale = stage.scaleX();

        var mousePointTo = {
          x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
          y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
        };

        var newScale =
          e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
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


    // zoom on dbltouch
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
    
    // zoom on dblClick
    stage.on('dblclick', function(e) {
      e.evt.preventDefault();
      var oldScale = stage.scaleX();
      var newScale = !e.evt.shiftKey ? oldScale * scaleBy : oldScale / scaleBy;

      var mousePointTo = {
          x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
          y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
      };
      stage.scale({ x: newScale, y: newScale });
      var newPos = {
        x:
          -(mousePointTo.x - stage.getPointerPosition().x / newScale) *
          newScale,
        y:
          -(mousePointTo.y - stage.getPointerPosition().y / newScale) *
          newScale
      };

      console.log(newScale, e.evt.shiftKey )
      stage.position(newPos);
      layer.batchDraw();
    });


    setStage(stage)
  }

  const exportImage = () => {
    var dataURL = stage.toDataURL();
    let img = document.createElement('img')
    img.setAttribute('crossOrigin', 'anonymous');
    img.width = 500

    img.src = dataURL
    document.getElementById('apercu').appendChild(img)
    setImages([{src: dataURL}])
    history.push('/gridselector')
  }

  return (
    <div className="Cropper">
      <div className="crop-container">
      </div>
      <div id="container"></div>
      <div id="stage-parent">
        <div id="container"></div>
        <div id="apercu"></div>
      </div>
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
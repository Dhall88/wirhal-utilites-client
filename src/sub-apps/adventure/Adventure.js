import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import SimplexNoise from 'simplex-noise'

let simplex = new SimplexNoise(4);

export default class Adventure extends Component {

  componentDidMount() {
    this.generateMesh(this.generateTexture())
  }

map = (val, smin, smax, emin, emax) => {
    const t =  (val-smin)/(smax-smin)
    return (emax-emin)*t + emin
}

noise = (nx, ny) => {
    // Re-map from -1.0:+1.0 to 0.0:1.0
    return this.map(simplex.noise2D(nx,ny),-1,1,0,1)
}

//stack some noisefields together
octave = (nx,ny,octaves) => {
    let val = 0;
    let freq = 1;
    let max = 0;
    let amp = 1;
    for(let i=0; i<octaves; i++) {
        val += this.noise(nx*freq,ny*freq)*amp;
        max += amp;
        amp /= 2;
        freq  *= 2;
    }
    return val/max;
}

//generate grayscale image of noise
generateTexture = () => {
    const canvas = this.refs.canvas;
    const c = canvas.getContext('2d');
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width, canvas.height)

    for(let i=0; i<canvas.width; i++) {
        for(let j=0; j<canvas.height; j++) {
            let v =  this.octave(i/canvas.width,j/canvas.height,16)
            const per = (100*v).toFixed(2)+'%'
            c.fillStyle = `rgb(${per},${per},${per})`
            c.fillRect(i,j,1,1)
        }
    }
    return c.getImageData(0,0,canvas.width,canvas.height)
}

generateMesh = (data) => {
  const geo = new THREE.PlaneGeometry(data.width,data.height,
                                    data.width,data.height+1)
//assign vert data from the canvas
for(let j=0; j<data.height; j++) {
    for (let i = 0; i < data.width; i++) {
        const n =  (j*(data.height)  +i)
        const nn = (j*(data.height+1)+i)
        const col = data.data[n*4] // the red channel
        const v1 = geo.vertices[nn]
        v1.z = this.map(col,0,255,-10,10) //map from 0:255 to -10:10
        if(v1.z > 2.5) v1.z *= 1.3 //exaggerate the peaks
        // v1.x += map(Math.random(),0,1,-0.5,0.5) //jitter x
        // v1.y += map(Math.random(),0,1,-0.5,0.5) //jitter y
    }
}
}

  render() {
    return (
      <canvas ref="canvas" width={window.innerWidth} height={window.innerHeight} />
    )
  }
}



// // === THREE.JS CODE START ===
// var canvas = this.refs.canvas;
// const ctx = canvas.getContext("2d")
// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// ctx.drawImage(renderer.domElement,0,0);
// this.refs.canvas.appendChild( renderer.domElement );
// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
// camera.position.z = 5;
// var animate = function () {
//   requestAnimationFrame( animate );
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render( scene, camera );
// };
// animate();
// // === THREE.JS EXAMPLE CODE END ===

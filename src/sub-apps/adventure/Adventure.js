import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import SimplexNoise from 'simplex-noise';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
// const THREE = require('three')
// const OrbitControls = require('three-orbitcontrols')

// const OrbitControls = require('three-orbit-controls')(THREE);

let simplex = new SimplexNoise(4);

export default class Adventure extends Component {
  state={
    input:''
  }
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value})
  }

  componentDidMount() {

    const data = this.generateTexture()

    const geo = new THREE.PlaneGeometry(data.width,data.height,
      data.width,data.height+1)
      //assign vert data from the canvas
      for(let j=0; j<data.height; j++) {
        for (let i = 0; i < data.width; i++) {
          const n =  (j*(data.height)  +i)
          const nn = (j*(data.height+1)+i)
          const col = data.data[n*4] // the red channel
          const v1 = geo.vertices[nn]
          // console.log('in mesh');
          v1.z = this.map(col,0,255,-10,10) //map from 0:255 to -10:10
          if(v1.z > 2.5) v1.z *= 1.3 //exaggerate the peaks
          // v1.x += map(Math.random(),0,1,-0.5,0.5) //jitter x
          // v1.y += map(Math.random(),0,1,-0.5,0.5) //jitter y
        }
      }

      //for every face
      geo.faces.forEach(f=>{
        //get three verts for the face
        const a = geo.vertices[f.a]
        const b = geo.vertices[f.b]
        const c = geo.vertices[f.c]

        //if average is below water, set to 0
        //alt: color transparent to show the underwater landscape
        const avgz = (a.z+b.z+c.z)/3
        if(avgz < 0) {
          a.z = 0
          b.z = 0
          c.z = 0
        }


        //assign colors based on the highest point of the face
        const max = Math.max(a.z,Math.max(b.z,c.z))
        if(max <=0)   return f.color.set(0x44ccff)
        if(max <=1.5) return f.color.set(0x228800)
        if(max <=3.5)   return f.color.set(0xeecc44)
        if(max <=5)   return f.color.set(0xcccccc)

        //otherwise, return white
        f.color.set('white')
      })

      geo.colorsNeedUpdate = true
      geo.verticesNeedUpdate = true
      //required for flat shading
      geo.computeFlatVertexNormals()
      const mesh = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({
        // wireframe:true,
        vertexColors: THREE.VertexColors,
        //required for flat shading
        flatShading:true,
      }))
      // mesh.position.y = -0
      // mesh.position.z = -20
      //tilt slightly so we can see it better
      mesh.rotation.x = -90*(Math.PI/180)

      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, 600 / 600, 0.1, 1000 );

      // camera.position.z=-10;
      camera.position.y=5

      var renderer = new THREE.WebGLRenderer();
      renderer.setSize( 600, 600 );
      scene.add(mesh)
      var light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 10, 10, 10 );
scene.add( light );
      this.refs.div.appendChild( renderer.domElement );

      /////////////////////////////////


      // var controls = new OrbitControls( camera, renderer.domElement );

      //controls.update() must be called after any manual changes to the camera's transform
      // camera.position.set( 0, 0,1 );
      // controls.target.set(0,2,0)
      // controls.update();


      var animate = function () {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
        // console.log('in animate');
        // camera.position.x+=0.01
        // camera.position.y+=0.01
        // controls.update();
        camera.position.y+=.01
        camera.rotation.y+=.01
        // console.log(camera.position.z);
        // console.log(camera.position.x);
        // console.log(geo.vertices);
        // console.log(geo.vertices[camera.position.z]);
      }

      animate();
    }




map = (val, smin, smax, emin, emax) => {
    const t =  (val-smin)/(smax-smin)
    return (emax-emin)*t + emin
}

noise = (nx, ny) => {
    // Re-map from -1.0:+1.0 to 0.0:1.0
    return this.map(simplex.noise2D(nx,ny),-1,1,0,1)
}

// stack some noisefields together
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

// generate grayscale image of noise
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
    // console.log(c.getImageData(0,0,canvas.width,canvas.height).width);
    return c.getImageData(0,0,canvas.width,canvas.height)
}

  keyPressed =(event) => {
    console.log(event.charCode);
  }


  render() {
    return (
      <div >
      <canvas ref="canvas" width={100} height={100}/>
      <div ref="div"/>
      <input onChange={this.handleChange}
       onKeyPress={this.keyPressed}
       value={this.state.input} />
      </div>
    )
  }
}

// <input type="text" onKeyPress={this.keyDown} />

//     var scene = new THREE.Scene();
//     var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
// camera.position.z = 5;
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// this.refs.canvas.appendChild(renderer.domElement);
//     var geometry = new THREE.PlaneBufferGeometry( 2000, 2000, 256, 256 );
//     // var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
// // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// var terrain = new THREE.Mesh( geometry, material );
// terrain.rotation.x = -Math.PI / 2;
// scene.add( terrain );
//
// var render = function () {
//   requestAnimationFrame( render );
//
//   // terrain.rotation.x += 0.01;
//   // terrain.rotation.y += 0.01;
//   camera.position.y+=0.01;
//   console.log('in render');
//
//   renderer.render(scene, camera);
// }
//
// render();








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

import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'


@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css']
})
export class CubeComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas')
  private canvasRef: ElementRef | undefined;

  rotationSpeedX: number = 0.001;
  rotationSpeedY: number = 0.005;
  size: number = 200;
  texture: string = ""

  cameraZ: number = 400;
  fieldOfView: number = 1;
  nearClippingPlane: number = 1;
  farClippingPlane: number = 1000;

  constructor() { }

  ngAfterViewInit(): void {
    this.createScene();
    this.startRenderingLoop();
  }

  ngOnInit(): void {
    
  }

  private get canvas(): HTMLCanvasElement{
    return this.canvasRef?.nativeElement;
  }
  camera!: THREE.PerspectiveCamera;
  // loader = new THREE.TextureLoader();
  geometry = new THREE.IcosahedronBufferGeometry(1.5, 0);
  // material = new THREE.MeshBasicMaterial({map: this.loader.load(this.texture)});
  material = new THREE.MeshNormalMaterial();
  cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);
  renderer!: THREE.WebGL1Renderer;
  scene!: THREE.Scene;

  // controls = new OrbitControls( this.camera, this.renderer.domElement );
  controls!: OrbitControls;
  // controls = new OrbitControls(this.camera, this.renderer.domElement);

  loader = new GLTFLoader();
  loader2 = new FBXLoader();
  loadedModel: any;
  light1 = new THREE.DirectionalLight(0xffffff, 0.8);
  light2 = new THREE.DirectionalLight(0xffffff, 0.8);
  light3 = new THREE.DirectionalLight(0xffffff, 0.8);
  light4 = new THREE.DirectionalLight('#2A246F', 0.8);
  light5 = new THREE.DirectionalLight(0xffffff, 0.8);
  light6 = new THREE.DirectionalLight(0xffffff, 0.8);

  spotlight1 = new THREE.SpotLight( 0xffffff );
  spotlight2 = new THREE.SpotLight( 0xffffff );
  spotlight3 = new THREE.SpotLight( 0xffffff );
  spotlight4 = new THREE.SpotLight( 0xffffff );
  spotlight5 = new THREE.SpotLight( 0xffffff , 0.1);
  spotlight6 = new THREE.SpotLight( 0xffffff , 0.1);
  // spotlight4 = new THREE.SpotLight( 0xffffff );
  // spotlight4 = new THREE.SpotLight( 0xffffff );


  lightHelper1 = new THREE.DirectionalLightHelper( this.light1, 5 );
  lightHelper2 = new THREE.DirectionalLightHelper( this.light2, 5 );
  lightHelper3 = new THREE.DirectionalLightHelper( this.light3, 5 );
  lightHelper4 = new THREE.DirectionalLightHelper( this.light4, 5 );
  lightHelper5 = new THREE.DirectionalLightHelper( this.light5, 5 );
  lightHelper6 = new THREE.DirectionalLightHelper( this.light6, 5 );

  spotlightHelper1 = new THREE.SpotLightHelper( this.spotlight1, 10 );
  spotlightHelper2 = new THREE.SpotLightHelper( this.spotlight2, 10 );

  hemisphereLight1 = new THREE.HemisphereLight( '#2A246F', '#2A246F', 1 );
  hemisphereLight2 = new THREE.HemisphereLight( '#2A246F', '#2A246F', 1 );


  gridHelper = new THREE.GridHelper( 50, 30, "#707070", "#707070" );



  animateCube() {
    // this.cube.rotation.x += this.rotationSpeedX;
    // this.cube.rotation.y += this.rotationSpeedY;

    console.log('hi');
    // this.loadedModel.rotation.x += this.rotationSpeedX;
    this.loadedModel.rotation.y += this.rotationSpeedY;

    this.spotlight1.rotation.y += this.rotationSpeedY;
    this.spotlight2.rotation.y += this.rotationSpeedY;
    this.spotlight3.rotation.y += this.rotationSpeedY;
    this.spotlight4.rotation.y += this.rotationSpeedY;
    this.spotlight5.rotation.y += this.rotationSpeedY;
    this.spotlight6.rotation.y += this.rotationSpeedY;

  }

  animateCube2() {
    // this.cube.rotation.x += this.rotationSpeedX;
    // this.cube.rotation.y += this.rotationSpeedY;

    console.log('00');
    // this.loadedModel.rotation.x += this.rotationSpeedX;
    this.loadedModel.rotation.y += this.rotationSpeedY*1.5;

    this.spotlight1.rotation.y += this.rotationSpeedY;
    this.spotlight2.rotation.y += this.rotationSpeedY;
    this.spotlight3.rotation.y += this.rotationSpeedY;
    this.spotlight4.rotation.y += this.rotationSpeedY;
    this.spotlight5.rotation.y += this.rotationSpeedY;
    this.spotlight6.rotation.y += this.rotationSpeedY;

  }

  // koi bhi shape, light, helper should be added here
  createScene() {
    //* Scene
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color('grey')
    // this.scene.background = new THREE.Color('#363333')
    // this.scene.background = new THREE.Color('#2A246F')
    this.scene.background = new THREE.Color('#d4d6d9')
    // this.scene.add(this.cube);
    // Light
    this.light1.position.set(5,0,0);
    this.light2.position.set(-5,0,0);
    this.light3.position.set(0,5,0);
    this.light4.position.set(0,-5,0);
    this.light5.position.set(0,0,5);
    this.light6.position.set(0,0,-5);
    // this.scene.add(this.light1);
    // this.scene.add(this.light2);
    // this.scene.add(this.light3);
    // this.scene.add(this.light4);
    // this.scene.add(this.light5);
    // this.scene.add(this.light6);

    this.spotlight1.position.set( 200, 600, 200 );
    this.spotlight1.castShadow = true;
    this.spotlight1.shadow.mapSize.width = 1024;
    this.spotlight1.shadow.mapSize.height = 1024;
    this.spotlight1.shadow.camera.near = 500;
    this.spotlight1.shadow.camera.far = 4000;
    this.spotlight1.shadow.camera.fov = 30;
    this.scene.add(this.spotlight1);
    // this.scene.add(this.spotlightHelper1);


    this.spotlight2.position.set( -200, 600, 200 );
    this.spotlight2.castShadow = true;
    this.spotlight2.shadow.mapSize.width = 1024;
    this.spotlight2.shadow.mapSize.height = 1024;
    this.spotlight2.shadow.camera.near = 500;
    this.spotlight2.shadow.camera.far = 4000;
    this.spotlight2.shadow.camera.fov = 30;
    this.scene.add(this.spotlight2);
    // this.scene.add(this.spotlightHelper2);

    this.spotlight3.position.set( 200, -400, -200 );
    this.spotlight3.castShadow = true;
    this.spotlight3.shadow.mapSize.width = 1024;
    this.spotlight3.shadow.mapSize.height = 1024;
    this.spotlight3.shadow.camera.near = 500;
    this.spotlight3.shadow.camera.far = 4000;
    this.spotlight3.shadow.camera.fov = 30;
    this.scene.add(this.spotlight3);
    // this.scene.add(this.spotlightHelper2);

    this.spotlight4.position.set( -200, -400, -200 );
    this.spotlight4.castShadow = true;
    this.spotlight4.shadow.mapSize.width = 1024;
    this.spotlight4.shadow.mapSize.height = 1024;
    this.spotlight4.shadow.camera.near = 500;
    this.spotlight4.shadow.camera.far = 4000;
    this.spotlight4.shadow.camera.fov = 30;
    this.scene.add(this.spotlight4);
    // this.scene.add(this.spotlightHelper2);

    this.spotlight5.position.set( 0, -400, 400 );
    this.spotlight5.castShadow = true;
    this.spotlight5.shadow.mapSize.width = 1024;
    this.spotlight5.shadow.mapSize.height = 1024;
    this.spotlight5.shadow.camera.near = 500;
    this.spotlight5.shadow.camera.far = 4000;
    this.spotlight5.shadow.camera.fov = 30;
    this.scene.add(this.spotlight5);
    // this.scene.add(this.spotlightHelper2);

    this.spotlight6.position.set( 0, 400, 400 );
    this.spotlight6.castShadow = true;
    this.spotlight6.shadow.mapSize.width = 1024;
    this.spotlight6.shadow.mapSize.height = 1024;
    this.spotlight6.shadow.camera.near = 500;
    this.spotlight6.shadow.camera.far = 4000;
    this.spotlight6.shadow.camera.fov = 30;
    this.scene.add(this.spotlight6);
    // this.scene.add(this.spotlightHelper2);

    // this.scene.add(this.hemisphereLight1);
    // this.scene.add(this.hemisphereLight2);

    
    this.gridHelper.position.y = -2;
    // this.scene.add(this.gridHelper);

    // this.scene.add(this.ambientLight);
    // this.scene.add(this.lightHelper1)
    // this.scene.add(this.lightHelper2)
    // this.scene.add(this.lightHelper3)
    // this.scene.add(this.lightHelper4)
    // this.scene.add(this.lightHelper5)
    // this.scene.add(this.lightHelper6)
    //*Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    )
    this.camera.position.z = this.cameraZ;
    this.camera.position.y = 50;

    this.loader.load('../../assets/chair 2.2.glb', (gltf)=>{

      gltf.scene.scale.set(4, 4, 4);
      gltf.scene.rotation.y = Math.PI/12;
      gltf.scene.position.y = -2;
      // gltf.scene.rotation.x = Math.PI/18;
      this.loadedModel = gltf.scene;
      this.scene.add(gltf.scene);
      
      console.log("hi",gltf);
    }, (xhr)=>{
      console.log(xhr.loaded/xhr.total*100) + "% loaded";
    },(err)=>{
      console.log("Error!", err);
    })

    // this.loader2.load('../../assets/chair 2.fbx', 
    //   (object) => {
    //     // object.traverse(function (child) {
    //     //     if ((child as THREE.Mesh).isMesh) {
    //     //         (child as THREE.Mesh).material = new THREE.MeshNormalMaterial();
    //     //         if ((child as THREE.Mesh).material) {
    //     //             ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
    //     //         }
    //     //     }
    //     // })
    //     object.scale.set(.005, .005, .005);
    //     object.position.y = -2;
    //     this.loadedModel = object;
    //     this.scene.add(object)
    //   },
    //   (xhr) => {
    //       console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    //     },
    //   (error) => {
    //       console.log(error)
    //     }
    //   )
  }

  getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGL1Renderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.renderer.render(this.scene, this.camera)

    let component: CubeComponent = this;

    var startTime = new Date().getTime();
    let interval = setInterval(function render() {

      if(new Date().getTime() - startTime > 1200){
        clearInterval(interval);
        return;
      }

      requestAnimationFrame(render);
      component.animateCube2();
      // component.controls.update();
      component.renderer.render(component.scene, component.camera);

    }, 100);
    // // cancel interval after 1 second (1000 ms)
    // setTimeout(() => clearInterval(interval), 3000)

    // let component: CubeComponent = this;
    setTimeout(function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.controls.update();
      component.renderer.render(component.scene, component.camera);

      // setTimeout(component.animateCube, 2000);
    }, 1000);
  }

}

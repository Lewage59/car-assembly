<template>
    <div class="car-model">
        <div id="info">
            <span class="colorPicker"><input id="body-color" type="color" value="#ff0000"><br>车身</span>
            <span class="colorPicker"><input id="details-color" type="color" value="#ffffff"><br>内饰</span>
            <span class="colorPicker"><input id="glass-color" type="color" value="#ffffff"><br>玻璃</span>
        </div>
        <div ref="container" />
    </div>
</template>

<script>
/* eslint-disable */
import * as THREE from 'three'
import Stats from 'stats-js'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'

const wheels = [];
let scene;
let camera;
let renderer;
let grid;

export default {
    name: 'Dashboard',
    data() {
        return {
            controls: null
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            const container = this.$refs.container;
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setAnimationLoop(this.render);
            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 0.85;
            renderer.domElement.style.width = '940px';
            renderer.domElement.style.height = '530px';
            container.appendChild(renderer.domElement);

            window.addEventListener('resize', this.onWindowResize);

            this.stats = new Stats();
            this.stats.dom.style.position = 'absolute'
            container.appendChild(this.stats.dom);

            //

            camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
            camera.position.set( 4.25, 1.4, - 4.5 );

            const controls = new OrbitControls(camera, container);
            controls.target.set(0, 0.5, 0);
            controls.update();

            const environment = new RoomEnvironment();
            const pmremGenerator = new THREE.PMREMGenerator(renderer);

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xeeeeee);
            scene.environment = pmremGenerator.fromScene(environment).texture;
            scene.fog = new THREE.Fog(0xeeeeee, 10, 50);

            grid = new THREE.GridHelper(100, 40, 0x000000, 0x000000);
            grid.material.opacity = 0.1;
            grid.material.depthWrite = false;
            grid.material.transparent = true;
            scene.add( grid );

            // materials

            const bodyMaterial = new THREE.MeshPhysicalMaterial({
                color: 0xff0000, metalness: 0.6, roughness: 0.4, clearcoat: 0.05, clearcoatRoughness: 0.05
            });

            const detailsMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff, metalness: 1.0, roughness: 0.5
            });

            const glassMaterial = new THREE.MeshPhysicalMaterial({
                color: 0xffffff, metalness: 0, roughness: 0.1, transmission: 0.9, transparent: true
            });

            const bodyColorInput = document.getElementById('body-color');
            bodyColorInput.addEventListener('input', function() {

                bodyMaterial.color.set(this.value);

            });

            const detailsColorInput = document.getElementById('details-color');
            detailsColorInput.addEventListener('input', function() {

                detailsMaterial.color.set( this.value );

            });

            const glassColorInput = document.getElementById( 'glass-color' );
            glassColorInput.addEventListener( 'input', function () {

                glassMaterial.color.set( this.value );

            } );

            // Car

            const shadow = new THREE.TextureLoader().load('/models/ferrari_ao.png');
            const dracoLoader = new DRACOLoader();
            
            dracoLoader.setDecoderPath( '/models/gltf/' );

            const loader = new GLTFLoader();
            loader.setDRACOLoader( dracoLoader );

            loader.setPath("/models/").load('ferrari.glb', function ( gltf ) {
                console.log(gltf);

                const carModel = gltf.scene.children[ 0 ];

                carModel.traverse((obj)=> {
                    let parent = obj.parent.name;
                    if (parent !== 'wheel_rl' && 
                        parent !== 'wheel_rr' &&
                        parent !== 'wheel_fl' && 
                        parent !== 'wheel_fr') {
                        console.log(obj.parent.name, obj.name);
                    }
                });
                // 车灯模型
                carModel.getObjectByName('plastic_gray').visible = false;
                carModel.getObjectByName('lights').visible = false;
                carModel.getObjectByName('metal').visible = false;
                carModel.getObjectByName('lights_red').visible = false;
                carModel.getObjectByName('grills').visible = false;
                carModel.getObjectByName('glass').visible = false;
                carModel.getObjectByName('leather').visible = false;

                carModel.getObjectByName('carbon_fibre').visible = false;
                carModel.getObjectByName('carbon_fibre_trim').visible = false;
                carModel.getObjectByName('brakes').visible = false;
                carModel.getObjectByName('carpet').visible = false;
                carModel.getObjectByName('wipers').visible = false;

                // 车身模型
                carModel.getObjectByName('body').visible = false;
                
                // 轮胎模型
                carModel.getObjectByName('steering_wheel').visible = false;
                carModel.getObjectByName('wheel_rl').visible = false;
                carModel.getObjectByName('wheel_rr').visible = false;
                carModel.getObjectByName('wheel_fl').visible = false;
                carModel.getObjectByName('wheel_fr').visible = false;

                // 设置车身材质
                carModel.getObjectByName( 'body' ).material = bodyMaterial;

                // 设置轮胎材质
                carModel.getObjectByName( 'rim_fl' ).material = detailsMaterial;
                carModel.getObjectByName( 'rim_fr' ).material = detailsMaterial;
                carModel.getObjectByName( 'rim_rr' ).material = detailsMaterial;
                carModel.getObjectByName( 'rim_rl' ).material = detailsMaterial;
                carModel.getObjectByName( 'trim' ).material = detailsMaterial;

                // 设置挡风玻璃材质
                carModel.getObjectByName( 'glass' ).material = glassMaterial;

                wheels.push(
                    carModel.getObjectByName( 'wheel_fl' ),
                    carModel.getObjectByName( 'wheel_fr' ),
                    carModel.getObjectByName( 'wheel_rl' ),
                    carModel.getObjectByName( 'wheel_rr' )
                );

                // shadow
                const mesh = new THREE.Mesh(
                new THREE.PlaneGeometry( 0.655 * 4, 1.3 * 4 ),
                new THREE.MeshBasicMaterial( {
                    map: shadow, blending: THREE.MultiplyBlending, toneMapped: false, transparent: true
                })
                );
                mesh.rotation.x = - Math.PI / 2;
                mesh.renderOrder = 2;
                carModel.add( mesh );

                scene.add( carModel );

            });
        },
        
        onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        },
        render() {

            const time = - performance.now() / 1000;

            for ( let i = 0; i < wheels.length; i ++ ) {

                wheels[ i ].rotation.x = time * Math.PI;

            }

            grid.position.z = - ( time ) % 5;

            renderer.render( scene, camera );

            this.stats.update();

        }
    }
};
</script>

<style lang="less" scoped>
.car-model {
    #container {
        position: relative;
    }
}
body {
  color: #444;
  background: #eee;
}
a {
  color: #08f;
}
.colorPicker {
  display: inline-block;
  margin: 0 10px
}
</style>
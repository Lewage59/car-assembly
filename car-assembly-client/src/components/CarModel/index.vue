<template>
    <div class="car-model">
        <div class="utils-container">
            <div class="colorPicker">
                <span class="label">车身</span>
                <input id="body-color" type="color" value="#ff0000">
            </div>
            <div class="colorPicker">
                <span class="label">内饰</span>
                <input id="details-color" type="color" value="#ffffff">
            </div>
            <div class="colorPicker">
                <span class="label">玻璃</span>
                <input id="glass-color" type="color" value="#ffffff">
            </div>
        </div>
        <div ref="container" id="container" />
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
let bodyMaterial;
let detailsMaterial;
let glassMaterial;

export default {
    name: 'Dashboard',
    props: {
        modelStatus: {
            type: Object,
            default: ()=>{}
        }
    },
    data() {
        return {
            controls: null,
            carColor: {
                body: '#ff0000',
                detail: '#ffffff',
                glass: '#ffffff'
            }
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            const that = this;
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

            // 性能监测
            this.stats = new Stats();
            this.stats.dom.style.position = 'absolute'
            container.appendChild(this.stats.dom);

            // 相机
            camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
            camera.position.set( 4.25, 1.4, - 4.5 );

            // 控制器
            const controls = new OrbitControls(camera, container);
            controls.target.set(0, 0.5, 0);
            controls.update();

            const environment = new RoomEnvironment();
            const pmremGenerator = new THREE.PMREMGenerator(renderer);

            // 场景
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

            bodyMaterial = new THREE.MeshPhysicalMaterial({
                color: 0xff0000, metalness: 0.6, roughness: 0.4, clearcoat: 0.05, clearcoatRoughness: 0.05
            });

            detailsMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff, metalness: 1.0, roughness: 0.5
            });

            glassMaterial = new THREE.MeshPhysicalMaterial({
                color: 0xffffff, metalness: 0, roughness: 0.1, transmission: 0.9, transparent: true
            });

            const bodyColorInput = document.getElementById('body-color');
            bodyColorInput.addEventListener('input', function() {
                that.carColor.body = this.value;
                bodyMaterial.color.set(this.value);
            });

            const detailsColorInput = document.getElementById('details-color');
            detailsColorInput.addEventListener('input', function() {
                that.carColor.details = this.value;
                detailsMaterial.color.set( this.value );
            });

            const glassColorInput = document.getElementById( 'glass-color' );
            glassColorInput.addEventListener( 'input', function () {
                that.carColor.glass = this.value;
                glassMaterial.color.set( this.value );
            } );

            this.loaderCar()
        },
        loaderCar() {
            const shadow = new THREE.TextureLoader().load('/models/ferrari_ao.png');
            const dracoLoader = new DRACOLoader();
            
            dracoLoader.setDecoderPath( '/models/gltf/' );

            const loader = new GLTFLoader();
            loader.setDRACOLoader( dracoLoader );

            loader.setPath("/models/").load('ferrari.glb', function ( gltf ) {
                const carModel = gltf.scene.children[0];
                
                // 默认隐藏车型
                carModel.getObjectByName('main').visible = false;
                carModel.getObjectByName('steering_wheel').visible = false
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
                    new THREE.MeshBasicMaterial({
                        map: shadow, blending: THREE.MultiplyBlending, toneMapped: false, transparent: true
                    })
                );

                mesh.rotation.x = - Math.PI / 2;
                mesh.renderOrder = 2;

                carModel.add( mesh );
                scene.add( carModel );

            });
        },
        changeCarModel() {
            const carModel = scene.getObjectByName('RootNode');
            // 根模型（基本参数）
            carModel.getObjectByName('main').visible = this.modelStatus.basicParam;
            // 中底底盘
            carModel.getObjectByName('carpet').visible = this.modelStatus.basicParam;
            
            // 车内架（底盘转向）
            carModel.getObjectByName('interior_light').visible = this.modelStatus.chassis;

            // 后尾底盘（变速箱）
            carModel.getObjectByName('metal').visible = this.modelStatus.gearbox;
            
            // 内饰模型（内置配置）
            carModel.getObjectByName('leather').visible = this.modelStatus.inconfig;
            // 玻璃模型
            carModel.getObjectByName( 'glass' ).visible = this.modelStatus.inconfig;
            // 雨刮器
            carModel.getObjectByName('wipers').visible = this.modelStatus.inconfig;
            // 方向盘
            carModel.getObjectByName('steering_wheel').visible = this.modelStatus.inconfig;

            // 车外架（安全装备）
            carModel.getObjectByName('interior_dark').visible = this.modelStatus.safety;
            carModel.getObjectByName('chrome').visible = this.modelStatus.safety;
            // 内饰模型
            carModel.getObjectByName('carbon_fibre').visible = this.modelStatus.safety;
            carModel.getObjectByName('carbon_fibre_trim').visible = this.modelStatus.safety;

            // 车身模型（发动机）
            carModel.getObjectByName('body').visible = this.modelStatus.engine;
            // 车标
            carModel.getObjectByName('yellow_trim').visible = this.modelStatus.engine;
            carModel.getObjectByName('blue').visible = this.modelStatus.engine;
            // 车灯
            carModel.getObjectByName('brakes').visible = this.modelStatus.engine;
            carModel.getObjectByName('plastic_gray').visible = this.modelStatus.engine;
            carModel.getObjectByName('lights').visible = this.modelStatus.engine;
            carModel.getObjectByName('lights_red').visible = this.modelStatus.engine;
            carModel.getObjectByName('leds').visible = this.modelStatus.engine;
            // 车尾模型
            carModel.getObjectByName('grills').visible = this.modelStatus.engine;
            
            // 轮胎模型（车轮/制动）
            carModel.getObjectByName('wheel_rl').visible = this.modelStatus.wheel;
            carModel.getObjectByName('wheel_rr').visible = this.modelStatus.wheel;
            carModel.getObjectByName('wheel_fl').visible = this.modelStatus.wheel;
            carModel.getObjectByName('wheel_fr').visible = this.modelStatus.wheel;
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
.utils-container {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}
.colorPicker {
    display: inline-flex;
    align-items: center;
    margin: 0 10px;
    border: 1px solid #409EFF;
    border-radius: 2px;
    .label {
        height: 34px;
        line-height: 34px;
        padding: 0 15px;
        background-color: #409EFF;
        font-size: 14px;
        color: #fff;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
    }
    input {
        border: none;
        background: #fff;
    }
}
</style>
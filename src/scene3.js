import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function createScene3() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFBFF7B);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('scene3').appendChild(renderer.domElement);
    camera.position.set(1, -5, 3)
    camera.lookAt(0, 0, 0);


    // add light
    const ambientLight = new THREE.AmbientLight(0x404040, 5);
    scene.add(ambientLight);

    // add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(0, 2, 1);
    scene.add(directionalLight);


    // Handle window resize events
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const loader = new GLTFLoader();

    const file_name = 'models/model_03.gltf';

    let skull; // Define skull here

    loader.load(file_name, function (gltf) {
        gltf.scene.name = "skull";
        scene.add(gltf.scene);
        skull = scene.getObjectByName("skull");
    }, undefined, function (error) {
        console.error(error);
    });

    return function animate() {
        requestAnimationFrame(animate);
        if (skull) { // Check if skull is defined
            // skull.rotation.x += 0.01;
            skull.rotation.z += 0.01;
        }
        renderer.render(scene, camera);
    };
}

import * as THREE from 'three';
import { ArcballControls } from 'three/addons/controls/ArcballControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function createScene0() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x442020);
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('scene0').appendChild(renderer.domElement);

    // const controls = new ArcballControls(camera, renderer.domElement, scene);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.minPolarAngle = 0
    controls.maxPolarAngle = Math.PI * 0.7;
    controls.enableZoom = false;
    // controls.setGizmosVisible(false);
    // camera.position.set(0, 0, 7);
    // controls.target.set(0, 1, 0);

    function build_3d_object() {
        // add cube
        const geometry = new THREE.BoxGeometry(2, 1, 2);
        const material = new THREE.MeshLambertMaterial({ color: 0xC63D3D });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        const geometry2 = new THREE.BoxGeometry(1, 2, 1);
        const material2 = new THREE.MeshLambertMaterial({ color: 0xC63D3D });
        const cube2 = new THREE.Mesh(geometry2, material2);
        cube2.position.y = 1; // Shift the box up by half of its height
        scene.add(cube2);

        // add lines
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
        const linepoints = [];
        linepoints.push(new THREE.Vector3(0, 0, 0));
        linepoints.push(new THREE.Vector3(0, 3, 0));
        linepoints.push(new THREE.Vector3(1, 3, 0));
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(linepoints);
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);

        // add light
        const light = new THREE.PointLight(0xffffff, 20, 100);
        light.position.set(5, 5, 0);
        scene.add(light);

        // add ambient light
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
    }

    // Handle window resize events
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render()
    });

    // Define rotation speed
    const rotationSpeed = 0.005;

    function render() {
        renderer.render(scene, camera);
    }

    // // Create a render loop
    // function animate() {
    //     requestAnimationFrame(animate);

    //     // line.rotation.y += rotationSpeed;
    //     // cube.rotation.y += rotationSpeed;

    //     controls.update();
    //     render();
    // }

    // // Start the render loop
    // animate();
    build_3d_object();
    // controls.update();
    render()
}
import { motion } from "framer-motion-3d";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useSmoothTransform } from "./use-smooth-transform";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Shapes({ isHover, isPress, mouseX, mouseY }) {
  const lightRotateX = useSmoothTransform(mouseY, spring, mouseToLightRotation);
  const lightRotateY = useSmoothTransform(mouseX, spring, mouseToLightRotation);
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      resize={{ scroll: false, offsetSize: true }}
      camera={{ position: [100, 60, 0], fov: 3 }}
    >
      <motion.group
        center={[0, 0, 0]}
        rotation={[lightRotateX, lightRotateY, 0]}
      >
        <Lights />
      </motion.group>
      <motion.group
        initial={false}
        animate={isHover ? "hover" : "rest"}
        dispose={null}
        position={[0, 0, 0]}
      >
        <OrbitControls autoRotate autoRotateSpeed={8} />
        <Model />
      </motion.group>
    </Canvas>
  );
}

export function Lights() {
  return (
    <>
      <spotLight color="#61dafb" position={[-10, -10, -10]} intensity={0.2} />
      <spotLight color="#61dafb" position={[-10, 0, 15]} intensity={0.8} />
      <spotLight color="#61dafb" position={[-5, 20, 2]} intensity={0.5} />
      <spotLight color="#f2056f" position={[15, 10, -2]} intensity={2} />
      <spotLight color="#f2056f" position={[15, 10, 5]} intensity={1} />
      <spotLight color="#b107db" position={[5, -10, 5]} intensity={0.8} />
    </>
  );
}

export const Model = () => {
  const gltf = useLoader(GLTFLoader, "./darkside_model/darkside_model.gltf");
  return (
    <>
      <primitive object={gltf.scene} scale={1} />
    </>
  );
};

const spring = { stiffness: 600, damping: 30 };

const mouseToLightRotation = (v) => (-1 * v) / 140;

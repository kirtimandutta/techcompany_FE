import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import * as easing from "maath/easing";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

// Optimized meshopt GLB (textures downscaled from 4K).
const MODEL_PATH = "/3d/spaceship.glb";
const THRUSTER_HINT = /(thruster|engine|exhaust|nozzle|reactor|jet)/i;

function tuneMaterial(material, isThruster = false) {
  if (!material || Array.isArray(material)) return;
  if ("envMapIntensity" in material) {
    material.envMapIntensity = 1.4;
  }
  if (isThruster && "emissive" in material) {
    material.emissive = new THREE.Color("#38bdf8");
    material.emissiveIntensity = 4.5;
  }
}

function SpaceshipModel() {
  const groupRef = useRef(null);
  const hoverClockRef = useRef(0);
  const shipTargetRef = useRef({
    // Start higher in the viewport so the ship is visible above hero content.
    position: { x: 2.4, y: 1.25, z: -0.9 },
    rotation: { x: -0.14, y: -0.98, z: 0.08 },
    scale: 0.5,
  });
  // false = skip Draco CDN; true = enable meshopt decode for spaceship.glb
  const { scene } = useGLTF(MODEL_PATH, false, true);
  const shipScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    shipScene.traverse((obj) => {
      if (!obj.isMesh) return;
      // Shadows are expensive on first paint; keep the ship unshadowed for faster GPU setup.
      obj.castShadow = false;
      obj.receiveShadow = false;

      const materialName = obj.material?.name || "";
      const isThruster = THRUSTER_HINT.test(obj.name) || THRUSTER_HINT.test(materialName);

      if (Array.isArray(obj.material)) {
        obj.material.forEach((mat) => tuneMaterial(mat, isThruster));
      } else {
        tuneMaterial(obj.material, isThruster);
      }
    });
  }, [shipScene]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const target = shipTargetRef.current;
    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      },
    });

    timeline
      .to(target.position, { x: -2.35, y: 0.25, z: 3.4 }, 0)
      .to(target.rotation, { x: 0.2, y: 0.88, z: -0.1 }, 0)
      .to(target, { scale: 0.86 }, 0);

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;
    hoverClockRef.current += delta;

    const hoverY = Math.sin(t * 1.15) * 0.12;
    const hoverX = Math.sin(t * 0.55) * 0.06;
    const hoverPitch = Math.sin(t * 0.75) * 0.03;
    const target = shipTargetRef.current;

    easing.damp3(
      groupRef.current.position,
      [target.position.x + hoverX, target.position.y + hoverY, target.position.z],
      0.2,
      delta,
    );
    easing.damp3(
      groupRef.current.rotation,
      [target.rotation.x + hoverPitch, target.rotation.y, target.rotation.z],
      0.2,
      delta,
    );

    const targetScale = target.scale + Math.sin(hoverClockRef.current * 0.8) * 0.01;
    easing.damp3(groupRef.current.scale, [targetScale, targetScale, targetScale], 0.25, delta);
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={shipScene} />
      </Center>
      <pointLight position={[-1.2, -0.2, -2.4]} color="#38bdf8" intensity={55} distance={5} />
      <pointLight position={[-0.2, -0.2, -2.4]} color="#fb923c" intensity={25} distance={4} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH, false, true);

export default function SpaceshipHero() {
  // Defer WebGL mount so the page shell paints before the heavy 3D bundle work.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const enable = () => {
      if (!cancelled) setReady(true);
    };

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(enable, { timeout: 600 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback?.(id);
      };
    }

    const timer = window.setTimeout(enable, 150);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10" aria-hidden>
      {ready ? (
        <Canvas
          dpr={[1, 1.25]}
          camera={{ position: [0, 0.75, 8], fov: 34 }}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
            alpha: true,
            stencil: false,
            depth: true,
          }}
        >
          <ambientLight intensity={0.55} />
          <directionalLight position={[4, 5, 3]} intensity={1.85} />
          <hemisphereLight args={["#93c5fd", "#020617", 0.55]} />
          <Suspense fallback={null}>
            <SpaceshipModel />
          </Suspense>
        </Canvas>
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/35 via-transparent to-slate-950/70" />
    </div>
  );
}

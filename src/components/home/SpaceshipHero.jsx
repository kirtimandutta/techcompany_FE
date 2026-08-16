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

const HERO_POSE = {
  position: { x: 2.4, y: 1.25, z: -0.9 },
  rotation: { x: -0.14, y: -0.98, z: 0.08 },
  scale: 0.5,
};

// Bottom of the viewport — flies up to the hero pose on first load.
const INTRO_START = {
  position: { x: 0.15, y: -4.6, z: 2.2 },
  rotation: { x: 0.22, y: -0.55, z: 0.04 },
  scale: 0.92,
};

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

const IDLE_DELAY_MS = 1600;
const IDLE_SPIN_SPEED = 0.55; // rad/s yaw while idle

function SpaceshipModel({ skipIntro = false, onIntroComplete, reduceMotion = false }) {
  const groupRef = useRef(null);
  const hoverClockRef = useRef(0);
  const introDoneRef = useRef(skipIntro);
  const onIntroCompleteRef = useRef(onIntroComplete);
  const isIdleRef = useRef(false);
  const idleSpinRef = useRef(0);
  const shipTargetRef = useRef({
    position: { ...(skipIntro ? HERO_POSE.position : INTRO_START.position) },
    rotation: { ...(skipIntro ? HERO_POSE.rotation : INTRO_START.rotation) },
    scale: skipIntro ? HERO_POSE.scale : INTRO_START.scale,
  });
  const { scene } = useGLTF(MODEL_PATH, false, true);
  const shipScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    onIntroCompleteRef.current = onIntroComplete;
  }, [onIntroComplete]);

  // After the user stops scrolling, spin the ship in place at the back.
  useEffect(() => {
    if (reduceMotion) return undefined;

    let idleTimer = 0;

    const markActive = () => {
      isIdleRef.current = false;
      window.clearTimeout(idleTimer);
      if (!introDoneRef.current) return;
      idleTimer = window.setTimeout(() => {
        isIdleRef.current = true;
      }, IDLE_DELAY_MS);
    };

    const onScroll = () => markActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });

    // Start idle timer once the ship has settled into its course.
    const settleWatch = window.setInterval(() => {
      if (introDoneRef.current) {
        markActive();
        window.clearInterval(settleWatch);
      }
    }, 200);

    return () => {
      window.clearTimeout(idleTimer);
      window.clearInterval(settleWatch);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll);
    };
  }, [reduceMotion]);

  useEffect(() => {
    shipScene.traverse((obj) => {
      if (!obj.isMesh) return;
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
    const timelines = [];

    const enableScrollCourse = () => {
      const scrollTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      scrollTl
        .to(target.position, { x: -2.35, y: 0.25, z: 3.4 }, 0)
        .to(target.rotation, { x: 0.2, y: 0.88, z: -0.1 }, 0)
        .to(target, { scale: 0.86 }, 0);

      timelines.push(scrollTl);
    };

    if (skipIntro) {
      introDoneRef.current = true;
      onIntroCompleteRef.current?.();
      enableScrollCourse();
    } else {
      window.scrollTo(0, 0);

      const introTl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          introDoneRef.current = true;
          onIntroCompleteRef.current?.();
          enableScrollCourse();
        },
      });

      introTl
        .to(
          target.position,
          {
            x: HERO_POSE.position.x,
            y: HERO_POSE.position.y,
            z: HERO_POSE.position.z,
            duration: 3.6,
          },
          0,
        )
        .to(
          target.rotation,
          {
            x: HERO_POSE.rotation.x,
            y: HERO_POSE.rotation.y,
            z: HERO_POSE.rotation.z,
            duration: 3.6,
          },
          0,
        )
        .to(target, { scale: HERO_POSE.scale, duration: 3.6 }, 0);

      timelines.push(introTl);
    }

    return () => {
      timelines.forEach((tl) => {
        tl.scrollTrigger?.kill();
        tl.kill();
      });
    };
  }, [skipIntro]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;
    hoverClockRef.current += delta;

    // Softer hover during intro ascent, normal idle after.
    const hoverAmp = introDoneRef.current ? 1 : 0.45;
    const hoverY = Math.sin(t * 1.15) * 0.12 * hoverAmp;
    const hoverX = Math.sin(t * 0.55) * 0.06 * hoverAmp;
    const hoverPitch = Math.sin(t * 0.75) * 0.03 * hoverAmp;
    const target = shipTargetRef.current;

    // Idle yaw spin — keeps going while the user sits still on a section.
    if (introDoneRef.current && isIdleRef.current && !reduceMotion) {
      idleSpinRef.current += delta * IDLE_SPIN_SPEED;
    } else if (idleSpinRef.current !== 0) {
      // Ease spin offset back toward 0 (shortest turn) when scrolling resumes.
      const twoPi = Math.PI * 2;
      let offset = ((idleSpinRef.current % twoPi) + twoPi) % twoPi;
      if (offset > Math.PI) offset -= twoPi;
      idleSpinRef.current = offset;
      idleSpinRef.current = THREE.MathUtils.damp(idleSpinRef.current, 0, 4.5, delta);
      if (Math.abs(idleSpinRef.current) < 0.001) idleSpinRef.current = 0;
    }

    easing.damp3(
      groupRef.current.position,
      [target.position.x + hoverX, target.position.y + hoverY, target.position.z],
      introDoneRef.current ? 0.2 : 0.12,
      delta,
    );
    easing.damp3(
      groupRef.current.rotation,
      [
        target.rotation.x + hoverPitch,
        target.rotation.y + idleSpinRef.current,
        target.rotation.z,
      ],
      isIdleRef.current ? 0.08 : introDoneRef.current ? 0.2 : 0.14,
      delta,
    );

    const targetScale = target.scale + Math.sin(hoverClockRef.current * 0.8) * 0.01 * hoverAmp;
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

export default function SpaceshipHero() {
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState("boot"); // boot | intro | settled
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  useEffect(() => {
    let cancelled = false;
    const enable = () => {
      if (cancelled) return;
      setReady(true);
      setPhase(reduceMotion ? "settled" : "intro");
    };

    // Let the first paint finish before booting the WebGL scene.
    let idleId = 0;
    const timer = window.setTimeout(() => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(enable, { timeout: 600 });
      } else {
        enable();
      }
    }, reduceMotion ? 50 : 180);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (idleId && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (phase !== "intro") return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [phase]);

  const handleIntroComplete = () => {
    setPhase("settled");
  };

  return (
    <div
      className={`pointer-events-none fixed inset-0 transition-[z-index] duration-500 ${
        phase === "intro" || phase === "boot" ? "z-[60]" : "z-10"
      }`}
      aria-hidden
    >
      {ready ? (
        <Canvas
          dpr={typeof window !== "undefined" && window.innerWidth < 768 ? [1, 1] : [1, 1.15]}
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
            <SpaceshipModel
              skipIntro={Boolean(reduceMotion)}
              reduceMotion={Boolean(reduceMotion)}
              onIntroComplete={handleIntroComplete}
            />
          </Suspense>
        </Canvas>
      ) : null}
    </div>
  );
}

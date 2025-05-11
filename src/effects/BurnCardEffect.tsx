import { JSX, useRef } from 'react';

import { shaderMaterial } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { extend } from '@react-three/fiber';

// === Config ===
const BURN_CONFIG = {
  durationSeconds: 1.5,
  maxOpacity: 0.6,
  color: { r: 0.0, g: 0.0, b: 0.0 },
  noiseScale: 5.0,
  noiseSpeed: 2,
};

const BurnMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
  },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uProgress;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);

      return mix(
        mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }

    void main() {
      float dist = length(vUv - 0.5);
      float noisy = noise(vUv * ${BURN_CONFIG.noiseScale.toFixed(1)} + uTime * ${BURN_CONFIG.noiseSpeed.toFixed(1)});
      float mask = smoothstep(uProgress * 0.8, uProgress, dist + noisy * 0.1);
      float alpha = (1.0 - mask) * ${BURN_CONFIG.maxOpacity.toFixed(1)};
      gl_FragColor = vec4(${BURN_CONFIG.color.r.toFixed(1)}, ${BURN_CONFIG.color.g.toFixed(1)}, ${BURN_CONFIG.color.b.toFixed(1)}, alpha);
    }
  `,
);

extend({ BurnMaterial });

type BurnMaterialProps = {
  uTime: number;
  uProgress: number;
};

declare module '@react-three/fiber' {
  interface ThreeElements {
    burnMaterial: JSX.IntrinsicElements['meshStandardMaterial'] &
      BurnMaterialProps & {
        attach?: string;
      };
  }
}

const BurnCard = ({ direction }: { direction: 'burn' | 'unburn' | null }) => {
  const materialRef = useRef<InstanceType<typeof BurnMaterial>>(null!);
  const progressRef = useRef(0);
  const lastTimeRef = useRef(0);

  useFrame((_, delta) => {
    if (!materialRef.current || !direction) return;

    const currentTime = performance.now();
    if (currentTime - lastTimeRef.current < 16) {
      return;
    }
    lastTimeRef.current = currentTime;

    const speed = delta / BURN_CONFIG.durationSeconds;
    let next =
      direction === 'burn'
        ? progressRef.current + speed
        : progressRef.current - speed;

    next = Math.min(Math.max(next, 0), 1);
    progressRef.current = next;

    materialRef.current.uProgress = next;
    materialRef.current.uTime += delta * 0.5;
  });

  return (
    <mesh>
      <planeGeometry args={[3, 2]} />
      <burnMaterial ref={materialRef} uTime={0} uProgress={0} transparent />
    </mesh>
  );
};

export const BurnCanvas = ({ type }: { type: 'burn' | 'unburn' | null }) => (
  <Canvas
    orthographic
    camera={{ zoom: 100, position: [0, 0, 10] }}
    style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
    gl={{ alpha: true, preserveDrawingBuffer: true }}
    // frameloop="demand" // to check in case of optimizations issues
  >
    <BurnCard direction={type} />
  </Canvas>
);

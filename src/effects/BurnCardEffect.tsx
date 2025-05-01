import { JSX, useRef, useState } from 'react';

import { shaderMaterial } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { extend } from '@react-three/fiber';

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

    // Simple 2D noise function (value noise approximation)
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
      float noisy = noise(vUv * 10.0 + uTime * 0.5);
      float mask = smoothstep(uProgress * 0.8, uProgress, dist + noisy * 0.1);
      float alpha = (1.0 - mask) * 0.8;
      gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
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

const BurnCard = ({ trigger }: { trigger: boolean }) => {
  const materialRef = useRef<InstanceType<typeof BurnMaterial>>(null!);

  const [progress, setProgress] = useState(0);

  useFrame((_, delta) => {
    if (materialRef.current) {
      if (trigger && progress < 1) {
        const newProgress = Math.min(progress + delta * 0.5, 1);
        setProgress(newProgress);
        materialRef.current.uProgress = newProgress;
      }
      materialRef.current.uTime += delta;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[3, 2]} />
      <burnMaterial ref={materialRef} uTime={0} uProgress={0} />
    </mesh>
  );
};

export const BurnCanvas = ({ trigger }: { trigger: boolean }) => {
  return (
    <Canvas
      orthographic
      camera={{ zoom: 100, position: [0, 0, 10] }}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
      }}
      gl={{
        alpha: true,
        preserveDrawingBuffer: true,
      }}
    >
      <BurnCard trigger={trigger} />
    </Canvas>
  );
};

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ALL_SKILL_TERMS } from '../data/skills'

const DESKTOP_COUNT = 1200
const MOBILE_COUNT = 500

const NOISE_GLSL = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod(i,289.0);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=1.0/7.0;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`

const vertexShader = `
${NOISE_GLSL}

uniform float uTime;
uniform float uScroll;
uniform vec2 uMouse;
uniform float uSeed;
uniform float uPixelRatio;
uniform float uLightBoost;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

attribute float aSize;
attribute vec3 aRandom;
attribute float aDistFromCenter;
attribute float aCluster;

varying vec3 vColor;
varying float vAlpha;
varying float vCluster;
varying float vConc;

void main() {
  vec3 pos = position;

  pos *= 1.6;

  float noiseAmp = 0.55 * (1.0 - uScroll * 0.3);
  vec3 noiseIn = pos * 0.9 + uSeed * 0.01 + uTime * 0.05;
  float n1 = snoise(noiseIn);
  float n2 = snoise(noiseIn * 1.5 + 73.0);
  float n3 = snoise(noiseIn * 0.6 + 137.0);
  pos += normalize(pos) * n1 * noiseAmp;
  pos += vec3(n2 * 0.2, n3 * 0.15, n1 * 0.18);
  pos *= vec3(1.15, 0.85, 1.05);
  float arm = snoise(pos * 0.7 + uTime * 0.03) * 0.25;
  pos.x += arm * pos.y;
  pos.z += arm * 0.5;

  float conc;
  if (uScroll < 0.08) {
    conc = 1.0;
  } else if (uScroll < 0.18) {
    conc = 1.0 - smoothstep(0.08, 0.18, uScroll);
  } else if (uScroll < 0.85) {
    conc = 0.0;
  } else {
    conc = smoothstep(0.85, 0.96, uScroll);
  }

  vec3 dispersed = aRandom * vec3(4.5, 3.5, 3.5);
  dispersed.x += sin(uTime * 0.10 + aRandom.y * 6.28) * 0.12;
  dispersed.y += cos(uTime * 0.08 + aRandom.x * 6.28) * 0.10;
  dispersed.z += sin(uTime * 0.09 + aRandom.z * 6.28) * 0.12;

  pos = mix(dispersed, pos, conc);

  vec2 mWorld = uMouse * vec2(4.0, 3.0);
  vec2 toM = mWorld - pos.xy;
  float mDist = length(toM);
  float mStr = 0.18 * smoothstep(5.0, 0.0, mDist) * mix(0.4, 1.0, conc);
  pos.xy += toM * mStr;

  float breath = 1.0 + sin(uTime * 0.5 + aDistFromCenter * 3.0) * 0.008;
  pos *= breath;

  float d = clamp(aDistFromCenter, 0.0, 1.0);
  if (d < 0.33) {
    vColor = mix(uColor0, uColor1, d * 3.0);
  } else if (d < 0.66) {
    vColor = mix(uColor1, uColor2, (d - 0.33) * 3.0);
  } else {
    vColor = mix(uColor2, uColor3, (d - 0.66) * 3.0);
  }

  vColor = mix(vColor, mix(uColor2, uColor3, 0.5), uScroll * 0.2);

  float isAnchor = step(0.92, aCluster);
  float isBright = step(0.82, aCluster) * (1.0 - isAnchor);
  vColor = mix(vColor, vec3(1.0), isAnchor * 0.3 * (1.0 - uLightBoost));
  vColor *= 1.0 + isAnchor * uLightBoost * 0.25;

  vec3 sphereNormal = normalize(pos);
  vec3 lightDir = normalize(vec3(0.3, 0.8, 0.5));
  float NdotL = max(dot(sphereNormal, lightDir), 0.0);
  float shine = NdotL * NdotL * uLightBoost;
  vColor = mix(vColor, vec3(1.0), shine * 0.18);

  vAlpha = mix(0.22, 0.55, conc);
  vAlpha *= 0.8 + aRandom.z * 0.2;
  vAlpha += conc * uLightBoost * 0.18;
  vAlpha += isAnchor * 0.25;
  vAlpha += isBright * 0.08;
  vAlpha += shine * 0.25;

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  float sz = aSize * uPixelRatio;
  sz *= mix(0.6, 1.0, conc);
  sz += isAnchor * 1.5;
  sz *= mix(1.0, 0.92, uLightBoost);
  gl_PointSize = sz * (80.0 / -mvPos.z);
  gl_PointSize = max(gl_PointSize, 1.2);

  gl_Position = projectionMatrix * mvPos;

  vCluster = aCluster;
  vConc = conc;
}
`

const fragmentShader = `
uniform float uLightBoost;
varying vec3 vColor;
varying float vAlpha;
varying float vCluster;
varying float vConc;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float dist = length(uv);
  if (dist > 0.5) discard;

  float innerEdge = 0.06 * (1.0 - uLightBoost * 0.7);
  float outerEdge = mix(0.32, 0.28, uLightBoost);
  float alpha = 1.0 - smoothstep(innerEdge, outerEdge, dist);
  alpha = pow(alpha, 1.0 + uLightBoost * 0.5);

  float df = 1.0 - vConc;

  float isCross = step(0.92, vCluster) * df;
  float armH = smoothstep(0.12, 0.02, abs(uv.y)) * smoothstep(0.42, 0.06, abs(uv.x));
  float armV = smoothstep(0.12, 0.02, abs(uv.x)) * smoothstep(0.42, 0.06, abs(uv.y));
  float cross = max(armH, armV);
  alpha = mix(alpha, cross * 1.5, isCross);

  float isTri = step(0.85, vCluster) * (1.0 - step(0.92, vCluster)) * df;
  float ty = uv.y + 0.15;
  float triEdge = abs(uv.x) - (0.35 - ty * 0.9);
  float tri = smoothstep(0.04, 0.0, triEdge) * step(0.0, ty) * step(ty, 0.38);
  float triHollow = smoothstep(0.0, 0.06, triEdge + 0.08) * step(0.06, ty);
  alpha = mix(alpha, tri * triHollow * 1.4, isTri);

  float isNode = step(0.78, vCluster) * (1.0 - step(0.85, vCluster)) * df;
  float ring = smoothstep(0.18, 0.22, dist) * (1.0 - smoothstep(0.28, 0.33, dist));
  float pip = 1.0 - smoothstep(0.0, 0.08, dist);
  alpha = mix(alpha, (ring + pip) * 1.3, isNode);

  float isCell = step(0.72, vCluster) * (1.0 - step(0.78, vCluster)) * df;
  float sq = step(abs(uv.x), 0.22) * step(abs(uv.y), 0.22);
  float sqInner = step(abs(uv.x), 0.14) * step(abs(uv.y), 0.14);
  alpha = mix(alpha, (sq - sqInner * 0.6) * 1.3, isCell);

  alpha *= vAlpha;

  gl_FragColor = vec4(vColor, alpha);
}
`

function fibonacciSphere(count) {
  const positions = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i

    positions[i * 3] = Math.cos(theta) * r
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = Math.sin(theta) * r
  }
  return positions
}

function createTextTexture(text) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const fontSize = 64
  ctx.font = `400 ${fontSize}px "JetBrains Mono", "SF Mono", monospace`
  const metrics = ctx.measureText(text)
  canvas.width = Math.ceil(metrics.width) + 24
  canvas.height = Math.ceil(fontSize * 1.6)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.font = `400 ${fontSize}px "JetBrains Mono", "SF Mono", monospace`
  ctx.fillStyle = 'rgba(255, 255, 255, 0.92)'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, 12, canvas.height / 2)
  const tex = new THREE.CanvasTexture(canvas)
  tex.minFilter = THREE.LinearFilter
  tex.magFilter = THREE.LinearFilter
  return { texture: tex, aspect: canvas.width / canvas.height }
}

const LABEL_RADIUS_MIN = 1.9
const LABEL_RADIUS_MAX = 3.4
const BASE_SCALE = 0.05
const HOVER_SCALE = 0.24
const BASE_OPACITY = 0.1
const HOVER_OPACITY = 0.92
const PROXIMITY_RADIUS = 0.2

const DARK_COLORS = {
  c0: [0.831, 0.188, 0.039],
  c1: [0.635, 0.125, 0.271],
  c2: [0.910, 0.510, 0.059],
  c3: [0.847, 0.925, 1.0],
}
const LIGHT_COLORS = {
  c0: [0.700, 0.160, 0.030],
  c1: [0.540, 0.100, 0.230],
  c2: [0.750, 0.410, 0.030],
  c3: [0.160, 0.350, 0.560],
}

export default function ParticleField({ bootConcentrationRef, bootComplete, theme }) {
  const pointsRef = useRef()
  const spriteGroupRef = useRef()
  const labelsRef = useRef([])
  const scrollRef = useRef(0)
  const mouseRef = useRef({ x: 99, y: 99 })
  const cursorActive = useRef(false)
  const mouseTarget = useRef(new THREE.Vector2(0, 0))
  const projVec = useRef(new THREE.Vector3())
  const labelState = useRef([])
  const colorTargets = useRef([
    new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()
  ])

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const count = isMobile ? MOBILE_COUNT : DESKTOP_COUNT
  const seed = 'SHREYASH'.split('').reduce((a, c, i) => a + c.charCodeAt(0) * (i + 1), 0)

  const { positions, randoms, sizes, distances, clusters } = useMemo(() => {
    const pos = fibonacciSphere(count)
    const rand = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    const dist = new Float32Array(count)
    const clust = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = Math.cbrt(Math.random())
      rand[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      rand[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      rand[i * 3 + 2] = r * Math.cos(phi)
      sz[i] = 1.2 + Math.random() * 2.8
      dist[i] = i / (count - 1)
      clust[i] = Math.random()
    }

    return { positions: pos, randoms: rand, sizes: sz, distances: dist, clusters: clust }
  }, [count])

  const labelData = useMemo(() => {
    const terms = ALL_SKILL_TERMS
    const golden = Math.PI * (3 - Math.sqrt(5))
    const seededRand = (i) => {
      let s = i * 9301 + 49297
      return ((s * s) % 233280) / 233280
    }
    const data = terms.map((term, i) => {
      const { texture, aspect } = createTextTexture(term)
      const y = 1 - (i / (terms.length - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i * 2.39
      const radius = LABEL_RADIUS_MIN + seededRand(i) * (LABEL_RADIUS_MAX - LABEL_RADIUS_MIN)
      return {
        term,
        texture,
        aspect,
        basePos: new THREE.Vector3(
          Math.cos(theta) * r * radius,
          y * radius * 0.75,
          Math.sin(theta) * r * radius
        ),
      }
    })
    labelState.current = data.map(() => ({ scale: 0, opacity: 0 }))
    return data
  }, [])

  const colors = theme === 'light' ? LIGHT_COLORS : DARK_COLORS

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uSeed: { value: seed },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uLightBoost: { value: 0.0 },
    uColor0: { value: new THREE.Vector3(...DARK_COLORS.c0) },
    uColor1: { value: new THREE.Vector3(...DARK_COLORS.c1) },
    uColor2: { value: new THREE.Vector3(...DARK_COLORS.c2) },
    uColor3: { value: new THREE.Vector3(...DARK_COLORS.c3) },
  }), [seed])

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = h > 0 ? window.scrollY / h : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const onMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
      cursorActive.current = true
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [isMobile])

  useFrame((state) => {
    if (!pointsRef.current) return
    const mat = pointsRef.current.material
    const t = state.clock.elapsedTime
    const camera = state.camera

    mat.uniforms.uTime.value = t

    const isDark = theme !== 'light'
    mat.uniforms.uLightBoost.value += ((isDark ? 0.0 : 1.0) - mat.uniforms.uLightBoost.value) * 0.04

    const targetBlending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending
    if (mat.blending !== targetBlending) {
      mat.blending = targetBlending
      mat.needsUpdate = true
    }

    const tc = theme === 'light' ? LIGHT_COLORS : DARK_COLORS
    const ct = colorTargets.current
    ct[0].set(...tc.c0); ct[1].set(...tc.c1); ct[2].set(...tc.c2); ct[3].set(...tc.c3)
    mat.uniforms.uColor0.value.lerp(ct[0], 0.04)
    mat.uniforms.uColor1.value.lerp(ct[1], 0.04)
    mat.uniforms.uColor2.value.lerp(ct[2], 0.04)
    mat.uniforms.uColor3.value.lerp(ct[3], 0.04)

    const targetScroll = bootComplete
      ? scrollRef.current
      : (1 - (bootConcentrationRef?.current ?? 1)) * 0.5

    mat.uniforms.uScroll.value +=
      (targetScroll - mat.uniforms.uScroll.value) * 0.06

    mouseTarget.current.set(mouseRef.current.x, mouseRef.current.y)
    mat.uniforms.uMouse.value.lerp(mouseTarget.current, 0.05)

    const rotY = t * 0.025
    const rotX = Math.sin(t * 0.015) * 0.06
    pointsRef.current.rotation.y = rotY
    pointsRef.current.rotation.x = rotX
    if (spriteGroupRef.current) {
      spriteGroupRef.current.rotation.y = rotY
      spriteGroupRef.current.rotation.x = rotX
    }

    const isConcentrated = mat.uniforms.uScroll.value < 0.06
    const mx = mouseRef.current.x
    const my = mouseRef.current.y

    labelsRef.current.forEach((sprite, i) => {
      if (!sprite) return
      const data = labelData[i]
      const st = labelState.current[i]
      const sMat = sprite.material
      const labelBlend = isDark ? THREE.AdditiveBlending : THREE.NormalBlending
      if (sMat.blending !== labelBlend) {
        sMat.blending = labelBlend
        sMat.needsUpdate = true
      }
      const labelTarget = isDark ? new THREE.Color(0xD8ECFF) : new THREE.Color(0x14141A)
      sMat.color.lerp(labelTarget, 0.04)

      sprite.position.copy(data.basePos)

      if (!bootComplete || !isConcentrated || isMobile || !cursorActive.current) {
        st.opacity += (0 - st.opacity) * 0.08
        st.scale += (0 - st.scale) * 0.08
      } else {
        sprite.getWorldPosition(projVec.current)
        projVec.current.project(camera)

        const dx = projVec.current.x - mx
        const dy = projVec.current.y - my
        const screenDist = Math.sqrt(dx * dx + dy * dy)

        const proximity = 1 - Math.min(screenDist / PROXIMITY_RADIUS, 1)
        const eased = proximity * proximity * (3 - 2 * proximity)

        const targetScale = BASE_SCALE + (HOVER_SCALE - BASE_SCALE) * eased
        const targetOpacity = BASE_OPACITY + (HOVER_OPACITY - BASE_OPACITY) * eased

        st.scale += (targetScale - st.scale) * 0.1
        st.opacity += (targetOpacity - st.opacity) * 0.1
      }

      const h = st.scale
      sprite.scale.set(h * data.aspect, h, 1)
      sprite.material.opacity = st.opacity
    })
  })

  return (
    <group>
      <points ref={pointsRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
          <bufferAttribute attach="attributes-aRandom" array={randoms} count={count} itemSize={3} />
          <bufferAttribute attach="attributes-aSize" array={sizes} count={count} itemSize={1} />
          <bufferAttribute attach="attributes-aDistFromCenter" array={distances} count={count} itemSize={1} />
          <bufferAttribute attach="attributes-aCluster" array={clusters} count={count} itemSize={1} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <group ref={spriteGroupRef}>
        {labelData.map((data, i) => (
          <sprite
            key={data.term}
            ref={(el) => { labelsRef.current[i] = el }}
            position={[data.basePos.x, data.basePos.y, data.basePos.z]}
            scale={[0.001, 0.001, 1]}
          >
            <spriteMaterial
              map={data.texture}
              transparent
              opacity={0}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </sprite>
        ))}
      </group>
    </group>
  )
}

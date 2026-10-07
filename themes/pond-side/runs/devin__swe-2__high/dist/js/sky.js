// 天穹：日夜渐变、太阳、月亮、星星、流云
import * as THREE from 'three';

export function createSky() {
  const uniforms = {
    zenith: { value: new THREE.Color() },
    horizon: { value: new THREE.Color() },
    sunDir: { value: new THREE.Vector3(0, 1, 0) },
    sunColor: { value: new THREE.Color() },
    moonDir: { value: new THREE.Vector3(0, 1, 0) },
    moonI: { value: 0 },
    starI: { value: 0 },
    cloudA: { value: 0.5 },
    rainDark: { value: 0 },
    time: { value: 0 },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    vertexShader: `
      varying vec3 vDir;
      void main(){
        vDir = normalize(position);
        vec4 mv = modelViewMatrix * vec4(position, 1.);
        gl_Position = projectionMatrix * mv;
        gl_Position.z = gl_Position.w * 0.99999;
      }`,
    fragmentShader: `
      uniform vec3 zenith, horizon, sunColor;
      uniform vec3 sunDir, moonDir;
      uniform float moonI, starI, cloudA, rainDark, time;
      varying vec3 vDir;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
      float noise(vec2 p){
        vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
        return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y);
      }
      float fbm(vec2 p){
        float s=0., a=.5;
        for(int i=0;i<5;i++){ s+=a*noise(p); a*=.5; p*=2.07; }
        return s;
      }
      void main(){
        vec3 d = normalize(vDir);
        float h = clamp(d.y, -0.05, 1.0);
        vec3 col = mix(horizon, zenith, pow(max(h,0.), 0.62));

        // 太阳光晕
        float sd = max(dot(d, sunDir), 0.);
        col += sunColor * (pow(sd, 900.)*3.0 + pow(sd, 22.)*0.28 + pow(sd, 4.)*0.08);

        // 月亮 + 月晕
        float md = max(dot(d, moonDir), 0.);
        vec3 moonCol = vec3(0.85, 0.9, 1.0);
        col += moonCol * moonI * (pow(md, 1800.)*14.0 + pow(md, 60.)*0.35 + pow(md, 6.)*0.05);

        // 星星
        if (starI > 0.01 && d.y > 0.02) {
          vec2 sp = d.xz / (d.y + 0.35) * 40.;
          vec2 cell = floor(sp);
          float st = hash(cell);
          vec2 fp = fract(sp) - 0.5;
          float star = smoothstep(0.08, 0.0, length(fp)) * step(0.92, st);
          star *= 0.6 + 0.4 * sin(time * (2. + st * 4.) + st * 40.);
          col += vec3(0.9, 0.95, 1.0) * star * starI * smoothstep(0.02, 0.25, d.y);
        }

        // 云
        if (d.y > 0.01) {
          vec2 cp = d.xz / (d.y + 0.18);
          float cl = fbm(cp * 1.4 + vec2(time * 0.008, time * 0.004));
          float cl2 = fbm(cp * 3.1 - vec2(time * 0.013, 0.));
          float c = smoothstep(0.52, 0.78, cl * 0.7 + cl2 * 0.3) * cloudA;
          vec3 cCol = mix(horizon * 1.05 + sunColor * 0.15, zenith * 0.6 + vec3(0.35), 0.5);
          col = mix(col, cCol, c * smoothstep(0.01, 0.2, d.y));
        }

        // 雨天压暗
        col *= (1.0 - rainDark * 0.45);
        col = mix(col, col * vec3(0.75, 0.85, 0.9), rainDark * 0.5);
        gl_FragColor = vec4(col, 1.);
      }`,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(120, 32, 20), mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = -10;
  return { mesh, uniforms };
}

import * as THREE from 'three'

export const TAU = Math.PI * 2

export const polar = (r, a) => new THREE.Vector2(Math.cos(a) * r, Math.sin(a) * r)

function arcInto(pts, r, a0, a1, segs) {
  for (let i = 1; i <= segs; i++) {
    pts.push(polar(r, a0 + (a1 - a0) * (i / segs)))
  }
}

/**
 * 渐开线近似的外齿轮轮廓：齿心正好落在局部角度 0 上，
 * 齿槽中心落在 pitch/2 上 —— 这是两轮相位咬合计算的前提。
 */
export function gearProfile({
  teeth,
  module: m,
  addendum = 0.95,
  dedendum = 1.2,
  tipFrac = 0.25,
  rootFrac = 0.62,
  tipSegs = 2,
  rootSegs = 3,
}) {
  const rPitch = (m * teeth) / 2
  const rTip = rPitch + addendum * m
  const rRoot = Math.max(rPitch - dedendum * m, rPitch * 0.32)
  const pitch = TAU / teeth
  const hwRoot = (rootFrac * pitch) / 2
  const hwTip = (tipFrac * pitch) / 2

  const pts = []
  let prev = -pitch + hwRoot
  pts.push(polar(rRoot, prev))
  for (let i = 0; i < teeth; i++) {
    const c = i * pitch
    arcInto(pts, rRoot, prev, c - hwRoot, rootSegs)
    pts.push(polar(rTip, c - hwTip))
    arcInto(pts, rTip, c - hwTip, c + hwTip, tipSegs)
    pts.push(polar(rRoot, c + hwRoot))
    prev = c + hwRoot
  }
  return { pts, rPitch, rTip, rRoot }
}

export function circlePath(r, segs = 56) {
  const pts = []
  for (let i = 0; i < segs; i++) pts.push(polar(r, -(i / segs) * TAU))
  return new THREE.Path(pts)
}

export function sectorPath(r0, r1, a0, a1, segs = 18) {
  const pts = []
  for (let i = 0; i <= segs; i++) pts.push(polar(r1, a0 + (a1 - a0) * (i / segs)))
  for (let i = segs; i >= 0; i--) pts.push(polar(r0, a0 + (a1 - a0) * (i / segs)))
  return new THREE.Path(pts)
}

/** 带轮辐窗口的轮片轮廓（或实心轮廓） */
export function wheelShape({
  teeth,
  module: m,
  spokes = 4,
  rimFrac = 0.78,
  hubFrac = 0.17,
  spokeFrac = 0.2,
  solid = false,
}) {
  const { pts, rPitch, rTip, rRoot } = gearProfile({ teeth, module: m })
  const shape = new THREE.Shape(pts)
  const rimInner = rPitch * rimFrac
  const hubR = Math.max(rPitch * hubFrac, m * 1.7)

  if (!solid) {
    if (spokes >= 3 && rimInner > hubR * 1.9) {
      const sector = TAU / spokes
      const half = (sector * spokeFrac) / 2
      for (let s = 0; s < spokes; s++) {
        shape.holes.push(sectorPath(hubR * 1.2, rimInner * 0.97, s * sector + half, (s + 1) * sector - half))
      }
    } else {
      shape.holes.push(circlePath(hubR))
    }
  }
  return { shape, rPitch, rTip, rRoot, hubR, rimInner }
}

/** 擒纵轮：15 枚前倾钩齿 + 减重孔 */
export function escapeWheelShape({ teeth = 15, rRoot = 0.6, rTip = 1.18, holes = 5, webHole = 0.3 }) {
  const pitch = TAU / teeth
  const pts = []
  const lead = -0.1 * pitch // 齿根（前缘侧）
  const tipRise = 0.02 * pitch
  const tipEnd = 0.05 * pitch
  const trail = 0.4 * pitch

  let prev = lead - pitch * 0.5 + pitch * 0.5 // 上一齿尾：c + trail - pitch
  prev = trail - pitch
  pts.push(polar(rRoot, prev))
  for (let i = 0; i < teeth; i++) {
    const c = i * pitch
    arcInto(pts, rRoot, prev, c + lead, 4)
    pts.push(polar(rTip, c + tipRise))
    arcInto(pts, rTip, c + tipRise, c + tipEnd, 1)
    pts.push(polar(rRoot, c + trail))
    prev = c + trail
  }

  const shape = new THREE.Shape(pts)
  shape.holes.push(circlePath(0.17, 40))
  const rHole = (0.24 + rRoot * 0.72) / 2 + 0.11
  for (let i = 0; i < holes; i++) {
    const a = (i / holes) * TAU + 0.3
    const cx = Math.cos(a) * rHole
    const cy = Math.sin(a) * rHole
    const p = []
    for (let k = 0; k < 26; k++) {
      const t = -(k / 26) * TAU
      p.push(new THREE.Vector2(cx + Math.cos(t) * webHole, cy + Math.sin(t) * webHole))
    }
    shape.holes.push(new THREE.Path(p))
  }
  return { shape, rRoot, rTip }
}

/** 阿基米德螺旋带（发条 / 游丝） */
export function spiralRibbon({ rInner, rOuter, turns, width, samples = 340, dir = 1 }) {
  const inner = []
  const outer = []
  for (let i = 0; i <= samples; i++) {
    const u = i / samples
    const a = u * turns * TAU * dir
    const r = rInner + (rOuter - rInner) * u
    const c = Math.cos(a)
    const s = Math.sin(a)
    inner.push(new THREE.Vector2(c * (r - width / 2), s * (r - width / 2)))
    outer.push(new THREE.Vector2(c * (r + width / 2), s * (r + width / 2)))
  }
  const shape = new THREE.Shape()
  shape.moveTo(inner[0].x, inner[0].y)
  for (let i = 1; i < inner.length; i++) shape.lineTo(inner[i].x, inner[i].y)
  for (let i = outer.length - 1; i >= 0; i--) shape.lineTo(outer[i].x, outer[i].y)
  shape.closePath()
  return shape
}

export function extrude(shape, thickness, bevel = 0.014) {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelOffset: 0,
    bevelSegments: 1,
    curveSegments: 1,
  })
  geo.translate(0, 0, -thickness / 2)
  return geo
}

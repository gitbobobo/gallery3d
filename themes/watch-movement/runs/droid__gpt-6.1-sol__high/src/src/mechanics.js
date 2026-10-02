export const MODULE = 0.04;
export const FREQUENCY = 2.5;
export const ESCAPE_TEETH = 15;
export const AMPLITUDE = 250 * Math.PI / 180;
export const STAGES = [
  { id: 'barrel', teeth: 96, pinion: null, x: -2.05, y: 1.8, z: 0.42 },
  { id: 'center', teeth: 80, pinion: 12, direction: -20, z: 0.92 },
  { id: 'third', teeth: 75, pinion: 10, direction: -45, z: 1.34 },
  { id: 'fourth', teeth: 80, pinion: 10, direction: -115, z: 1.76 },
  { id: 'escape', teeth: 15, pinion: 8, direction: -165, z: 0.94 },
];

STAGES[0].phase = 0;
STAGES[0].ratio = 1;
for (let i = 1; i < STAGES.length; i++) {
  const previous = STAGES[i - 1];
  const current = STAGES[i];
  const direction = current.direction * Math.PI / 180;
  const distance = MODULE * (previous.teeth + current.pinion) / 2;
  current.x = previous.x + distance * Math.cos(direction);
  current.y = previous.y + distance * Math.sin(direction);
  current.phase = direction + Math.PI +
    (Math.PI - previous.teeth * (previous.phase - direction)) / current.pinion;
  current.ratio = -previous.ratio * previous.teeth / current.pinion;
  current.pinionZ = previous.z;
}

const smooth = (x) => x * x * (3 - 2 * x);

export function movementAt(seconds) {
  const beat = seconds * FREQUENCY * 2;
  const complete = Math.floor(beat);
  const release = smooth(Math.min((beat - complete) / 0.2, 1));
  const escape = (complete + release) * Math.PI / ESCAPE_TEETH;
  const barrel = escape / STAGES.at(-1).ratio;
  return {
    angles: STAGES.map((stage) => stage.phase + barrel * stage.ratio),
    balance: AMPLITUDE * Math.sin(seconds * FREQUENCY * Math.PI * 2),
    fork: 0.14 * Math.tanh(8 * Math.sin(seconds * FREQUENCY * Math.PI * 2)),
    beats: complete,
  };
}

export const PARTS = {
  barrel: { title: '发条盒', english: 'Mainspring barrel', category: '能量储存', index: '01', description: '卷紧的发条储存能量，缓慢舒展时推动发条盒转动。盒缘的 96 枚轮齿把扭矩传给中心轮齿轴，是整个机芯的动力起点。', metric: '发条盒轮齿', value: '96', unit: '齿', target: [-2.05, 1.8, 0.9] },
  train: { title: '传动轮系', english: 'Gear train', category: '能量传递', index: '02', description: '中心轮、三轮与四轮逐级提高转速。相邻轮齿反向啮合，同一根轴上的齿轴与大轮同步旋转，四轮恰好每分钟转一圈。', metric: '中心轮 → 擒纵轮', value: '1 : 600', unit: '', target: [1.25, -0.21, 1.34] },
  escape: { title: '擒纵轮', english: 'Escape wheel', category: '定量释放', index: '03', description: '15 枚特殊轮齿交替被两枚叉瓦锁住与释放。每次半摆前进半齿，既限制轮系的转速，也把发条的能量传给擒纵叉。', metric: '真实转速', value: '10', unit: '圈 / 分钟', target: [STAGES[4].x, STAGES[4].y, 1.1] },
  fork: { title: '擒纵叉', english: 'Pallet fork', category: '锁止与传冲', index: '04', description: '两端的红宝石叉瓦轮流锁住擒纵轮。摆轮经过中点时拨动叉口，释放一小步轮系，再接收一次推动，补偿摩擦损失。', metric: '交替工作的叉瓦', value: '2', unit: '枚', target: [-2.2, -1.67, 1.22] },
  balance: { title: '摆轮与游丝', english: 'Balance & hairspring', category: '调速机构', index: '05', description: '游丝让摆轮往复摆动。每次经过中点，擒纵叉释放一次轮系，并向摆轮补充能量，让时间保持均匀的节奏。', metric: '每秒完整摆动', value: '2.5', unit: '次', target: [-2.8, -0.6, 1.6] },
};

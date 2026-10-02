export const MOD = 0.14

/** 轮系齿数与层级（Z 为堆叠高度，单位与坐标一致） */
export const TRAIN = [
  { id: 'barrel', teeth: 72, pinion: 0 },
  { id: 'center', teeth: 64, pinion: 12 },
  { id: 'third', teeth: 60, pinion: 8 },
  { id: 'fourth', teeth: 60, pinion: 8 },
  { id: 'escape', teeth: 15, pinion: 6 },
]

export const LEVEL = {
  barrel: 0,
  centerPinion: 0,
  centerWheel: 1.1,
  thirdPinion: 1.1,
  thirdWheel: 2.2,
  fourthPinion: 2.2,
  fourthWheel: 3.3,
  escapePinion: 3.3,
  escapeWheel: 4.4,
  pallet: 5.0,
  roller: 5.35,
  balance: 5.95,
  hairspring: 6.52,
  cock: 6.95,
  plate: -1.4,
}

/** 主动轮 → 从动轴齿 的啮合链 */
export const LINKS = [
  { driver: 'barrel', dTeeth: 72, driven: 'centerPinion', kTeeth: 12 },
  { driver: 'center', dTeeth: 64, driven: 'thirdPinion', kTeeth: 8 },
  { driver: 'third', dTeeth: 60, driven: 'fourthPinion', kTeeth: 8 },
  { driver: 'fourth', dTeeth: 60, driven: 'escapePinion', kTeeth: 6 },
]

export const CHIP_ORDER = ['barrel', 'train', 'escape', 'pallet', 'balance', 'plate']

export const PARTS = {
  barrel: {
    id: 'barrel',
    name: '发条盒',
    en: 'Mainspring Barrel',
    role: '储能',
    desc: '盒内盘着一根长长的发条。上链时发条被收紧在发条轴上，随后一点点松开，把扭力通过盒壁上的 72 枚齿传给下一轮。它是整枚机芯唯一的能量来源，一次上满大约能走 40 小时。',
    specs: [
      ['轮齿', '72'],
      ['转速', '1 转 / 6 小时'],
      ['对中心轮', '6 : 1'],
      ['自转方向', '顺时针'],
    ],
  },
  train: {
    id: 'train',
    name: '传动轮系',
    en: 'Going Train',
    role: '增速 · 传递',
    desc: '由中心轮、三番车、四番车串起来的一组增速齿轮。发条盒送来的低速大扭矩，在这里逐级增速、逐级减矩，最后送抵擒纵机构；分针、时针、秒针也分别挂在其中某一轮的轴上。',
    specs: [
      ['中心轮', '64 : 12 · 8 : 1 后级'],
      ['三番车', '60 : 8 · 8 转/小时'],
      ['四番车', '60 : 8 · 60 转/小时'],
      ['发条盒→四番车', '360 : 1'],
    ],
  },
  center: {
    id: 'center',
    name: '中心轮',
    en: 'Center Wheel · 2nd',
    role: '二轮 · 分针轮',
    desc: '机芯的中枢。轮片每小时正好转一整圈，分针就装在它的轴上；轴上 12 齿的小轮由发条盒驱动，轮片上的 64 枚齿再把动力交给三番车。',
    specs: [
      ['轴齿 / 轮片', '12 / 64'],
      ['转速', '1 转 / 小时'],
      ['输出', '分针'],
      ['自转方向', '逆时针'],
    ],
  },
  third: {
    id: 'third',
    name: '三番车',
    en: 'Third Wheel',
    role: '三轮 · 过桥',
    desc: '一枚纯粹的过桥轮。它不带任何指针，只负责把中心轮的转速再提高 8 倍交给四番车，同时把扭矩继续降下来。',
    specs: [
      ['轴齿 / 轮片', '8 / 60'],
      ['转速', '8 转 / 小时'],
      ['对中心轮', '8 : 1'],
      ['自转方向', '顺时针'],
    ],
  },
  fourth: {
    id: 'fourth',
    name: '四番车',
    en: 'Fourth Wheel · Seconds',
    role: '四轮 · 秒轮',
    desc: '又叫秒轮。轮片每分钟整好转一圈，秒针通常就锁在它的轴上 —— 所以它的转速必须精确到 60 转每小时，一秒钟走过的角度肉眼可辨。',
    specs: [
      ['轴齿 / 轮片', '8 / 60'],
      ['转速', '60 转 / 小时'],
      ['输出', '秒针'],
      ['自转方向', '逆时针'],
    ],
  },
  escape: {
    id: 'escape',
    name: '擒纵轮',
    en: 'Escape Wheel',
    role: '擒纵机构',
    desc: '传动轮系的最后一环。15 枚钩齿被擒纵叉一格一格地放行：每个「滴答」只前进半个齿，也就是 12°。一秒钟走 2.5 个齿，正好 600 转每小时 —— 这个数字是从 18000 次/小时倒推出来的。',
    specs: [
      ['轮齿 / 轴齿', '15 / 6'],
      ['转速', '600 转 / 小时'],
      ['每拍进给', '12°（半齿）'],
      ['进给频率', '2.5 齿 / 秒'],
    ],
  },
  pallet: {
    id: 'pallet',
    name: '擒纵叉',
    en: 'Pallet Fork · Anchor',
    role: '擒纵机构',
    desc: '叉臂两端各镶一颗红宝石瓦。一只瓦锁住擒纵轮的齿时，另一只瓦已经准备好接班。摆轮每摆过一次中点，叉子就左右翻一次：放行半个齿，同时把一份能量补回给摆轮。',
    specs: [
      ['摆角', '± 6.5°'],
      ['翻转频率', '5 次 / 秒'],
      ['宝石瓦', '入口瓦 + 出口瓦'],
      ['与摆轮', '通过圆盘钉传动'],
    ],
  },
  balance: {
    id: 'balance',
    name: '摆轮',
    en: 'Balance Wheel & Hairspring',
    role: '调速机构',
    desc: '机芯的心跳。游丝把摆轮拴在平衡位置上，让它以 2.5 Hz 来回摆动 —— 每小时恰好 18000 次半摆，摆幅约 250°。它每摆一次就让擒纵叉换边一次；走时的快慢，由游丝的有效长度决定。',
    specs: [
      ['频率', '2.5 Hz · 18 000 A/h'],
      ['周期', '0.40 s'],
      ['摆幅', '约 250°'],
      ['每小时半摆', '18 000 次'],
    ],
  },
  plate: {
    id: 'plate',
    name: '主夹板',
    en: 'Main Plate',
    role: '基体',
    desc: '整枚机芯的底盘。所有轮轴的下轴眼都压在这块夹板上，上面再盖夹板把轴尖锁死，各轮的中心距因此分毫不差 —— 齿轮能不能正确咬合，全靠它来保证。',
    specs: [
      ['厚度', '示意 0.9 单位'],
      ['轴眼', '红宝石轴承 × 7'],
      ['紧固', '蓝钢螺丝'],
      ['刻印', 'CALIBRE 3D'],
    ],
  },
}

export interface PartInfo {
  id: string;
  name: string;
  enName: string;
  category: string;
  specs: { label: string; value: string }[];
  summary: string;
  principle: string;
  highlights: string[];
}

export const PARTS_DATA: Record<string, PartInfo> = {
  mainspring_barrel: {
    id: 'mainspring_barrel',
    name: '发条盒与主发条',
    enName: 'Mainspring Barrel & Spring',
    category: '动力储存机构 (Energy Storage)',
    specs: [
      { label: '齿数', value: '72 齿' },
      { label: '动力储存', value: '约 42~48 小时' },
      { label: '发条材质', value: 'Nivaflex 高弹性特种合金' },
      { label: '转动周期', value: '约 6 小时/周' },
    ],
    summary: '机械腕表的“能量心脏”，储存发条上紧后产生的弹性势能，并平缓持续地释放给整个轮系。',
    principle:
      '发条由高弹性合金带卷绕在发条盒内。上条时，中心发条轴转动将发条卷紧；工作时，发条外端拉动发条盒鼓形外壳转动，外缘轮齿直接驱动二轮齿轴，将动力传递至整个传动轮系。',
    highlights: [
      '内置 S 形主发条，提供尽可能平稳的扭矩输出',
      '外圈精密加工 72 齿，与二轮小齿轴精确啮合',
      '上方配合大钢轮与止逆棘爪，防止发条逆向泄力',
    ],
  },

  ratchet_wheel: {
    id: 'ratchet_wheel',
    name: '大钢轮与止逆棘爪',
    enName: 'Ratchet Wheel & Click Mechanism',
    category: '上条机构 (Winding System)',
    specs: [
      { label: '齿形', value: '单向棘轮斜齿' },
      { label: '表面打磨', value: '日内瓦太阳放射纹 (Soleillage)' },
      { label: '止逆结构', value: '弹簧压合式止逆棘爪 (Click)' },
      { label: '螺丝固定', value: '高光镜面抛光烤蓝钢螺丝' },
    ],
    summary: '连接上条柄轴与发条芯，确保手动或自动上链时发条只能被卷紧，绝不逆转回弹。',
    principle:
      '转动表冠时，立轮带动小钢轮、进而带动大钢轮旋转卷紧发条。止逆棘爪在弹簧压力下跳动，发出清脆的“咔哒”上链声，牢牢卡住齿尖阻止反向转动，保证动力安全锁定在发条盒内。',
    highlights: [
      '表面采用精致的太阳放射纹打磨，随光线旋转呈现动态反光',
      '棘爪经过精细缎面与倒角镜面抛光处理',
    ],
  },

  center_wheel: {
    id: 'center_wheel',
    name: '二轮（中心轮/分轮）',
    enName: 'Center Wheel & Pinion',
    category: '传动轮系 (Gear Train)',
    specs: [
      { label: '轮片齿数', value: '64 齿' },
      { label: '齿轴叶数', value: '12 叶钢质齿轴' },
      { label: '转速', value: '1 圈 / 小时 (60 分钟)' },
      { label: '轮片材质', value: 'CuBe / 高强度硬质黄铜镀金' },
    ],
    summary: '传动轮系的第一级加速轮，位于机芯中心，其轴芯延伸穿透表盘直接驱动分针指示时间。',
    principle:
      '中心齿轴与发条盒啮合，发条盒旋转 1 圈驱动二轮旋转约 6 圈。二轮旋转周期被严格校准为 1 小时，它既是走时基准的一环，也通过轮片将动力加速传递给三轮。',
    highlights: [
      '精密的 4 臂辐条镂空设计，兼具结构刚性与极低转动惯量',
      '硬化淬火精研磨钢齿轴，摩擦阻力降至微米级',
    ],
  },

  third_wheel: {
    id: 'third_wheel',
    name: '三轮（中间传动轮）',
    enName: 'Third Wheel & Pinion',
    category: '传动轮系 (Gear Train)',
    specs: [
      { label: '轮片齿数', value: '60 齿' },
      { label: '齿轴叶数', value: '8 叶淬硬钢齿轴' },
      { label: '转速', value: '8 圈 / 小时 (450 秒/圈)' },
      { label: '传动比', value: '相对二轮 8:1 升速' },
    ],
    summary: '承上启下的中间加速轮，将二轮平缓的动力进一步大幅提速，传递给秒轮。',
    principle:
      '三轮齿轴（8叶）与二轮（64齿）啮合，实现 8 倍转速跃升；三轮轮片（60齿）再与四轮齿轴（8叶）啮合，再次提速 7.5 倍，从而将原本 1 小时转 1 圈的转速精准提升至 1 分钟转 1 圈。',
    highlights: [
      '高精度外摆线（Cycloidal）轮齿齿廓，保证连续稳定的微小力矩无顿挫传动',
      '两端轴尖运转于高级红宝石轴承中',
    ],
  },

  fourth_wheel: {
    id: 'fourth_wheel',
    name: '四轮（秒轮）',
    enName: 'Fourth / Seconds Wheel',
    category: '传动轮系 (Gear Train)',
    specs: [
      { label: '轮片齿数', value: '70 齿' },
      { label: '齿轴叶数', value: '8 叶精密钢齿轴' },
      { label: '转速', value: '1 圈 / 60 秒 (1 RPM)' },
      { label: '秒针联动', value: '加长轴尖直连小秒针/中心秒针' },
    ],
    summary: '时间的直接度量者，精确以每分钟 1 转运转，其轴尖正是腕表秒针的安装基底。',
    principle:
      '经过二轮与三轮的复合变速，四轮转速刚好达到 60 秒一整圈。四轮轮齿（70齿）与擒纵轮小齿轴（7叶）啮合，推动擒纵轮以每 6 秒转 1 圈的高速运转，完成能量向擒纵系统的最终交接。',
    highlights: [
      '极纤薄的金质轮盘与镜面倒角辐条，减少回转质量',
      '在经典的 6 点钟小秒盘机芯中，此轮直接延伸至表盘驱动秒针',
    ],
  },

  escape_wheel: {
    id: 'escape_wheel',
    name: '擒纵轮（瓦形特殊齿）',
    enName: 'Club-Tooth Escape Wheel',
    category: '擒纵机构 (Escapement)',
    specs: [
      { label: '特殊齿数', value: '15 齿 (瑞士杠杆式瓦齿)' },
      { label: '每圈步数', value: '30 步 (每齿产生 2 次脉冲)' },
      { label: '转速', value: '10 圈 / 分钟 (6 秒/圈)' },
      { label: '材质与打磨', value: '特种硬化钢 / 镜面高光抛光' },
    ],
    summary: '连接持续旋转轮系与往复震荡摆轮的“闸门”，将旋转能量转化为微小的离散推动脉冲。',
    principle:
      '擒纵轮齿具有锁结面、冲进面与冲出角。每当摆轮经过平衡位置触发擒纵叉解锁，擒纵轮就会向前跳进半个齿距（12°），同时斜面狠狠推击擒纵叉瓦宝石，将微小动能“踢”给摆轮以维持摆幅。',
    highlights: [
      '经典瑞士杠杆式擒纵轮设计，镂空极轻以降低惯性损耗',
      '工作表面达到光学级镜面粗糙度，确保与红宝石瓦的无油顺滑滑动',
    ],
  },

  pallet_fork: {
    id: 'pallet_fork',
    name: '擒纵叉（锚形叉体与红宝石瓦）',
    enName: 'Pallet Fork & Ruby Stones',
    category: '擒纵机构 (Escapement)',
    specs: [
      { label: '叉角摆角', value: '约 ±10°~12° 往复摆动' },
      { label: '红宝石瓦', value: '进瓦 (Entry) 与 出瓦 (Exit) 2 颗' },
      { label: '防震安全', value: '安全钉 (Dart) 与叉口角' },
      { label: '限位机制', value: '双侧对称限位钉 (Banking Pins)' },
    ],
    summary: '机械表的控制中枢，如节拍器般左右摆动，依次锁止与释放擒纵轮，并向摆轮传递冲量。',
    principle:
      '摆轮上的圆盘钉进入叉槽撞击叉身，带动擒纵叉翻转解锁擒纵轮；擒纵轮齿随即斜推宝石瓦，反向推力经由叉身推向圆盘钉，赋予摆轮下一次摆动所需的动力，随后另一侧瓦宝石牢牢锁住下一个轮齿。',
    highlights: [
      '天然色泽艳丽的合成刚玉（红宝石）瓦，硬度高达莫氏 9 级',
      '极轻微的微米级间隙，容差极低，是制表工匠调校的核心技术',
    ],
  },

  balance_wheel: {
    id: 'balance_wheel',
    name: '摆轮系统',
    enName: 'Balance Wheel Assembly',
    category: '调速机构 (Regulating Organ)',
    specs: [
      { label: '振动频率', value: '2.5 Hz (18,000 次/小时，经典节拍)' },
      { label: '标准摆幅', value: '270° ~ 300° 优雅大摆幅' },
      { label: '配重螺钉', value: 'Glucydur 环形边缘金质微调配重螺钉' },
      { label: '摆轴材质', value: '高碳淬火钢，两端抛光微小轴尖' },
    ],
    summary: '机械腕表的“物理时间守护者”，利用简谐振动的等时性原理，决定了腕表走时的绝对精准度。',
    principle:
      '类似于单摆，摆轮拥有恒定的转动惯量 $I$。在游丝弹性恢复力矩 $k$ 的作用下，摆轮以固有角频率 $\\omega = \\sqrt{k/I}$ 进行极其规律的往复旋转，使时间被均匀切割成等长的小片段。',
    highlights: [
      '经典三臂 Glucydur 合金摆轮，热膨胀系数近乎为零',
      '外缘镶嵌精细配重螺丝，确保摆轮质心绝对对称平衡',
    ],
  },

  hairspring: {
    id: 'hairspring',
    name: '游丝（阿基米德螺旋弹簧）',
    enName: 'Balance Spring / Hairspring',
    category: '调速机构 (Regulating Organ)',
    specs: [
      { label: '厚度', value: '约 0.02 毫米 (比人类头发丝更细)' },
      { label: '圈数', value: '12 ~ 14 圈等距同心螺线' },
      { label: '材质与工艺', value: '烤蓝抗磁弹簧钢 / 宝玑末卷弯曲' },
      { label: '作用力', value: '提供精确线性恢复扭矩' },
    ],
    summary: '赋予摆轮生命弹性的微型螺旋弹簧，像肺叶般有节奏地舒张与收缩，主宰机械腕表的生命律动。',
    principle:
      '内端固定在摆轴内桩，外端固定于摆轮夹板的外桩。当摆轮偏离平衡位置，游丝被拧紧或拉开，产生与偏转角成正比的恢复力矩，将摆轮拉回平衡点，形成永无止境的精准谐振。',
    highlights: [
      '深邃湛蓝的烤蓝高温氧化膜，既防止锈蚀又具有迷人色泽',
      '高精密阿基米德螺旋线数学构型，伸缩过程始终保持同心扩张',
    ],
  },

  incabloc: {
    id: 'incabloc',
    name: '因加百录避震器 (Incabloc)',
    enName: 'Incabloc Shock Absorber',
    category: '防震与轴承保护 (Shock Protection)',
    specs: [
      { label: '弹簧构型', value: '经典金色七弦琴形 Lyre 弹簧' },
      { label: '双宝石结构', value: '通孔带油槽轴眼 + 浮动盖石 (Cap Jewel)' },
      { label: '位移缓冲', value: '轴向与径向三维微量弹性避震' },
      { label: '材质', value: '合成红宝石 + 铍铜镀金弹簧' },
    ],
    summary: '保护最脆弱的摆轴轴尖免于摔落断裂的微型工程奇迹，机械表能日常佩戴的救星。',
    principle:
      '摆轴轴尖直径仅约 0.07 毫米，极易因撞击断裂。避震器将轴承宝石置于可微量位移的斜锥基座中，由七弦琴弹簧弹性压紧。一旦受到外力冲击，宝石座顺着锥面滑动，让坚固的轴肩吸收冲击力，随后弹簧瞬间将宝石复位归中。',
    highlights: [
      '辨识度极高的金色琴形弹簧卡扣，顶级机芯的标志性细节',
      '两层高通透红宝石叠加，中间储存特种微量润滑油',
    ],
  },

  regulator: {
    id: 'regulator',
    name: '快慢针系统 (Regulator Index)',
    enName: 'Regulator Index & Stud Carrier',
    category: '微调校准机构 (Adjustment Mechanism)',
    specs: [
      { label: '调节原理', value: '改变游丝工作有效长度' },
      { label: '刻度指示', value: '+/- 微调游标指示标尺' },
      { label: '活动范围', value: '微调范围约每天 ±30 秒' },
      { label: '材质', value: '淬火弹簧钢配高光打磨' },
    ],
    summary: '制表师调校走时快慢的“手柄”，无需拆解即可微量改变振动周期。',
    principle:
      '快慢针上的两个防夹柱夹住游丝的最外圈。拨动快慢针，两柱的位置改变，游丝能够自由振动的有效工作长度随之改变：缩短游丝使摆动变快（+），拉长游丝使摆动变慢（-）。',
    highlights: [
      '指针尖端指向机芯夹板上的激光镌刻 +/- 刻度',
      '配备精细螺杆实现微米级无级微调',
    ],
  },

  train_bridge: {
    id: 'train_bridge',
    name: '轮系夹板',
    enName: 'Train Wheel Bridge',
    category: '结构支撑基体 (Bridges & Plates)',
    specs: [
      { label: '表面打磨', value: '日内瓦波纹 (Côtes de Genève) + 倒角抛光' },
      { label: '宝石孔位', value: '精准镶嵌 3 颗二轮、三轮、秒轮红宝石' },
      { label: '紧固方式', value: '3 枚高光烤蓝沉头螺丝' },
      { label: '基材', value: '德银 (Maillechort) 表面镀铑处理' },
    ],
    summary: '固定二轮、三轮、四轮上轴颈的精密桥梁，确保齿轮轴线维持在亚微米级的平行度。',
    principle:
      '与主夹板上下夹持，通过定位销与精密螺丝紧固。内部精心铣削有不同深度的凹腔以容纳齿轮交错重叠运转，边缘施以 45° 手工镜面倒角（Anglage），反射出迷人的棱角锋芒。',
    highlights: [
      '顶级制表标准的大面积日内瓦波纹饰面',
      '倒角处经木髓棒手工抛光至镜面效果',
    ],
  },

  barrel_bridge: {
    id: 'barrel_bridge',
    name: '发条夹板',
    enName: 'Barrel Bridge',
    category: '结构支撑基体 (Bridges & Plates)',
    specs: [
      { label: '支撑构件', value: '发条盒上轴承与大钢轮止逆机构' },
      { label: '打磨工艺', value: '日内瓦波纹 + 沉孔倒角 (Chamfered Sinks)' },
      { label: '紧固方式', value: '2 枚加粗高扭矩烤蓝钢螺丝' },
    ],
    summary: '承受机芯最大机械力矩的坚固堡垒，牢牢镇压发条盒与上链组件的巨大张力。',
    principle:
      '发条完全上紧时产生巨大的径向与轴向拉力。发条夹板采用加厚高刚性基体制造，不仅稳固发条盒中心轴，也为大钢轮、小钢轮与止逆棘爪提供牢固的旋转安装轴颈。',
    highlights: [
      '与轮系夹板接缝严丝合缝，波纹方向精确延续',
      '螺丝沉头孔进行内倒角高光镜面抛光',
    ],
  },

  balance_cock: {
    id: 'balance_cock',
    name: '摆轮夹板 (摆夹板)',
    enName: 'Balance Cock',
    category: '结构支撑基体 (Bridges & Plates)',
    specs: [
      { label: '悬臂结构', value: '单边悬臂式坚固桥板' },
      { label: '顶部搭载', value: '因加百录避震总成与快慢针游标' },
      { label: '刻字装饰', value: '摆轮振频与微调 +/- 刻度金字刻纹' },
    ],
    summary: '机芯上最具仪式感的核心夹板，单独拱卫着跳动的摆轮与游丝。',
    principle:
      '作为单侧固定的悬臂梁，必须保证极高的抗震稳定性。其末端正上方安装避震器红宝石与快慢针，下方设有游丝外桩固定座，悬空跨越在摆轮上方，给予摆轮充分旋转的开阔空间。',
    highlights: [
      '优美的鹅颈式曲线轮廓，传统高级制表的点睛之笔',
      '装配有手工倒角的快慢针指针与微调偏心螺丝',
    ],
  },

  mainplate: {
    id: 'mainplate',
    name: '机芯主夹板 (底板)',
    enName: 'Movement Mainplate',
    category: '机芯基石 (Foundation Plate)',
    specs: [
      { label: '打磨工艺', value: '全手工重叠鱼鳞纹 (Perlage)' },
      { label: '加工精度', value: '五轴数控精密雕铣，孔位公差 < 2 微米' },
      { label: '功能孔位', value: '集成发条槽、轮系凹槽、擒纵槽与宝石沉孔' },
      { label: '材质', value: '耐磨高致密德银 / 镍黄铜镀铑' },
    ],
    summary: '整枚腕表机芯的绝对“地基”，所有齿轮轴、夹板、螺丝与宝石轴承全部精确坐落于此。',
    principle:
      '主夹板是所有几何基准的源头。其正反面分别雕刻出复杂的齿轮下沉阶梯凹腔，所有旋转轴心与定位销孔以微米级精度对齐，确保数十个高速运转的零件相互啮合时分毫不差。',
    highlights: [
      '密布着重叠交错的鱼鳞状圆形珍珠纹打磨，折射出璀璨如繁星般的光点',
      '所有宝石座圈均经过抛光倒角防油溢出处理',
    ],
  },

  jewels: {
    id: 'jewels',
    name: '红宝石轴承系统',
    enName: 'Synthetic Ruby Bearings & Gold Chatons',
    category: '低摩擦轴承系统 (Jewel Bearings)',
    specs: [
      { label: '轴承材质', value: '合成单晶红刚玉 ($Al_2O_3$)' },
      { label: '莫氏硬度', value: '9 级 (仅次于天然钻石)' },
      { label: '固定方式', value: '高级黄金套筒 (Gold Chatons) 嵌合' },
      { label: '摩擦系数', value: '钢-红宝石在微量油润滑下 $\\mu < 0.05$' },
    ],
    summary: '机械机芯抗磨损的常青之钥，晶莹剔透的人造红宝石为各级转轴提供永久耐磨的光滑轴孔。',
    principle:
      '齿轮轴尖在极小面积上承受持续侧压力与高频转动。若直接装在金属孔中，几周内金属粉屑就会导致停走。红宝石极其坚硬且分子极为致密，不仅永不磨损，还能持久维持微量润滑油滴的油膜张力。',
    highlights: [
      '深邃艳丽的鸽血红通透材质，在灯光下如同一颗颗点缀的红宝石星辰',
      '周围镶嵌抛光黄金套筒并由蓝钢螺丝固定，致敬古董怀表传世工艺',
    ],
  },

  blued_screws: {
    id: 'blued_screws',
    name: '烤蓝钢螺丝',
    enName: 'Heat-Blued Steel Screws',
    category: '紧固件与装饰工艺 (Fasteners & Finishing)',
    specs: [
      { label: '工艺温度', value: '恒温约 290°C ~ 300°C 氧化发蓝' },
      { label: '表面光泽', value: '矢车菊蔚蓝 (Cornflower Blue) 镜面反射' },
      { label: '槽口打磨', value: '螺丝一字槽两侧边缘手工倒角镜面打磨' },
      { label: '防腐性能', value: '致密的四氧化三铁钝化保护膜' },
    ],
    summary: '瑞士高级制表最具辨识度的灵魂印记，兼具高抗腐蚀性能与摄人心魄的机械美感。',
    principle:
      '先将高碳钢螺丝端面与一字槽进行极其苛刻的高光平整镜面抛光，然后置于加热铜盘上缓慢升温。当钢材表面氧化层厚度达到约 45 纳米时，光波干涉呈现出纯净深邃的皇家宝蓝色。',
    highlights: [
      '非化学染色涂层，而是纯物理热处理形成的纳米级氧化光学干涉薄膜',
      '每枚螺丝在不同光照角度下呈现由深邃午夜蓝到亮天蓝的渐变流动',
    ],
  },
};

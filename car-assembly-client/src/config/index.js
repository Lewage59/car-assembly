export const CODE_OK = 0;

export const letter = [
    'A', 'B', 'C', 'D', 'E', 'F', 
    'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 
    'S', 'T', 'U', 'V', 'W', 'X', 
    'Y', 'Z'
];

// 各部件显示参数键值映射
export const partsKeyToText = {
    basicParam: {
        level: '级别',
        bodyStructure: '车身结构',
        maxSpeed: '最高车速',
        engine: '发动机',
        gearbox: '变速箱',
        guidePrice: '厂商指导价(元)',
        gxbFuelConsumption: '工信部综合油耗(L/100km)',
        id: '基本参数ID',
        lwh: '长*宽*高(mm)',
        measureBrake: '实测100-0km/h制动(m)',
        measureFuelConsumption: '实测油耗(L/100km)',
        measureGroundClearance: '实测离地间隙(mm)',
        measureSpeed: '实测0-100km/h加速(s)',
        modelId: '车型ID',
        officialSpeed: '官方0-100km/h加速(s)',
        vehicleWarranty: '整车质保',
        vendor: '厂商'
    }, 
    chassis: {
        assistType: '助力类型',
        bodyStructure: '车体结构',
        centralStructure: '中央差速器结构',
        driveMethod: '驱动方式',
        frontSuspensionType: '前悬架类型',
        id: '底盘转向ID',
        modelId: '车型ID',
        rearSuspensionType: '后悬架类型',
        wheelShape: '四驱形式'
    }, 
    gearbox: {
        abbreviation: '简称',
        gearNum: '挡位个数',
        gearboxType: '变速箱类型',
        id: '变速箱ID',
        modelId: '车型ID'
    },
    inconfig: {
        abs: 'ABS防抱死',
        airSuspension: '空气悬架',
        autoParking: '自动驻车',
        brakeAssist: '刹车辅助',
        brakeForce: '制动力分配',
        electricSunroof: '电动天窗',
        externalAudioInterface: '外接音源接口',
        highBeam: '远光灯',
        id: '内置配置ID',
        lowBeam: '近光灯',
        mediaSystem: '多媒体系统',
        modelId: '车型ID',
        panoramicSkylight: '全景天窗',
        speakerBrand: '扬声器品牌',
        speakerNum: '扬声器数量',
        sportAppearanceKit: '运动外观套件',
        stableCtl: '车身稳定控制',
        steepSlop: '陡坡缓降',
        tractionCtl: '牵引力控制',
        turnHeadlight: '转向头灯',
        uphillAssist: '上坡辅助',
        variableSteerRatio: '可变转向比',
        variableSuspension: '可变悬架'
    },
    safety: {
        centralLock: '车内中控锁',
        childSeatInterface: '儿童座椅接口',
        driverSeatAirbag: '主/副驾驶座安全气囊',
        engineAntiTheft: '发动机电子防盗',
        headAirbag: '前/后排头部气囊(气帘)',
        id: '安全装备ID',
        keylessEntry: '无钥匙进入系统',
        keylessStart: '无钥匙启动系统',
        lapAirbag: '膝部气囊',
        modelId: '车型ID',
        remoteKey: '遥控钥匙',
        seatBeltReminder: '安全带未系提示',
        sideAirbag: '前/后排侧气囊',
        tireMonitor: '胎压监测装置',
        zeroTireDriving: '零胎压继续行驶'
    }, 
    engine: {
        bore: '缸径(mm)',
        compressionRatio: '压缩比',
        cylinderArrangement: '气缸排列形式',
        cylinderBodyMaterial: '缸体材料',
        cylinderHeadMaterial: '缸盖材料',
        cylinderNum: '气缸数(个)',
        cylinderValveNum: '每缸气门数(个)',
        displacementL: '排量L',
        displacementMl: '排量ML',
        engineType: '发动机型号',
        envStandard: '环保标准',
        fuelForm: '燃料形式',
        fuelLabel: '燃油标号',
        fuelSupply: '供油方式',
        gasStructure: '配气结构',
        id: '发动机ID',
        intakeForm: '进气形式',
        maxHorsepower: '最大马力(Ps)',
        maxPower: '最大功率(kW)',
        maxPowerSpeed: '最大功率转速(rpm)',
        maxTorque: '最大扭矩(N·m)',
        maxTorqueSpeed: '最大扭矩转速(rpm)',
        modelId: '车型ID',
        specificTechnology: '发动机特有技术',
        stroke: '行程(mm)'
    }, 
    wheel: {
        frontBrakeType: '前制动器类型',
        frontTiresStandard: '前轮胎规格',
        id: '车轮/制动ID',
        modelId: '车型ID',
        parkBrakeType: '驻车制动类型',
        rearBrakeType: '后制动器类型',
        rearTiresStandard: '后轮胎规格',
        spareTiresStandard: '备胎规格'
    }
};

// 车辆模型类型
export const carType = [
    {
        key: '不限',
        value: 0
    }, {
        key: '轿车',
        value: '型车'
    }, {
        key: 'SUV',
        value: 'SUV'
    }, {
        key: 'MPV',
        value: 'MPV'
    }, {
        key: '跑车',
        value: '跑车'
    }, {
        key: '皮卡',
        value: '皮卡'
    }, {
        key: '微面',
        value: '微面'
    }, {
        key: '微卡',
        value: '微卡'
    }, {
        key: '轻客',
        value: '轻客'
    }
];
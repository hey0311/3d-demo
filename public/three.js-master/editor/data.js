var echart_show_old=0;//0 温度 1 锯切
var echart_show=0;//0 温度 1 锯切
var reyaModelMap = [{
    objName: 'Obj3d66_582169_127_839',
    mes: 'inTemp',
    mesName: '入口温度'
}, {
    objName: 'Obj3d66_582169_127_838',
    mes: 'centerTemp',
    mesName: '中部温度'
}, {
    objName: 'Obj3d66_582169_127_837',
    mes: 'outTemp',
    mesName: '出口温度'
}];
var jqModelMap = [{
    objName: '��007',
    mes: 'crossGive',
    mesName: '纵进给速度'
}, {
    objName: '��006',
    mes: 'crossBack',
    mesName: '纵回程速度'
}, {
    objName: '��005',
    mes: 'rowGive',
    mesName: '横进给速度'
},{
    objName: '��004',
    mes: 'rowBack',
    mesName: '横回程速度'
}];
var now = new Date();
var data = {
    inTemp: [{
        name: now.toString(),
        value: [
            now,
            Math.random() * 100
        ],
        formatValue: Math.random() * 100
    }],
    centerTemp: [{
        name: now.toString(),
        value: [
            now,
            Math.random() * 100
        ],
        formatValue: Math.random() * 100
    }],
    outTemp: [{
        name: now.toString(),
        value: [
            now,
            Math.random() * 100
        ],
        formatValue: Math.random() * 100
    }]
};
var data_jq = {
    crossGive: [{
        name: now.toString(),
        value: [
            now,
            Math.random() * 30
        ],
        formatValue: Math.random() * 30
    }],
    crossBack: [{
        name: now.toString(),
        value: [
            now,
            Math.random() * 30
        ],
        formatValue: Math.random() * 30
    }],
    rowGive: [{
        name: now.toString(),
        value: [
            now,
            Math.random() * 30
        ],
        formatValue: Math.random() * 30
    }],
    rowBack: [{
        name: now.toString(),
        value: [
            now,
            Math.random() * 30
        ],
        formatValue: Math.random() * 30
    }]
};
var selectMesName = '入口温度';
var intervalTime = 1000;
var mesName = '入口温度';
var mesName_jq = '纵锯进给速度';
var mes = 'inTemp';
var mes_jq = 'rowGive';
var stand={
    inTemp:120,
    centerTemp:180,
    outTemp:80
};
var stand_jq={
    crossGive:30,
    crossBack:35,
    rowGive:32,
    rowBack:40
};
var myChart = echarts.init(document.getElementById('echart-container'));
var myChart2 = echarts.init(document.getElementById('info-container'));

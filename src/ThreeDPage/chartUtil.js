/* eslint-disable */
import echarts from 'echarts'
export const renderChart=()=>{
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
    var option_main = {
        backgroundColor:'rgba(128, 128, 128, 0)',
        title: {
            text: '热压设备温度监测',
            textStyle:{
                fontSize:24,
                color:'#fff'
            }
        },
        grid:{
            left:'15%'
        },
        xAxis: {
            type: 'category',
            data: ['入口温度', '中部温度', '出口温度'],
            axisLabel:{
                fontSize:16,
                color:'#fff'
            },
            axisLine:{
                lineStyle:{
                    color:'#fff'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}度',
                fontSize:16,
                color:'#fff'
            },
            splitLine:{
                show:false
            },
            axisLine:{
                lineStyle:{
                    color:'#fff'
                }
            }
        },
        series: [{
            data: [{
                value: data.inTemp[data.inTemp.length - 1].value[1],
                itemStyle: {
                    /*                normal: {
                                        color: getColor(data.inTemp[data.inTemp.length - 1].formatValue)
                                    }*/
                    normal: {
                        color: {
                            "type": "linear",
                            "x": 0,
                            "y": 0,
                            "x2": 0,
                            "y2": 1,
                            "colorStops": [
                                {
                                    "offset": 0,
                                    "color": "rgba(255,37,117,0.7)"
                                },
                                {
                                    "offset": 0.5,
                                    "color": "rgba(0,133,245,0.7)"
                                },
                                {
                                    "offset": 1,
                                    "color": "rgba(0,133,245,0.3)"
                                }
                            ],
                            "globalCoord": false
                        }
                    }
                }
            }, {
                value: data.centerTemp[data.centerTemp.length - 1].value[1],
                itemStyle: {
                    normal: {
                        color: getColor(data.centerTemp[data.centerTemp.length - 1].formatValue)
                    }
                }

            }, {
                value: data.outTemp[data.outTemp.length - 1].value[1],
                itemStyle: {
                    normal: {
                        color: getColor(data.outTemp[data.outTemp.length - 1].formatValue)
                    }
                }

            }],
            type: 'bar'
        }]
    };
    var option_child = {
        backgroundColor:'rgba(128, 128, 128, 0)',
        title: {
            text: '温度',
            textStyle:{
                fontSize:24,
                color:'#fff'
            }
        },
        grid:{
            left:'15%'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                var date = new Date(params.name);
                return date.getHours() + ':' + (date.getMinutes() + 1) + ':' + date.getSeconds() + '---' + params.value[1].toFixed(2);
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            },
            axisLabel:{
                fontSize:16
            },
            axisLine:{
                lineStyle:{
                    color:'#fff'
                }
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: '{value}度',
                fontSize:16,
                color:'#fff'
            },
            axisLine:{
                lineStyle:{
                    color:'#fff'
                }
            }
        },
        visualMap: {
            top: 10,
            right: 10,
            textGap:5,
            itemWidth:15,
            show:true,
            textStyle:{
                color:'#fff'
            },
            orient:'horizontal',
            left:'center',
            pieces: [
                {
                    gt: 0,
                    lte: 100,
                    color: 'lightskyblue'
                }, {
                    gt: 100,
                    lte: 120,
                    color: '#ffff00'
                },
                {
                    gt: 120,
                    color: '#ff0000'
                }
            ],
        },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            markLine: {
                data: [{
                    name: '标准值',
                    yAxis:stand[mes],
                    label: {
                        show: true,
                        position: 'end'
                    }
                }]
            },
            data: data[mes]
        }]
    };
    var option_jq_main = {
        backgroundColor:'rgba(128, 128, 128, 0)',
        title: {
            text: '锯切速度监测',
            textStyle:{
                fontSize:24,
                color:'#fff'
            }
        },
        grid:{
            left:'15%'
        },
        xAxis: {
            type: 'category',
            data: ['纵进给速度', '纵回程速度', '横进给速度','横回程速度'],
            axisLabel:{
                fontSize:16,
                interval:0,
                color:'#fff'
            },
            axisLine:{
                lineStyle:{
                    color:'#fff'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}',
                fontSize:16,
                color:'#fff'
            },
            splitLine: {
                show: false
            },
            axisLine:{
                lineStyle:{
                    color:'#fff'
                }
            }
        },
        series: [{
            data: [{
                value: data_jq.crossGive[data_jq.crossGive.length - 1].value[1],
                itemStyle: {
                    normal: {
                        color: getColor(data_jq.crossGive[data_jq.crossGive.length - 1].formatValue)
                    }
                }
            }, {
                value: data_jq.crossBack[data_jq.crossBack.length - 1].value[1],
                itemStyle: {
                    normal: {
                        color: getColor(data_jq.crossBack[data_jq.crossBack.length - 1].formatValue)
                    }
                }

            }, {
                value: data_jq.rowGive[data_jq.rowGive.length - 1].value[1],
                itemStyle: {
                    normal: {
                        color: getColor(data_jq.rowGive[data_jq.rowGive.length - 1].formatValue)
                    }
                }

            },{
                value: data_jq.rowBack[data_jq.rowBack.length - 1].value[1],
                itemStyle: {
                    normal: {
                        color: getColor(data_jq.rowBack[data_jq.rowBack.length - 1].formatValue)
                    }
                }
            }],
            type: 'bar'
        }]
    };
    var option_jq_child = {
        backgroundColor:'rgba(128, 128, 128, 0)',
        title: {
            text: '温度',
            textStyle:{
                fontSize:24,
                color:'#fff'
            }
        },
        grid:{
            left:'15%'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                var date = new Date(params.name);
                return date.getHours() + ':' + (date.getMinutes() + 1) + ':' + date.getSeconds() + '---' + params.value[1].toFixed(2);
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            },
            axisLabel:{
                fontSize:16,
                color:'#fff'
            },
            axisLine:{
                lineStyle:{
                    color:'#fff'
                }
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: '{value}',
                fontSize:16,
                color:'#fff'
            },
            axisLine:{
                lineStyle:{
                    color:'#fff'
                }
            }
        },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            markLine: {
                data: [{
                    name: '标准值',
                    yAxis:stand_jq[mes_jq],
                    label: {
                        show: true,
                        position: 'end'
                    }
                }]
            },
            data: data_jq[mes_jq]
        }]
    };


    /*myChart2.setOption(option_jq_child);
    myChart.on('click', function (params) {
        console.log(params.name);
        var objName;
        for (var j = 0; j < reyaModelMap.length; j++) {
            if (params.name === reyaModelMap[j].mesName) {
                objName = reyaModelMap[j].objName;
                mes = reyaModelMap[j].mes;
                showChildChart = true;
                selectMesName = reyaModelMap[j].mesName;
            }
        }
        if (obj) {
            for (var i = 0; i < obj.children.length; i++) {
                if (obj.children[i].name === objName) {
                    editor.focus(obj.children[i]);
                }
            }
        }
    });*/

//首次加载温度图
    myChart.setOption(option_main);
    myChart2.setOption(option_child);
//hy todo
    myChart.on('click', function (params) {
        chartClickFun(reyaModelMap,params)
    });
    function setWarning(obj, value) {
        if (value <= 80) {
            if (obj.oriMaterial) {
                editor.setObjectMaterial(obj, null, obj.oriMaterial);
                editor.signals.materialChanged.dispatch();
                return;
            } else {
                return;
            }
        }
        var material = new THREE.MeshBasicMaterial({
            color: getColor(value),
            name: 'material-1',
            opacity: 1
        });
        if (!obj.oriMaterial) {
            obj.oriMaterial = editor.getObjectMaterial(obj);
        }
        editor.setObjectMaterial(obj, null, material);
        editor.signals.materialChanged.dispatch();
    }

    var growItem={
        inTemp:0.7,
        centerTemp:0.7,
        outTemp:0.7,
        crossGive:0.7,
        crossBack:0.7,
        rowGive:0.7,
        rowBack:0.7
    };

    function randomData(values, type) {
        now = new Date(+now + 1000);
        var random = Math.random();
        var value = 0;
        var standard,up,down;
        var formatValue;
        switch(type){
            case 'inTemp':
                process(growItem[type],120,2,-2,5);
                formatValue = value / 1.2;
                break;
            case 'centerTemp':
                process(growItem[type],180,2,-2,5);
                formatValue = value / 1.8;
                break;
            case 'outTemp':
                process(growItem[type],80,2,-2,5);
                formatValue = value / 0.8;
                break
            case 'crossGive':
                process(growItem[type],30,2,-2,2);
                formatValue = value / 0.3;
                break
            case 'crossBack':
                process(growItem[type],35,2,-2,2);
                formatValue = value / 0.35;
                break
            case 'rowGive':
                process(growItem[type],32,2,-2,2);
                formatValue = value / 0.32;
                break
            case 'rowBack':
                process(growItem[type],40,2,-2,2);
                formatValue = value / 0.4;
                break
        }
        function process(growItem,standard,up,down,radio) {
            if (values[values.length - 1].value[1] >standard) {
                growItem = growItem - 0.1;
                if (growItem < down) {
                    growItem = down;
                }
            } else if (values[values.length - 1].value[1] <= standard) {
                growItem = growItem + 0.1;
                if (growItem > up) {
                    growItem = up;
                }
            }
            if (random > growItem) {
                value = values[values.length - 1].value[1] - random * radio;
            } else {
                value = values[values.length - 1].value[1] + random * radio;
            }
        }
        return {
            name: now.toString(),
            value: [
                now,
                value
            ],
            formatValue: formatValue
        }
    }
    function getColor(value) {
        if (value <= 80) {
            return '#00acee';
        } else if (value > 80 && value < 100) {
            return '#ffff00';
        } else {
            return '#ff0000';
        }
    }
    function chartClickFun(map,params) {
        var objName;
        for (var j = 0; j < map.length; j++) {
            if (params.name === map[j].mesName) {
                objName = map[j].objName;
                if(echart_show==0){
                    mes = map[j].mes;
                }else{
                    mes_jq = map[j].mes;
                }
                showChildChart = true;
                selectMesName = map[j].mesName;
            }
        }
        if (obj) {
            for (var i = 0; i < obj.children.length; i++) {
                if (obj.children[i].name === objName) {
                    editor.focus(obj.children[i]);
                }
            }
        }
    }
/*    setInterval(function () {
        //构造数据
        if(data.inTemp.length>50){
            data.inTemp=data.inTemp.slice(1,data.inTemp.length);
        }
        data.inTemp.push(randomData(data.inTemp, 'inTemp'));
        if(data.centerTemp.length>50){
            data.centerTemp=data.centerTemp.slice(1,data.centerTemp.length);
        }
        data.centerTemp.push(randomData(data.centerTemp, 'centerTemp'));
        if(data.outTemp.length>50){
            data.outTemp=data.outTemp.slice(1,data.outTemp.length);
        }
        data.outTemp.push(randomData(data.outTemp, 'outTemp'));
        if(data_jq.crossGive.length>50){
            data_jq.crossGive=data_jq.crossGive.slice(1,data_jq.crossGive.length);
        }
        data_jq.crossGive.push(randomData(data_jq.crossGive, 'crossGive'));
        if(data_jq.crossBack.length>50){
            data_jq.crossBack=data_jq.crossBack.slice(1,data_jq.crossBack.length);
        }
        data_jq.crossBack.push(randomData(data_jq.crossBack, 'crossBack'));
        if(data_jq.rowGive.length>50){
            data_jq.rowGive=data_jq.rowGive.slice(1,data_jq.rowGive.length);
        }
        data_jq.rowGive.push(randomData(data_jq.rowGive, 'rowGive'));
        if(data_jq.rowBack.length>50){
            data_jq.rowBack=data_jq.rowBack.slice(1,data_jq.rowBack.length);
        }
        data_jq.rowBack.push(randomData(data_jq.rowBack, 'rowBack'));
        if (echart_show !== echart_show_old) {
            if (myChart) {
                myChart.off('click');
                myChart.dispose();
            }
            if(myChart2){
                myChart2.off('click');
                myChart2.dispose();
            }
            echart_show_old=echart_show;
            myChart = echarts.init(document.getElementById('echart-container'));
            myChart2 = echarts.init(document.getElementById('info-container'));
            if(echart_show==0){
                myChart.setOption(option_main);
                myChart2.setOption(option_child);
                myChart.on('click', function (params) {
                    chartClickFun(reyaModelMap,params)
                });
            }else{
                myChart.setOption(option_jq_main);
                myChart2.setOption(option_jq_child);
                myChart.on('click', function (params) {
                    chartClickFun(jqModelMap,params)
                });
            }
        }else{
            if(echart_show==0){
                myChart.setOption({
                    series: [{
                        data: [{
                            value: data.inTemp[data.inTemp.length - 1].formatValue,
                            itemStyle: {
                                /!*                            normal: {
                                                                color: getColor(data.inTemp[data.inTemp.length - 1].formatValue)
                                                            }*!/
                                normal: {
                                    barBorderRadius: [15,15,0,0],
                                    color: {
                                        "type": "linear",
                                        "x": 0,
                                        "y": 0,
                                        "x2": 0,
                                        "y2": 1,
                                        "colorStops": [
                                            {
                                                "offset": 0,
                                                "color": getColor(data.inTemp[data.inTemp.length - 1].formatValue)
                                            },
                                            {
                                                "offset": 1,
                                                "color": "rgba(0,133,245,0.7)"
                                            }
                                        ],
                                        "globalCoord": false
                                    }
                                }
                            }
                        }, {
                            value: data.centerTemp[data.centerTemp.length - 1].formatValue,
                            itemStyle: {
                                /!*                            normal: {
                                                                color: getColor(data.centerTemp[data.centerTemp.length - 1].formatValue)
                                                            }*!/
                                normal: {
                                    barBorderRadius: [15,15,0,0],
                                    color: {
                                        "type": "linear",
                                        "x": 0,
                                        "y": 0,
                                        "x2": 0,
                                        "y2": 1,
                                        "colorStops": [
                                            {
                                                "offset": 0,
                                                "color": getColor(data.centerTemp[data.centerTemp.length - 1].formatValue)
                                            },
                                            {
                                                "offset": 1,
                                                "color": "rgba(0,133,245,0.7)"
                                            }
                                        ],
                                        "globalCoord": false
                                    }
                                }
                            }

                        }, {
                            value: data.outTemp[data.outTemp.length - 1].formatValue,
                            itemStyle: {
                                /!*                            normal: {
                                                                color: getColor(data.outTemp[data.outTemp.length - 1].formatValue)
                                                            }*!/
                                normal: {
                                    barBorderRadius: [15,15,0,0],
                                    color: {
                                        "type": "linear",
                                        "x": 0,
                                        "y": 0,
                                        "x2": 0,
                                        "y2": 1,
                                        "colorStops": [
                                            {
                                                "offset": 0,
                                                "color": getColor(data.outTemp[data.outTemp.length - 1].formatValue)
                                            },
                                            {
                                                "offset": 1,
                                                "color": "rgba(0,133,245,0.7)"
                                            }
                                        ],
                                        "globalCoord": false
                                    }
                                }
                            }

                        }],
                        type: 'bar'
                    }]
                });
                myChart2.setOption({
                    title: {
                        text: selectMesName
                    },
                    visualMap: {
                        top: 10,
                        right: 10,
                        textGap:5,
                        itemWidth:15,
                        show:true,
                        textStyle:{
                            color:'#fff'
                        },
                        orient:'horizontal',
                        left:'right',
                        pieces: [
                            {
                                gt: 0,
                                lte: stand[mes]-20,
                                color: 'lightskyblue'
                            }, {
                                gt: stand[mes]-20,
                                lte: stand[mes],
                                color: '#ffff00'
                            },
                            {
                                gt: stand[mes],
                                color: '#ff0000'
                            }
                        ],
                    },
                    series: [{
                        data: data[mes],
                        markLine: {
                            data: [{
                                name: '标准值',
                                yAxis:stand[mes],
                                label: {
                                    show: true,
                                    position: 'end'
                                }
                            }]
                        }
                    }],
                });

            }else{
                myChart.setOption({
                    series: [{
                        data: [{
                            value: data_jq.crossGive[data_jq.crossGive.length - 1].value[1],
                            itemStyle: {
                                /!*                            normal: {
                                                                color: getColor(data_jq.crossGive[data_jq.crossGive.length - 1].formatValue)
                                                            }*!/
                                normal: {
                                    barBorderRadius: [15,15,0,0],
                                    color: {
                                        "type": "linear",
                                        "x": 0,
                                        "y": 0,
                                        "x2": 0,
                                        "y2": 1,
                                        "colorStops": [
                                            {
                                                "offset": 0,
                                                "color": getColor(data_jq.crossGive[data_jq.crossGive.length - 1].formatValue)
                                            },
                                            {
                                                "offset": 1,
                                                "color": "rgba(0,133,245,0.7)"
                                            }
                                        ],
                                        "globalCoord": false
                                    }
                                }
                            }
                        }, {
                            value: data_jq.crossBack[data_jq.crossBack.length - 1].value[1],
                            itemStyle: {
                                /!*                            normal: {
                                                                color: getColor(data_jq.crossBack[data_jq.crossBack.length - 1].formatValue)
                                                            }*!/
                                normal: {
                                    barBorderRadius: [15,15,0,0],
                                    color: {
                                        "type": "linear",
                                        "x": 0,
                                        "y": 0,
                                        "x2": 0,
                                        "y2": 1,
                                        "colorStops": [
                                            {
                                                "offset": 0,
                                                "color": getColor(data_jq.crossBack[data_jq.crossBack.length - 1].formatValue)
                                            },
                                            {
                                                "offset": 1,
                                                "color": "rgba(0,133,245,0.7)"
                                            }
                                        ],
                                        "globalCoord": false
                                    }
                                }
                            }

                        }, {
                            value: data_jq.rowGive[data_jq.rowGive.length - 1].value[1],
                            itemStyle: {
                                /!*                            normal: {
                                                                color: getColor(data_jq.rowGive[data_jq.rowGive.length - 1].formatValue)
                                                            }*!/
                                normal: {
                                    barBorderRadius: [15,15,0,0],
                                    color: {
                                        "type": "linear",
                                        "x": 0,
                                        "y": 0,
                                        "x2": 0,
                                        "y2": 1,
                                        "colorStops": [
                                            {
                                                "offset": 0,
                                                "color": getColor(data_jq.rowGive[data_jq.rowGive.length - 1].formatValue)
                                            },
                                            {
                                                "offset": 1,
                                                "color": "rgba(0,133,245,0.7)"
                                            }
                                        ],
                                        "globalCoord": false
                                    }
                                }
                            }

                        },{
                            value: data_jq.rowBack[data_jq.rowBack.length - 1].value[1],
                            itemStyle: {
                                /!*                            normal: {
                                                                color: getColor(data_jq.rowBack[data_jq.rowBack.length - 1].formatValue)
                                                            }*!/
                                normal: {
                                    barBorderRadius: [15,15,0,0],
                                    color: {
                                        "type": "linear",
                                        "x": 0,
                                        "y": 0,
                                        "x2": 0,
                                        "y2": 1,
                                        "colorStops": [
                                            {
                                                "offset": 0,
                                                "color": getColor(data_jq.rowBack[data_jq.rowBack.length - 1].formatValue)
                                            },
                                            {
                                                "offset": 1,
                                                "color": "rgba(0,133,245,0.7)"
                                            }
                                        ],
                                        "globalCoord": false
                                    }
                                }
                            }
                        }],
                        type: 'bar'
                    }]
                });
                myChart2.setOption({
                    title: {
                        text: selectMesName
                    },
                    visualMap: {
                        top: 10,
                        right: 10,
                        textGap:5,
                        itemWidth:15,
                        show:true,
                        textStyle:{
                            color:'#fff'
                        },
                        orient:'horizontal',
                        left:'right',
                        pieces: [
                            {
                                gt: 0,
                                lte: stand[mes]-20,
                                color: 'lightskyblue'
                            }, {
                                gt: stand[mes]-20,
                                lte: stand[mes],
                                color: '#ffff00'
                            },
                            {
                                gt: stand[mes],
                                color: '#ff0000'
                            }
                        ],
                    },
                    series: [{
                        data: data_jq[mes_jq],
                        markLine: {
                            data: [{
                                name: '标准值',
                                yAxis:stand_jq[mes_jq],
                                label: {
                                    show: true,
                                    position: 'end'
                                }
                            }]
                        },
                    }],
                });

            }
        }
        //监控3d模型预警
        if (obj) {
            for (var i = 0; i < obj.children.length; i++) {
                for (var j = 0; j < reyaModelMap.length; j++) {
                    if (obj.children[i].name === reyaModelMap[j].objName) {
                        setWarning(obj.children[i], data[reyaModelMap[j].mes][data[reyaModelMap[j].mes].length - 1].formatValue);

                        /!*                    mes = reyaModelMap[j].mes;
                                            mesName = reyaModelMap[j].mesName;*!/
                    }
                }
                for (var j = 0; j <jqModelMap.length; j++) {
                    if (obj.children[i].name === jqModelMap[j].objName) {
                        setWarning(obj.children[i], data_jq[jqModelMap[j].mes][data_jq[jqModelMap[j].mes].length - 1].formatValue);
                        /!*                    mes_jq = jqModelMap[j].mes;
                                            mesName_jq = jqModelMap[j].mesName;*!/
                    }
                }
            }
        }
    }, 1000);*/
}
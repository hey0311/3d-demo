/* eslint-disable */
import echarts from 'echarts'
import {getColor,chartClickFun,randomData,setWarning} from "./util"
export const renderBarChart=(data)=>{
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
    var myChart = echarts.init(document.getElementById('echart-container'));
    var option = {
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
                    normal: {
                        color: getColor(data.inTemp[data.inTemp.length - 1].formatValue)
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
    myChart.setOption(option);
/*    myChart.on('click', function (params) {
        chartClickFun(reyaModelMap,params)
    });*/
}
export const renderBarChart1=()=>{
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


}
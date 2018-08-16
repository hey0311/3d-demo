/* eslint-disable */
import echarts from 'echarts'
import {getColor} from "./util"
const axisFontSize=16;
const chartTitleSize=20;
const chartBkColor='rgba(128, 128, 128, 0)';
export const renderBarChart=(chartId,data,threeConfig,modelMap,title)=>{
    var myChart = echarts.init(document.getElementById(chartId));
    let sdata=[],xAxisData=[];
    for(let key in data){
        sdata.push({
            value:data[key][data[key].length-1].value[1],
            itemStyle:{
                normal:{
                    color:getColor(data[key][data[key].length-1].formatValue)
                }
            }
        });
        modelMap.map((m)=>{
            if(m.mes===key){
                xAxisData.push(m.mesName)
            }
        })
    }

    var option = {
        backgroundColor:chartBkColor,
        title: {
            text: title,
            textStyle:{
                fontSize:chartTitleSize,
                color:'#fff'
            }
        },
        grid:{
            left:'15%'
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
            axisLabel:{
                fontSize:axisFontSize,
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
                fontSize:axisFontSize,
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
            data: sdata,
            type: 'bar'
        }]
    };
    myChart.setOption(option);
    myChart.on('click', function (params) {
        threeConfig.chartItemClickedFn(params.name);
    });
}
export const renderLineChart=(chartId,data,mes,modelMap,title,stand)=>{
    var myChart = echarts.init(document.getElementById(chartId));
    var option = {
        backgroundColor:chartBkColor,
        title: {
            text: title,
            textStyle:{
                fontSize:chartTitleSize,
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
                fontSize:axisFontSize
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
                fontSize:axisFontSize,
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
    myChart.setOption(option);
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

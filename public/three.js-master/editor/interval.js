setInterval(function () {
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
/*                            normal: {
                                color: getColor(data.inTemp[data.inTemp.length - 1].formatValue)
                            }*/
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
/*                            normal: {
                                color: getColor(data.centerTemp[data.centerTemp.length - 1].formatValue)
                            }*/
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
/*                            normal: {
                                color: getColor(data.outTemp[data.outTemp.length - 1].formatValue)
                            }*/
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
/*                            normal: {
                                color: getColor(data_jq.crossGive[data_jq.crossGive.length - 1].formatValue)
                            }*/
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
/*                            normal: {
                                color: getColor(data_jq.crossBack[data_jq.crossBack.length - 1].formatValue)
                            }*/
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
/*                            normal: {
                                color: getColor(data_jq.rowGive[data_jq.rowGive.length - 1].formatValue)
                            }*/
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
/*                            normal: {
                                color: getColor(data_jq.rowBack[data_jq.rowBack.length - 1].formatValue)
                            }*/
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

/*                    mes = reyaModelMap[j].mes;
                    mesName = reyaModelMap[j].mesName;*/
                }
            }
            for (var j = 0; j <jqModelMap.length; j++) {
                if (obj.children[i].name === jqModelMap[j].objName) {
                    setWarning(obj.children[i], data_jq[jqModelMap[j].mes][data_jq[jqModelMap[j].mes].length - 1].formatValue);
/*                    mes_jq = jqModelMap[j].mes;
                    mesName_jq = jqModelMap[j].mesName;*/
                }
            }
        }
    }
}, 1000);

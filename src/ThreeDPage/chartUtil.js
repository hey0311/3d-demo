/* eslint-disable */
import echarts from 'echarts'
import {getColor} from "./util"

const axisFontSize = 16;
const chartTitleSize = 20;
const chartBkColor = 'rgba(128, 128, 128, 0)';
export const renderBarChart = (myChart, data, threeConfig, modelMap, title) => {
    // var myChart = echarts.init(document.getElementById(chartId));
    let sdata = [], xAxisData = [];
    for (let key in data) {
        sdata.push({
            value: data[key][data[key].length - 1].value[1],
            itemStyle: {
                normal: {
                    barBorderRadius: [15, 15, 0, 0],
                    color: {
                        "type": "linear",
                        "x": 0,
                        "y": 0,
                        "x2": 0,
                        "y2": 1,
                        "colorStops": [
                            {
                                "offset": 0,
                                color: getColor(data[key][data[key].length - 1].formatValue)
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
        });
        modelMap.map((m) => {
            if (m.mes === key) {
                xAxisData.push(m.mesName)
            }
        })
    }

    var option = {
        backgroundColor: chartBkColor,
        title: {
            text: title,
            textStyle: {
                fontSize: chartTitleSize,
                color: '#fff'
            }
        },
        grid: {
            left: '15%'
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
            axisLabel: {
                fontSize: axisFontSize,
                interval: 0,
                color: '#fff'
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}',
                fontSize: axisFontSize,
                color: '#fff'
            },
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        series: [{
            data: sdata,
            type: 'bar'
        }]
    };
    myChart.setOption(option);
}
export const renderLineChart = (myChart, data, mes, modelMap, title, stand) => {
    // var myChart = echarts.init(document.getElementById(chartId));
    var option = {
        backgroundColor: chartBkColor,
        title: {
            text: title,
            textStyle: {
                fontSize: chartTitleSize,
                color: '#fff'
            }
        },
        grid: {
            left: '15%'
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
            axisLabel: {
                fontSize: axisFontSize
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
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
                fontSize: axisFontSize,
                color: '#fff'
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            min:0
        },
        visualMap: {
            top: 30,
            right: 10,
            textGap: 5,
            itemWidth: 15,
            show: true,
            textStyle: {
                color: '#fff'
            },
            orient: 'horizontal',
            left: 'center',
            pieces: [
                {
                    gt: 0,
                    lte: stand[mes] * 0.8,
                    color: 'lightskyblue'
                }, {
                    gt: stand[mes] * 0.8,
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
            name: '模拟数据',
            smooth:true,
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            markLine: {
                data: [{
                    name: '标准值',
                    yAxis: stand[mes],
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

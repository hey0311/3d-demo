/*    var date = new Date();
    var content = '<p>' + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' '
        + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ' +
        '入口温度:' + reyaData.inTemp[timeIndex] + ';' +
        '中心温度' + reyaData.centerTemp[timeIndex] + ';' +
        '出口温度' + reyaData.outTemp[timeIndex] + ';' +
        '压力' + reyaData.pressure[timeIndex] +
        '</p>';
    document.getElementById('info-container').innerHTML = content + document.getElementById('info-container').innerHTML;*/
/*var childOpts = [];
for (var i = 0; i < time.length; i++) {
    childOpts.push({
        series: [{
            type: 'bar',
            data: [{
                value:data.inTemp[i].formatValue,
                itemStyle: {
                    normal: {
                        color: getColor(data.inTemp[i].formatValue)
                    }
                }
            },
                {
                    value:data.centerTemp[i].formatValue,
                    itemStyle: {
                        normal: {
                            color: getColor(data.centerTemp[i].formatValue)
                        }
                    }
                },
                {
                    value:data.outTemp[i].formatValue,
                    itemStyle: {
                        normal: {
                            color: getColor(data.outTemp[i].formatValue)
                        }
                    }
                }/!*,
                {
                    value: reyaData_format.pressure[i],
                    itemStyle: {
                        normal: {
                            color: getColor(reyaData_format.pressure[i])
                        }
                    }
                }*!/]
        }]
    })
}*/
/*option = {
    //timeline基本配置都写在baseoption 中
    baseOption: {
        //backgroundColor: '#0f375f',
        timeline: {
            loop: true,
            axisType: 'category',
            show:false,
            autoPlay: true,
            playInterval: intervalTime,
            data: time
        },

        grid: {containLabel: true},
        xAxis: [{
            type: 'category',
            data: ['入口温度', '中部温度', '出口温度']
        }],
        yAxis: {
            type: 'value',
            axisLabel:{
                formatter:'{value}%'
            },
            max: 100,
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#0066CC'
                }
            }
        },
        series: [
            {
                type: 'bar'
            }
        ]
    },
    options: childOpts
}*/

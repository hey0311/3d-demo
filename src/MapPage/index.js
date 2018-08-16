import React, { Component } from 'react';
import echarts from 'echarts'
import worldMap from "../res/world.json"
import './index.css';

class MapPage extends Component {
    componentDidMount(){

        echarts.registerMap('world', worldMap);
        // 基于准备好的dom，初始化echarts实例
        var myChart_mainpage = echarts.init(document.getElementById('main'));
        var geoCoordMap = {
            '上海': [121.46481, 31.2891],
            '尼日利亚': [-4.388361, 11.186148],
            '美国洛杉矶': [-118.24311, 34.052713],
            '香港邦泰': [114.195466, 22.282751],
            '美国芝加哥': [-87.801833, 41.870975],
            '加纳库马西': [-4.62829, 7.72415],
            '英国曼彻斯特': [-1.657222, 51.886863],
            '德国汉堡': [10.01959, 54.38474],
            '哈萨克斯坦阿拉木图': [45.326912, 41.101891],
            '俄罗斯伊尔库茨克': [89.116876, 67.757906],
            '巴西': [-48.678945, -10.493623],
            '埃及达米埃塔': [31.815593, 31.418032],
            '西班牙巴塞罗纳': [2.175129, 41.385064],
            '柬埔寨金边': [104.88659, 11.545469],
            '意大利米兰': [9.189948, 45.46623],
            '乌拉圭蒙得维的亚': [-56.162231, -34.901113],
            '莫桑比克马普托': [32.608571, -25.893473],
            '阿尔及利亚阿尔及尔': [3.054275, 36.753027],
            '阿联酋迪拜': [55.269441, 25.204514],
            '匈牙利布达佩斯': [17.108519, 48.179162],
            '澳大利亚悉尼': [150.993137, -33.675509],
            '美国加州': [-121.910642, 41.38028],
            '澳大利亚墨尔本': [144.999416, -37.781726],
            '墨西哥': [-99.094092, 19.365711],
            '加拿大温哥华': [-123.023921, 49.311753],
            '外兴安岭':[124.4281430000,59.0213980000],
            '西伯利亚':[108.2385210000,60.3604710000],
            '达客图依':[95.2868240000,59.1728470000],
            '欧洲':[20.8145670000,54.3294610000],
            '赞比亚':[24.9355610000,2.8610800000,],
            '缅甸达孖':[105.0005970000,17.1199900000],
            '福建':[119.2965900000,26.0998200000]
        };

        var hisData = [
            {'name':'达客图依','month':'3月','value':22000},
            {'name':'达客图依','month':'4月','value':37800},
            {'name':'达客图依','month':'5月','value':41000},
            {'name':'达客图依','month':'6月','value':45000},
            {'name':'达客图依','month':'7月','value':45000},
            {'name':'达客图依','month':'8月','value':51000},
            {'name':'达客图依','month':'9月','value':48000},
            {'name':'达客图依','month':'10月','value':41000},
            {'name':'达客图依','month':'11月','value':32000},
            {'name':'达客图依','month':'12月','value':20000},
            {'name':'达客图依','month':'1月','value':25000},
            {'name':'达客图依','month':'2月','value':28000},
            {'name':'达客图依','month':'3月','value':27000},
            {'name':'达客图依','month':'4月','value':33000},
            {'name':'西伯利亚','month':'3月','value':12000},
            {'name':'西伯利亚','month':'4月','value':17800},
            {'name':'西伯利亚','month':'5月','value':21000},
            {'name':'西伯利亚','month':'6月','value':35000},
            {'name':'西伯利亚','month':'7月','value':35000},
            {'name':'西伯利亚','month':'8月','value':31000},
            {'name':'西伯利亚','month':'9月','value':38000},
            {'name':'西伯利亚','month':'10月','value':31000},
            {'name':'西伯利亚','month':'11月','value':22000},
            {'name':'西伯利亚','month':'12月','value':15000},
            {'name':'西伯利亚','month':'1月','value':20000},
            {'name':'西伯利亚','month':'2月','value':18000},
            {'name':'西伯利亚','month':'3月','value':17000},
            {'name':'西伯利亚','month':'4月','value':23000},
            {'name':'外兴安岭','month':'3月','value':12700},
            {'name':'外兴安岭','month':'4月','value':17000},
            {'name':'外兴安岭','month':'5月','value':21200},
            {'name':'外兴安岭','month':'6月','value':36800},
            {'name':'外兴安岭','month':'7月','value':37200},
            {'name':'外兴安岭','month':'8月','value':31000},
            {'name':'外兴安岭','month':'9月','value':35600},
            {'name':'外兴安岭','month':'10月','value':31000},
            {'name':'外兴安岭','month':'11月','value':12000},
            {'name':'外兴安岭','month':'12月','value':10000},
            {'name':'外兴安岭','month':'1月','value':15000},
            {'name':'外兴安岭','month':'2月','value':18000},
            {'name':'外兴安岭','month':'3月','value':17000},
            {'name':'外兴安岭','month':'4月','value':22000},
            {'name':'缅甸达孖','month':'3月','value':8250},
            {'name':'缅甸达孖','month':'4月','value':7850},
            {'name':'缅甸达孖','month':'5月','value':7750},
            {'name':'缅甸达孖','month':'6月','value':8100},
            {'name':'缅甸达孖','month':'7月','value':7250},
            {'name':'缅甸达孖','month':'8月','value':7150},
            {'name':'缅甸达孖','month':'9月','value':8230},
            {'name':'缅甸达孖','month':'10月','value':8150},
            {'name':'缅甸达孖','month':'11月','value':8250},
            {'name':'缅甸达孖','month':'12月','value':8350},
            {'name':'缅甸达孖','month':'1月','value':7250},
            {'name':'缅甸达孖','month':'2月','value':8220},
            {'name':'缅甸达孖','month':'3月','value':8210},
            {'name':'缅甸达孖','month':'4月','value':8350},
            {'name':'赞比亚','month':'3月','value':6230},
            {'name':'赞比亚','month':'4月','value':6870},
            {'name':'赞比亚','month':'5月','value':6750},
            {'name':'赞比亚','month':'6月','value':7120},
            {'name':'赞比亚','month':'7月','value':6270},
            {'name':'赞比亚','month':'8月','value':6180},
            {'name':'赞比亚','month':'9月','value':7290},
            {'name':'赞比亚','month':'10月','value':7150},
            {'name':'赞比亚','month':'11月','value':7230},
            {'name':'赞比亚','month':'12月','value':7380},
            {'name':'赞比亚','month':'1月','value':6230},
            {'name':'赞比亚','month':'2月','value':7290},
            {'name':'赞比亚','month':'3月','value':7270},
            {'name':'赞比亚','month':'4月','value':6380},
        ];

        var forestInfo = [
            {'name':'达客图依','area':'3323127','type':'山毛榉','year':'15','percent':0.15,'country':'俄罗斯','fsc':'是','shop':'西伯利亚原木交易公司'},
            {'name':'西伯利亚','area':'2456351','type':'落叶松','year':'22','percent':0.17,'country':'俄罗斯','fsc':'是','shop':'西伯利亚原木交易公司'},
            {'name':'外兴安岭','area':'2783156','type':'落叶松','year':'13','percent':0.15,'country':'俄罗斯','fsc':'否','shop':'外兴安岭进出口公司'},
            {'name':'缅甸达孖','area':'678326','type':'泡桐','year':'16','percent':0.36,'country':'缅甸','fsc':'是','shop':'缅甸木材交易公司'},
            {'name':'赞比亚','area':'537812','type':'筒状非洲楝','year':'21','percent':0.33,'country':'赞比亚','fsc':'否','shop':'赞比亚木材进出口公司'},
        ];

        var logisticsData = [
            {'access':'达客图依-福建','sendNo':'T01180523','sendType':'铁路','sendManager':'大运国际货运','startSendTime':'2018-05-01','planArriveTime':'2018-05-27'},
            {'access':'西伯利亚-福建','sendNo':'T01180524','sendType':'铁路','sendManager':'大运国际货运','startSendTime':'2018-05-01','planArriveTime':'2018-05-28'},
            {'access':'外兴安岭-福建','sendNo':'T01180525','sendType':'水运','sendManager':'大运国际货运','startSendTime':'2018-05-12','planArriveTime':'2018-06-29'},
            {'access':'缅甸达孖-福建','sendNo':'T01180526','sendType':'铁路','sendManager':'大运国际货运','startSendTime':'2018-05-14','planArriveTime':'2018-05-30'},
            {'access':'赞比亚-福建','sendNo':'T01180527','sendType':'水运','sendManager':'远洋航运公司','startSendTime':'2018-05-20','planArriveTime':'2018-06-30'},
            {'access':'福建-上海家居生产','sendNo':'T02180527','sendType':'水运','sendManager':'南方航运公司','startSendTime':'2018-05-15','planArriveTime':'2018-06-01'},
            {'access':'福建-欧洲家居生产','sendNo':'T02180528','sendType':'水运','sendManager':'远洋航运公司','startSendTime':'2018-05-15','planArriveTime':'2018-07-02'},

        ];

        var orderData = [
            {'orderNo':'T01180523','customer':'上海家居','goodType':'1200X600X4.75mm','proBase':'福建','progress':0.6,'state':'在产','orderNum':'100件','startTime':'2018-05-01','planEndDate':'2018-05-10','fsc':'是','curWork':'拌料','cycle':'9天','onMake':'1200X600X4.75mm刨花板','produceTeam':'A班'},
            {'orderNo':'T01180524','customer':'上海家居','goodType':'1200X600X7.70mm','proBase':'福建','progress':0.7,'state':'在产','orderNum':'200件','startTime':'2018-05-01','planEndDate':'2018-05-20','fsc':'是','curWork':'热压成型','cycle':'19天','onMake':'1200X600X4.75mm红木板','produceTeam':'B班'},
            {'orderNo':'T01180525','customer':'上海家居','goodType':'1200X600X4.75mm','proBase':'福建','progress':0.85,'state':'在产','orderNum':'100件','startTime':'2018-05-02','planEndDate':'2018-05-10','fsc':'是','curWork':'切割包装','cycle':'8天','onMake':'1200X600X4.75mm合成板','produceTeam':'C班'},
            {'orderNo':'T01180526','customer':'上海家居','goodType':'1200X600X4.75mm','proBase':'福建','progress':1,'state':'完成','orderNum':'80件','startTime':'2018-04-25','planEndDate':'2018-05-02','fsc':'是','curWork':'在库','cycle':'7天','onMake':'1200X600X4.75mm红木板','produceTeam':'A班'},
            {'orderNo':'T01180527','customer':'欧洲绿家','goodType':'1200X600X4.75mm','proBase':'福建','progress':1,'state':'完成','orderNum':'100件','startTime':'2018-04-25','planEndDate':'2018-05-03','fsc':'是','curWork':'在库','cycle':'8天','onMake':'1200X600X4.75mm合成板','produceTeam':'B班'},
            {'orderNo':'T02180527','customer':'欧洲绿家','goodType':'1200X600X4.75mm','proBase':'福建','progress':1,'state':'完成','orderNum':'100件','startTime':'2018-04-25','planEndDate':'2018-05-04','fsc':'是','curWork':'在库','cycle':'9天','onMake':'1200X600X4.75mm刨花板','produceTeam':'C班'},
            {'orderNo':'T02180528','customer':'欧洲绿家','goodType':'1200X600X4.75mm','proBase':'福建','progress':0,'state':'未进行','orderNum':'100件','startTime':'1900-01-00','planEndDate':'2018-05-30','fsc':'是','curWork':'原料采购','cycle':'0天','onMake':'1200X600X4.75mm刨花板','produceTeam':'A班'},

        ];

        var getOrderData = function(name){
            var curData = [];
            for(var i=0;i<orderData.length;i++){
                if(orderData[i].customer.indexOf(name)>=0){
                    curData.push(orderData[i]);
                }
            }
            var result = '';
            for(var j=0;j<curData.length;j++){
                result += "<tr class='tableTr' orderNo='"+curData[j].orderNo+"'> " +
                    "  <td width='20%'>"+curData[j].orderNo+"</td> "+
                    " <td width='20%'>"+curData[j].customer+"</td> "+
                    "  <td width='20%'>"+curData[j].goodType+"</td> "+
                    " <td width='20%'>"+curData[j].proBase+"</td> "+
                    "  <td width='20%'>"+getSpanByState(curData[j].state)+"</td> "+
                    "</tr>";
            }
            if(result !== ''){
                findById('orderTable').html(result);
            }

        }

        var getOrderDetail = function(orderNo){
            var curData = {};
            for(var i=0;i<orderData.length;i++){
                if(orderData[i].orderNo === orderNo){
                    curData = orderData[i];
                    break;
                }
            }

            if(curData.orderNo){
                findById('progressNum').html(curData.progress*100 + '%');
                findById('progressBar').style('width:'+curData.progress*100 + '%');
                findById('progressStartTime').html(curData.startTime);
                findById('progressEndTime').html(curData.planEndDate);
                findById('cycle').html(curData.cycle);
                findById('produceGood').html(curData.onMake);
                findById('produceTeam').html(curData.produceTeam);
                findById('progressFsc').html(curData.fsc);
                findById('curProduce').html(curData.curWork);
            }
        }
        var getSpanByState = function(state){
            if(state === '在产'){
                return "<span style='display:inline-block;width:10px;height:10px;background:#ffc107;border-radius:50%'></span>";
            }else if(state === '完成'){
                return "<span style='display:inline-block;width:10px;height:10px;background:#4caf50;border-radius:50%'></span>";
            }else{
                return "<span style='display:inline-block;width:10px;height:10px;background:red;border-radius:50%'></span>";
            }
        }
        var BJData = [
            [{
                name: '达客图依',
                value: 43230
            }, {
                name: '福建'
            }],
            [{
                name: '西伯利亚',
                value: 34560
            }, {
                name: '福建'
            }],
            [{
                name: '外兴安岭',
                value: 37830
            }, {
                name: '福建'
            }],
            [{
                name: '缅甸达孖',
                value: 32780
            }, {
                name: '福建'
            }],



        ];
        var SHData = [[{
            name: '福建',
            value: 0
        }, {
            name: '上海'
        }] ];

        var OZData = [[{
            name: '福建',
            value: 0
        }, {
            name: '欧洲'
        }]];

        var TBData = [[{
            name: '赞比亚',
            value: 30380
        }, {
            name: '福建'
        }]];
        var convertData = function(data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = geoCoordMap[dataItem[0].name];
                var toCoord = geoCoordMap[dataItem[1].name];
                if (fromCoord && toCoord) {
                    res.push([{
                        coord: fromCoord,
                        value: dataItem[0].value,
                        fromName: dataItem[1].name,
                        toName: dataItem[0].name,
                    }, {
                        coord: toCoord,
                        value: dataItem[0].value,
                        fromName: dataItem[1].name,
                        toName: dataItem[0].name,
                    }]);
                }
            }
            return res;
        };

        var findById = function(id){
            return {
                html:function(text){
                    document.getElementById(id).innerHTML = text;
                },
                style:function(text){
                    document.getElementById(id).setAttribute('style',text);
                }
            }
        }

//设置林场基本信息
        var setBaseInfo = function(name){
            var curData = {};
            for(var i=0;i<forestInfo.length;i++){
                if(forestInfo[i].name.indexOf(name)>=0){
                    curData = forestInfo[i];
                    break;
                }
            }
            if(curData.name){
                findById('treeForestName').html(curData.name);
                findById('areaNum').html((parseFloat(curData.area)/1000).toFixed());
                findById('treeType').html(curData.type);
                findById('treeYear').html(curData.year);
                findById('treePer').html(parseFloat(curData.percent)*100 + "%");
                findById('country').html(curData.country);
                findById('treeFsc').html(curData.fsc);
                findById('treeShop').html(curData.shop);
            }
        }

        var setLogisticsData = function(name){
            var curData = {};
            for(var i=0;i<logisticsData.length;i++){
                if(logisticsData[i].access.indexOf(name)>=0){
                    curData = logisticsData[i];
                    break;
                }
            }

            if(curData.access){
                findById('forestName').html(curData.access);
                findById('logisNo').html(curData.sendNo);
                findById('sendType').html(curData.sendType);
                findById('logisShop').html(curData.sendManager);
                findById('startSendTime').html(curData.startSendTime);
                findById('planArriveTime').html(curData.planArriveTime);
            }

        }

        var getCurveness = function(name,arr){
            if(name === '福建'){
                if(arr.length>1){
                    return -0.2;
                }else{
                    return -0.4;
                }

            }else if(name === '上海'){
                return -0.2;
            }else{
                return 0;
            }
        }

        var getAttSysbol = function(name){
            if(name === '福建'){
                return 'image://img/bc.jpg';
            }else{
                return 'image://img/jj.jpg';
            }
        }


        var getAttName = function(name){
            if(name === '福建'){
                return '板材生产';
            }else{
                return '家居生产';
            }
        }

        var color = ['white', '#00ffdc', '#00ffdc','#ffffff'];
        var series = [];
        [
            ['福建', BJData],
            ['上海',SHData],
            ['欧洲',OZData],
            ['福建',TBData]
        ].forEach(function(item, i) {
            series.push(
                {
                    name: item[0],
                    type: 'lines',
                    zlevel: 1,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0,
                        symbol: 'arrow',
                        symbolSize: 10
                    },
                    label: {
                        emphasis: {
                            show: true,
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: color[i],
                            width: 2,
                            opacity: 0.8,
                            curveness: getCurveness(item[0],item[1]),
                            type:'dashed'
                        },
                        emphasis:{
                            color: color[i],
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            shadowBlur: 10,
                            width: 3
                        }
                    },
                    data: convertData(item[1])
                },
                {
                    type: 'effectScatter',
                    name:'森林',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: { //涟漪特效
                        period: 5, //动画时间，值越小速度越快
                        brushType: 'fill', //波纹绘制方式 stroke, fill
                        scale: 1, //波纹圆环最大限制，值越大波纹越大
                        trailLength: 0,
                    },
                    showEffectOn:'emphasis',
                    label: {
                        normal: {
                            color:'white',
                            show: false,
                            position: 'top', //显示位置
                            offset: [0, 0], //偏移设置
                            formatter: '{b}' //圆环显示文字
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    symbol: 'image://img/foreast.jpg',
                    symbolSize: function(val) {
                        return 4 + val[2] / 1000; //圆环大小
                    },
                    itemStyle: {
                        normal: {
                            show: false,
                            color: '#f00'
                        }
                    },
                    data: item[1].map(function(dataItem) {
                        return {
                            name: dataItem[0].name,
                            value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                        };
                    }),
                },
                //被攻击点
                {
                    type: 'scatter',
                    name:getAttName(item[0]),
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        period: 4,
                        brushType: 'stroke',
                        scale: 4
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'right',
                            //offset:[5, 0],
                            color: '#00ffff',
                            formatter: '{b}',
                            textStyle: {
                                color: "#00ffff"
                            }
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    symbol: getAttSysbol(item[0]),
                    symbolSize: 30,
                    itemStyle: {
                        normal: {
                            show: true,
                            color: '#9966cc'
                        }
                    },
                    data: [{
                        name: item[0],
                        value: geoCoordMap[item[0]].concat([100]),
                    }],
                }
            );
        });

        var option = {
            // backgroundColor: '#404a59',
            title: {
                show:false,
                text: '数字家居板材生产管理平台',
                left: 'center',
                textStyle: {
                    color: '#fff',
                    fontSize: 24
                },
                padding: [20, 20, 20, 20]
            },
            legend:{
                show:true,
                right:'25%',
                bottom:'25%',
                width:100,
                itemWidth:40,
                itemHeight:30,
                data:[
                    {
                        name:'板材生产',
                        icon:'image://img/bc.jpg',
                        textStyle: {
                            color: 'white',
                            fontSize:17
                        }
                    },{
                        name:'家居生产',
                        icon:'image://img/jj.jpg',
                        textStyle: {
                            color: 'white',
                            fontSize:17
                        }
                    },{
                        name:'森林',
                        icon:'image://img/foreast.jpg',
                        textStyle: {
                            color: 'white',
                            fontSize:17
                        }
                    }

                ],
            },
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(12, 204, 104, 0.92)',
                borderColor: '#FFFFCC',
                showDelay: 0,
                hideDelay: 0,
                enterable: true,
                transitionDuration: 0,
                extraCssText: 'z-index:100',
                formatter: function(params, ticket, callback) {
                    if(params.componentSubType === 'lines'){
                        //根据业务自己拓展要显示的内容
                        var res = "";
                        var name = params.data.toName;
                        var fname = params.data.fromName;
                        var value = params.value;
                        res = "<span style='color:#fff;'>" + name+'>'+ fname + "</span>";
                        return res;
                    }else if(params.componentSubType === 'effectScatter'){
                        return "<span style='color:#fff;'>林场："+params.data.name+"</span>";
                    }

                }
            },
            geo: {
                map: 'world',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: false, //是否允许缩放
                layoutCenter: ['12.5%', '59%'], //地图位置
                layoutSize: '197%',
                aspectScale:0.829,
                zoom:1.3,
                itemStyle: {
                    normal: {
                        color: 'rgba(51, 69, 89, .0)', //地图背景色
                        borderColor: 'rgba(100,149,237,.0)' //省市边界线
                    },
                    emphasis: {
                        color: 'rgba(37, 43, 61, .0)' //悬浮背景
                    }
                }
            },
            series: series
        };

        var counts = option.series[0].data.length; //获取所有闪动圆环数量
        var dataIndex = 0;
        myChart_mainpage.setOption(option);
        myChart_mainpage.on('click', function (params) {
            // console.log(params);
            // $('.mini p').append("123");
            if(params.componentSubType === 'effectScatter'){
                setBaseInfo(params.data.name);
                setLogisticsData(params.data.name+'-');
                miniChart.setOption(getMiniOption(params.data.name))
            }else if(params.componentSubType === 'lines'){
                setLogisticsData(params.data.toName+'-'+params.data.fromName);
                setBaseInfo(params.data.toName);
                if(params.data.fromName === '福建'){
                    miniChart.setOption(getMiniOption(params.data.toName))
                }

            }else if(params.componentSubType === 'scatter'){
                getOrderData(params.data.name);
                createTableListener();
            }
        });
//miniChart1
        var miniChart = echarts.init(document.getElementById('mini-chart'));


        var getMiniOption = function(name){
            var curData = [];
            for(var i=0;i<hisData.length;i++){
                if(hisData[i].name.indexOf(name)>=0){
                    curData.push(hisData[i].value);
                    if(curData.length === 12){
                        break;
                    }
                }
            }
            return {
                grid:{
                    top:'26%',
                    left:'10%',
                    width:'85%',
                    height:'60%',
                    backgroundColor:'white'
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        textStyle: {
                            color: '#00ffdc',
                            fontSize:8
                        },
                        interval:0,
                        rotate:0
                    },
                    splitLine:{
                        show:false
                    },
                    data: ['3月', '4月', '5月', '6月', '7月', '8月', '9月','10月','11月','12月','1月','2月']
                },
                yAxis: {
                    name:'千     ',
                    nameTextStyle:{
                        align:'left'
                    },
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#00ffdc',
                            fontSize:10
                        },
                        formatter:function(value,index){
                            return (value/1000).toFixed();
                        }
                    },
                    splitLine:{
                        show:true,
                        lineStyle:{
                            width:0.2,
                            color:'#b4fbf1'
                        }
                    },
                    axisLine:{
                        show:true,
                        lineStyle:{
                            color:'#00ffdc'
                        }
                    },
                    axisTick:{
                        show:false
                    }
                },
                title:{
                    show:true,
                    text:'历史供应水平',
                    textStyle:{
                        color:'white',
                        fontSize:20,
                        fontFamily:'Microsoft YaHei'
                    }
                },
                label:{
                    show:false,
                    color:'#00ffdc'
                },
                itemStyle:{
                    color:'#00ffdc'
                },
                barWidth:10,
                series: [{
                    data: curData,
                    type: 'bar'
                }]
            };
        }

        miniChart.setOption(getMiniOption('达客图依'));
        getOrderData('上海');
        getOrderDetail('T01180523');
        var createTableListener = function(){
            var tableTrs = document.getElementsByClassName('tableTr');
            for(var tableIndex=0;tableIndex<tableTrs.length;tableIndex++){
                tableTrs[tableIndex].onclick = function(){
                    getOrderDetail(this.getAttribute('orderNo'));
                }
            }
        }
        createTableListener();

        window.onresize = function(){
            // var winHeight = document.documentElement.clientHeight;
            // var winWidth = document.documentElement.clientWidth;
            // document.getElementById('selfChartMain').style.width = winWidth;
            // document.getElementById('selfChartMain').style.height = winHeight;
            miniChart.resize();
            myChart_mainpage.resize();
            console.log('resized')
        };
    }
    render() {
        return (
            <div style={{height: '100%',width: '100%',overflow: 'hidden',display:this.props.hide?'none':'block'}} id="main-page">
                <div id="main"></div>
                <div className="mini" style={{top:'64.8px'}}>
                    <p><span id="treeForestName">达客园依</span>林场基本信息</p>
                    <div className='inner'>
                        <div className='detail'>
                            <div className='leftDetail'>林地面积：<span id='areaNum'>3323</span>公顷</div>
                            <div className='rightDetail'>树种：<span id='treeType'>山毛榉</span></div>
                        </div>

                        <div className='detail'>
                            <div className='leftDetail'>树龄：<span id='treeYear'>15</span>年</div>
                            <div className='rightDetail'>杂木比：<span id='treePer'>15%</span></div>
                        </div>

                        <div className='detail'>
                            <div className='leftDetail'>国籍：<span id='country'>俄罗斯</span></div>
                            <div className='rightDetail'>是否<span style={{color:'#01fb01'}}>FSC</span>认证：<span id='treeFsc'>是</span></div>
                        </div>

                        <div className='detail'>
                            供应商：<span id='treeShop'>西伯利亚原木交易公司</span>
                        </div>

                    </div>
                </div>
                <div id="mini-chart" className="mini" style={{top:'410.4px'}}>

                </div>
                <div className="mini" style={{top:'756px'}}>
                    <p><span id="forestName">达客园依林场</span>基本信息</p>
                    <div className="inner">

                        <div className="centerDetail">
                            物流单号：<span id="logisNo">T01180523</span>
                        </div>

                        <div className="centerDetail">
                            运输方式：<span id="sendType">铁路</span>
                        </div>

                        <div className="centerDetail">
                            承运商：<span id="logisShop">大运国际货运</span>
                        </div>

                        <div className="centerDetail">
                            起运时间：<span id="startSendTime">2018-05-01</span>
                        </div>

                        <div className="centerDetail">
                            预计到货时间：<span id="planArriveTime">2018-05-27</span>
                        </div>

                    </div>
                </div>
                <div className="mini" style={{display:'flex',width: '1401.6px',left: '30px',height: '216px',top: '854px'}}>

                    <div className="mini-bottom" style={{width:'50%'}}>
                        <p>订单执行情况</p>
                        <div className="table-container">
                            <div className="table-header-div">
                                <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                                    <tr style={{backgroundColor: 'rgba(0, 138, 255, 0.3) !important',height: '28px'}}>
                                        <td width="20%" align="center">订单号
                                        </td>
                                        <td width="20%" align="center">客户
                                        </td>
                                        <td width="20%" align="center">产品型号
                                        </td>
                                        <td width="20%" align="center">生产基地
                                        </td>
                                        <td width="20%" align="center">状态
                                        </td>
                                </tr>
                            </table>
                        </div>
                        <div id="demo" className="table-content-1">
                            <div id="demo1" style={{height: '115px'}}>
                                <table id='orderTable' width="100%" align="center" cellpadding="0" cellspacing="0">


                                </table>
                            </div>
                            <div id="demo2" className="table-content-2"></div>
                        </div>
                    </div>
                </div>
                <div className="mini-bottom" style={{width:'30%'}}>
                    <p>订单详情</p>
                    <div className='progress'>
                        <p className='font' style={{color: '#0cefea'}}>
                            <span className='fontName'>订单完成进度</span>
                            <span className='fontPer'><span id='progressNum'>66%</span></span>
                        </p>
                        <p className='over'></p>
                        <p className='all' style={{width: '66%'}} id='progressBar'></p>
                    </div>

                    <div className='detail' style={{paddingTop: '3px'}}>开工时间：<span id='progressStartTime'>2018-05-01</span></div>

                    <div className='detail'>预计结束时间：<span id='progressEndTime'>2018-05-01</span></div>

                    <div className='detail'>生产周期：<span id='cycle'>10天</span></div>
                </div>
                <div className="mini-bottom" style={{width:'30%',paddingTop:'30px'}}>
            <span id="goto3D" onClick={this.props.hidePage}
                  style={{cursor:'pointer',color: '#00ffdc',textDecoration: 'none'}}>工厂3D模型图</span>
                    <div className='info-detail'>在产产品：<span id='produceGood'>1200X600X4.75mm刨花板</span></div>
                    <div className='info-detail'>生产班组：<span id='produceTeam'>A组</span></div>
                    <div className='info-detail'>是否FSC认证：<span id='progressFsc'>是</span></div>
                    <div className='info-detail'>当前工序：<span id='curProduce'>热压成型</span></div>
                </div>

            </div>
            </div>
        );
    }
}

export default MapPage;

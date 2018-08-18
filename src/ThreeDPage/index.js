import React, {Component} from 'react';
import './index.css';
import * as threeUtil from "./threeUtil";
import * as chartUtil from "./chartUtil"
import {setCameraPosition, setWarning} from "./util"
import _ from 'lodash'
import echarts from 'echarts'

class ThreeDPage extends Component {
    constructor(p) {
        super(p);
        var now = new Date();
        this.resizeAfterUpdate = false;
        this.reyaModelMap = [{
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
        this.jqModelMap = [{
            objName: '��007',
            mes: 'crossGive',
            mesName: '纵锯进给'
        }, {
            objName: '��006',
            mes: 'crossBack',
            mesName: '纵锯回程'
        }, {
            objName: '��005',
            mes: 'rowGive',
            mesName: '横锯进给'
        }, {
            objName: '��004',
            mes: 'rowBack',
            mesName: '横锯回程'
        }]
        this.threeConfig = {
            //3d模型图的点击事件
            objectSelectedFn: (obj) => {
                //只能点击设备
                let reyaArr = _.map(this.reyaModelMap, 'objName');
                let jqArr = _.map(this.jqModelMap, 'objName');
                if (reyaArr.concat(jqArr).indexOf(obj.name) === -1) {
                    return;
                }
                this.reyaModelMap.map((d) => {
                    if (d.objName === obj.name) {
                        this.setState({
                            mes: d.mes,
                            deviceSelected:d.mes
                        })
                    }
                })
                this.jqModelMap.map((d) => {
                    if (d.objName === obj.name) {
                        this.setState({
                            jqMes: d.mes,
                            deviceSelected:d.mes
                        })
                    }
                })
            },
            //柱形图点击事件的回调
            chartItemClickedFn: (itemName) => {
                var objName, map = this.reyaModelMap;
                for (var j = 0; j < map.length; j++) {
                    if (itemName === map[j].mesName) {
                        objName = map[j].objName;
                        this.focusObjByName(objName);
                        this.setState({
                            mes: map[j].mes,
                            deviceSelected:map[j].mes
                        });
                        return;
                    }
                }
                map = this.jqModelMap;
                for (var j = 0; j < map.length; j++) {
                    if (itemName === map[j].mesName) {
                        objName = map[j].objName;
                        this.focusObjByName(objName);
                        this.setState({
                            jqMes: map[j].mes,
                            deviceSelected:map[j].mes
                        });
                        return;
                    }
                }
            }
        };
        this.reyaStand = {
            inTemp: 120,
            centerTemp: 180,
            outTemp: 80
        };
        this.jqStand = {
            crossGive: 30,
            crossBack: 35,
            rowGive: 32,
            rowBack: 40
        };
        this.values = {
            index: 0
        };
        this.points = {
            inTemp: [1.2 , 1.1, 1, 0.9, 0.8, 0.9, 1.1, 1.3, 1.4, 1.2, 1, 1.1, 1, 0.9, 0.8, 0.7, 0.6, 0.6, 0.5, 0.5, 0.4, 0.2, 0.1],
            centerTemp: [0.1, 0.1, 0.2, 0.4, 0.5, 0.8, 1, 1.1, 1, 1, 1, 1.2, 1.2, 1.2, 0.8, 0.7, 0.6, 0.6, 0.5, 0.5, 0.4, 0.2, 0.1],
            outTemp: [0.5, 0.4, 0.3, 0.4, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 0.7, 0.7, 0.6, 0.5, 0.5, 0.7, 0.6, 1.1, 1.1, 1.2, 1.2, 1, 0.5],
            crossGive: [0.6, 0.5, 0.4, 0.3, 0.2, 0.2, 0.2, 0.3, 0.3, 0.6, 0.5, 0.4, 0.6, 0.3, 0.5, 0.5, 0.5, 0.6, 0.6, 0.6, 0.6, 0.6, 0.5],
            crossBack: [0.4, 0.5, 1, 1.1, 1.2, 1.1, 1.2, 0.8, 0.8, 0.9, 0.6, 0.6, 0.7, 0.7, 1, 1.1, 1.2, 1.3, 1.3, 1.1, 1, 0.8, 0.6],
            rowGive: [0.9, 0.9, 0.8, 0.7, 0.6, 0.3, 0.2, 0.3, 0.7, 0.6, 0.8, 0.8, 0.9, 1.1, 1.2, 1, 0.9, 0.8, 0.6, 0.6, 0.6, 0.6, 0.5],
            rowBack: [0.4, 0.3, 0.5, 0.5, 0.5, 0.6, 0.3, 0.4, 0.3, 0.7, 0.5, 0.4, 0.8, 0.8, 0.9, 0.9, 0.8, 0.6, 0.6, 0.5, 0.6, 0.6, 0.5],
        };
        for (let key in this.reyaStand) {
            this.values[key] = this.createData(this.reyaStand[key], this.points[key])
        }
        for (let key in this.jqStand) {
            this.values[key] = this.createData(this.jqStand[key], this.points[key])
        }
        let value = {
            name: now.toString(),
            value: [
                now,
                0
            ],
            formatValue: 0
        };
        this.state = {
            data: {
                inTemp: [value],
                centerTemp: [value],
                outTemp: [value]
            },
            data2: {
                crossGive: [value],
                crossBack: [value],
                rowGive: [value],
                rowBack: [value]
            },
            mes: 'inTemp',
            deviceSelected: 'inTemp',
            jqMes: 'crossGive',
            info: [],
        }
    }

    componentWillReceiveProps(p) {
        if (!p.hide) {
            this.resizeAfterUpdate = true;
        }
    }

    //根据模型名称来对焦
    focusObjByName(objName) {
        for (var i = 0; i < this.threeConfig.modelObj.children.length; i++) {
            if (this.threeConfig.modelObj.children[i].name === objName) {
                this.threeConfig.editor.focus(this.threeConfig.modelObj.children[i]);
            }
        }
    }

    renderChart(resize) {
        if (resize) {
            this.myChart_left_top.resize();
            this.myChart_right_top.resize();
            this.myChart_left_bottom.resize();
            this.myChart_right_bottom.resize();
        }
        let reyaTitle = '', jqTitle = '';
        this.reyaModelMap.map((m) => {
            if (m.mes === this.state.mes) {
                reyaTitle = m.mesName;
            }
        });
        this.jqModelMap.map(m => {
            if (m.mes === this.state.jqMes) {
                jqTitle = m.mesName;
            }
        });
        chartUtil.renderBarChart(this.myChart_right_top, this.state.data, this.threeConfig, this.reyaModelMap, '热压设备温度总体情况');
        chartUtil.renderBarChart(this.myChart_left_top, this.state.data2, this.threeConfig, this.jqModelMap, '锯切速度总体情况');
        chartUtil.renderLineChart(this.myChart_right_bottom, this.state.data, this.state.mes, this.reyaModelMap, reyaTitle + '趋势(度)', this.reyaStand);
        chartUtil.renderLineChart(this.myChart_left_bottom, this.state.data2, this.state.jqMes, this.jqModelMap, jqTitle + '速度趋势(r/s)', this.jqStand);
    }

    componentDidMount() {
        threeUtil.render3d(this.threeConfig);
        this.myChart_right_top = echarts.init(document.getElementById('chart-container-right-top'));
        this.myChart_right_top.on('click', (params) => {
            this.threeConfig.chartItemClickedFn(params.name);
        });
        this.myChart_left_top = echarts.init(document.getElementById('chart-container-left-top'));
        this.myChart_left_top.on('click', (params) => {
            this.threeConfig.chartItemClickedFn(params.name);
        });
        this.myChart_right_bottom = echarts.init(document.getElementById('chart-container-right-bottom'));
        this.myChart_left_bottom = echarts.init(document.getElementById('chart-container-left-bottom'));
        this.renderChart();
        this.refreshChart();
    }

    componentDidUpdate() {
        if (this.resizeAfterUpdate) {
            this.threeConfig.editor.signals.windowResize.dispatch();
            this.resizeAfterUpdate = false;
        }
        this.renderChart(true);
    }

    createData(standValue, points) {
        let stepNumber = 10;
        let newPoints = [];
        for (let i = 1; i < points.length; i++) {
            let delta = (points[i] - points[i - 1]) / stepNumber;
            for (let j = 0; j < stepNumber; j++) {
                newPoints.push((points[i - 1] + j * delta) * standValue);
            }
        }
        return newPoints;
    }

    getMesName(mes) {
        let map = {
            inTemp: '入口温度',
            centerTemp: '中部温度',
            outTemp: '出口温度',
            crossGive: '纵锯进给',
            crossBack: '纵锯回程',
            rowGive: '横锯进给',
            rowBack: '横锯回程'
        }
        return map[mes];
    }

    refreshChart() {
        this.intervalId=setInterval(() => {
            let data = _.cloneDeep(this.state.data);
            let data2 = _.cloneDeep(this.state.data2);
            if (data.inTemp.length > 50) {
                data.inTemp = data.inTemp.slice(1, data.inTemp.length);
            }
            var now = new Date();
            let info = [{
                time: '',
                text: '预警信息'
            }];
            [{data, stand: this.reyaStand}, {data: data2, stand: this.jqStand}].map(obj => {
                let d = obj.data, stand = obj.stand, map = obj.map;
                for (let key in d) {
                    if (d[key].length > 50) {
                        d[key] = d[key].slice(1, d[key].length);
                    }
                    let formatValue = this.values[key][this.values.index] * 100 / stand[key];
                    if (formatValue >= 100) {
                        if (_.map(info, 'mes').indexOf(key) === -1) {
                            info.push({
                                time: `${now.getHours()}:
                                ${now.getMinutes()<10 ? '0' + now.getMinutes() : now.getMinutes()}:
                                ${now.getSeconds()<10 ? '0' + now.getSeconds() : now.getSeconds()}  `,
                                text: this.getMesName(key) + '超出标准值，请注意！',
                                mes: key
                            });
                        }
                    }
                    d[key].push({
                        name: now.toString(),
                        value: [
                            now,
                            this.values[key][this.values.index]
                        ],
                        formatValue
                    });
                }
            });
            this.values.index++;
            if (this.values.index === this.values.inTemp.length) {
                this.values.index = 0;
            }
            this.setState({data, data2, info});
            this.refresh3DModel();
        }, 1000)
    }

    refresh3DModel() {
        if (this.threeConfig.modelObj) {
            let modelObj = this.threeConfig.modelObj;
            for (var i = 0; i < modelObj.children.length; i++) {
                for (var j = 0; j < this.reyaModelMap.length; j++) {
                    if (modelObj.children[i].name === this.reyaModelMap[j].objName) {
                        setWarning(modelObj.children[i],
                            this.state.data[this.reyaModelMap[j].mes][this.state.data[this.reyaModelMap[j].mes].length - 1].formatValue);
                    }
                }
                for (var j = 0; j < this.jqModelMap.length; j++) {
                    if (modelObj.children[i].name === this.jqModelMap[j].objName) {
                        setWarning(modelObj.children[i],
                            this.state.data2[this.jqModelMap[j].mes][this.state.data2[this.jqModelMap[j].mes].length - 1].formatValue);
                    }
                }
            }
        }
    }
    resetModelView(){
        this.threeConfig.editor.camera.position.set( 0, 5, 10 );
        this.threeConfig.editor.camera.lookAt( new window.THREE.Vector3() );
        setCameraPosition(this.threeConfig.editor);
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
    render() {
        return (
            <div id="3d-page" style={{
                height: '100%',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                display: this.props.hide ? 'none' : 'block'
            }}>
                <div id="three-container"></div>
                <div id="message-left" className="message-box">
                    <div className="message-box-content">基本信息</div>
                    <div className="message-box-content message-box-content-child">生产班组：A组</div>
                    <div className="message-box-content message-box-content-child">在产产品：木板</div>
                </div>
                <div id="message-right" className="message-box">
                    <div className="message-box-content">{`当前设备信息：${this.getMesName(this.state.deviceSelected)}`}</div>
                    <div className="message-box-content message-box-content-child">{`当前值：${this.values[this.state.deviceSelected][this.values.index].toFixed(2)}`}</div>
                    <div className="message-box-content message-box-content-child">{`标准值：${this.reyaStand[this.state.deviceSelected]||this.jqStand[this.state.deviceSelected]}`}</div>
                </div>
                <div id="chart-container-left-top" className="chart-container"></div>
                <div id="chart-container-left-bottom" className="chart-container"></div>
                <div id="message-right-2" className="message-box">
                    {this.state.info.map((i) => {
                        return <div className="message-box-content">{i.time + i.text}</div>
                    })}
                </div>
                <div id="chart-container-right-top" className="chart-container"></div>
                <div id="chart-container-right-bottom" className="chart-container"></div>
                <input type="button" id="goto-main" onClick={this.props.hidePage} className="btn" value="返回主界面"/>
                <h1>
                    工厂生产实时监控
                </h1>
                <h3>
                    Real-time production
                    monitoring</h3>
                <input type="button" id="reset-model-view" className="btn" onClick={this.resetModelView.bind(this)} value="重置视角"/>

            </div>
        );
    }
}

export default ThreeDPage;

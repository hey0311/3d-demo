import React, {Component} from 'react';
import './index.css';
import * as threeUtil from "./threeUtil";
import * as chartUtil from "./chartUtil"
import {randomData, setWarning} from "./util"
import _ from 'lodash'

class ThreeDPage extends Component {
    constructor(p) {
        super(p);
        var now = new Date();
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
                let reyaArr=_.map(this.reyaModelMap,'objName');
                let jqArr=_.map(this.jqModelMap,'objName');
                if (reyaArr.concat(jqArr).indexOf(obj.name)===-1) {
                    return;
                }
                this.reyaModelMap.map((d) => {
                    if (d.objName === obj.name) {
                        this.setState({
                            mes: d.mes
                        })
                    }
                })
                this.jqModelMap.map((d) => {
                    if (d.objName === obj.name) {
                        this.setState({
                            jqMes: d.mes
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
                            mes:map[j].mes
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
                            jqMes:map[j].mes
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
        this.state = {
            data: {
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
            },
            mes: 'inTemp',
            jqMes: 'crossGive',
            data2: {
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
            }
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

    renderChart() {
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
        })
        chartUtil.renderBarChart('chart-container-right-top', this.state.data, this.threeConfig, this.reyaModelMap, '热压设备温度监测');
        chartUtil.renderBarChart('chart-container-left-top', this.state.data2, this.threeConfig, this.jqModelMap, '锯切速度监测');
        chartUtil.renderLineChart('chart-container-right-bottom', this.state.data, this.state.mes, this.reyaModelMap, reyaTitle, this.reyaStand);
        chartUtil.renderLineChart('chart-container-left-bottom', this.state.data2, this.state.jqMes, this.jqModelMap, jqTitle, this.jqStand);
    }

    componentDidMount() {
        threeUtil.render3d(this.threeConfig);
        this.renderChart();
        this.refreshChart();
    }

    componentDidUpdate() {
        this.renderChart();
    }

    refreshChart() {
        setInterval(() => {
            let data = _.cloneDeep(this.state.data);
            let data2 = _.cloneDeep(this.state.data2);
            if (data.inTemp.length > 50) {
                data.inTemp = data.inTemp.slice(1, data.inTemp.length);
            }
            data.inTemp.push(randomData(data.inTemp, 'inTemp'));
            if (data.centerTemp.length > 50) {
                data.centerTemp = data.centerTemp.slice(1, data.centerTemp.length);
            }
            data.centerTemp.push(randomData(data.centerTemp, 'centerTemp'));
            if (data.outTemp.length > 50) {
                data.outTemp = data.outTemp.slice(1, data.outTemp.length);
            }
            data.outTemp.push(randomData(data.outTemp, 'outTemp'));
            //锯切数据
            if (data2.crossGive.length > 50) {
                data2.crossGive = data2.crossGive.slice(1, data2.crossGive.length);
            }
            data2.crossGive.push(randomData(data2.crossGive, 'crossGive'));
            if (data2.crossBack.length > 50) {
                data2.crossBack = data2.crossBack.slice(1, data2.crossBack.length);
            }
            data2.crossBack.push(randomData(data2.crossBack, 'crossBack'));
            if (data2.rowGive.length > 50) {
                data2.rowGive = data2.rowGive.slice(1, data2.rowGive.length);
            }
            data2.rowGive.push(randomData(data2.rowGive, 'rowGive'));
            if (data2.rowBack.length > 50) {
                data2.rowBack = data2.rowBack.slice(1, data2.rowBack.length);
            }
            data2.rowBack.push(randomData(data2.rowBack, 'rowBack'));
            this.setState({data, data2});
            this.refresh3DModel();
        }, 1000)
    }

    refresh3DModel() {
        if (this.threeConfig.editor.scene.children) {
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

    render() {
        return (
            <div id="3d-page" style={{height: '100%', width: '100%', position: 'relative',overflow:'hidden'}}>
                <div id="three-container"></div>
                <div id="chart-container-left-top" className="chart-container"></div>
                <div id="chart-container-left-bottom" className="chart-container"></div>
                <div id="chart-container-right-top" className="chart-container"></div>
                <div id="chart-container-right-bottom" className="chart-container"></div>
                <input type="button" id="goto-main" value="返回主界面"/>
                <h1>
                    工厂生产实时监控
                </h1>
                <h3>
                    Real-time production
                    monitoring</h3>

            </div>
        );
    }
}

export default ThreeDPage;

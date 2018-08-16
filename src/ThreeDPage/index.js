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
        this.threeConfig = {
            //3d模型图的点击事件
            objectSelectedFn: (obj) => {
                //只能点击设备
                if (_.map(this.reyaModelMap, 'objName').indexOf(obj.name) === -1) {
                    return;
                }
                this.reyaModelMap.map((d) => {
                    if (d.objName === obj.name) {
                        this.setState({
                            mes: d.mes
                        })
                    }
                })
                console.log(obj.name)
            },
            //柱形图点击事件的回调
            chartItemClickedFn: (itemName) => {
                var objName, map = this.reyaModelMap;
                for (var j = 0; j < map.length; j++) {
                    if (itemName === map[j].mesName) {
                        objName = map[j].objName;
                        this.focusObjByName(objName);
                    }
                }
            }
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
            mes: 'inTemp'
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

    componentDidMount() {
        threeUtil.render3d(this.threeConfig);
        chartUtil.renderBarChart(this.state.data, this.threeConfig);
        chartUtil.renderLineChart(this.state.data, this.state.mes);
        this.refreshChart();
    }

    componentDidUpdate() {
        chartUtil.renderBarChart(this.state.data, this.threeConfig);
        chartUtil.renderLineChart(this.state.data, this.state.mes);
    }

    refreshChart() {
        setInterval(() => {
            let data = _.cloneDeep(this.state.data);
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
            this.setState({data});
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
                /*                for (var j = 0; j <jqModelMap.length; j++) {
                                    if (obj.children[i].name === jqModelMap[j].objName) {
                                        setWarning(obj.children[i], data_jq[jqModelMap[j].mes][data_jq[jqModelMap[j].mes].length - 1].formatValue);
                                    }
                                }*/
            }
        }
    }

    render() {
        return (
            <div id="3d-page" style={{height: '100%', width: '100%', position: 'relative'}}>
                <div id="three-container"></div>
                <div id="chart-container-reyaBar" className="chart-container"></div>
                <div id="chart-container-reyaLine" className="chart-container"></div>
                <input type="button" id="goto-main" value="返回主界面"/>
                <h1>
                    生产实时监控
                </h1>
                <h3>
                    Real-time production
                    monitoring</h3>

            </div>
        );
    }
}

export default ThreeDPage;

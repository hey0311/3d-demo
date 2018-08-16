import React, {Component} from 'react';
import './index.css';
import * as threeUtil from "./threeUtil";
import * as chartUtil from "./chartUtil"
import {randomData,setWarning} from "./util"
import _ from 'lodash'

class ThreeDPage extends Component {
    constructor(p) {
        super(p);
        var now = new Date();
        this.threeConfig={};
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
            }
        }
    }

    componentDidMount() {
        threeUtil.render3d(this.threeConfig);
        chartUtil.renderBarChart(this.state.data);
        chartUtil.renderLineChart(this.state.data);
        this.refreshChart();
    }

    componentDidUpdate() {
        chartUtil.renderBarChart(this.state.data);
        chartUtil.renderLineChart(this.state.data);
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
    refresh3DModel(){
        if (this.threeConfig.editor.scene.children) {
            let modelObj=this.threeConfig.modelObj;
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
            for (var i = 0; i <modelObj.children.length; i++) {
                for (var j = 0; j < reyaModelMap.length; j++) {
                    if (modelObj.children[i].name === reyaModelMap[j].objName) {
                        setWarning(modelObj.children[i], this.state.data[reyaModelMap[j].mes][this.state.data[reyaModelMap[j].mes].length - 1].formatValue);
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
            <div id="3d-page" style={{height: '100%', width: '100%', position: 'relative', display: 'flex'}}>
                <div id="three-container"></div>
                <div id="detail">
                    <div id="echart-container" className="dmini"></div>
                    <div id="info-container" className="dmini"></div>
                    <input type="button" id="goto-main" value="返回主界面"/>
                </div>
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

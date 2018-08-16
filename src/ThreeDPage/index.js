import React, {Component} from 'react';
import './index.css';
import * as threeUtil from "./threeUtil";
import * as chartUtil from "./chartUtil"
import {randomData} from "./util"
import _ from 'lodash'

class ThreeDPage extends Component {
    constructor(p) {
        super(p);
        var now = new Date();
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
        threeUtil.render3d();
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
            console.log(data.inTemp)
            this.setState({data})
        }, 1000)
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

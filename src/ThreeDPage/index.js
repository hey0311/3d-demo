import React, {Component} from 'react';
import './index.css';
import * as threeUtil from "./threeUtil";
import * as chartUtil from "./chartUtil"

class ThreeDPage extends Component {
    componentDidMount() {
        threeUtil.render3d();
        chartUtil.renderChart();
    }

    render() {
        return (
            <div id="3d-page" style={{height:'100%',width:'100%',position:'relative',display:'flex'}}>
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

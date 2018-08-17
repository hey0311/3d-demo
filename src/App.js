import React, {Component} from 'react';
import './App.css';
import MapPage from "./MapPage/index";
import ThreeDPage from "./ThreeDPage/index";

class App extends Component {
    constructor(p) {
        super(p);
        this.state = {
            hideMapPage: false,//隐藏地图页
            hide3dPage: true,//隐藏3d页
        }
    }

    /**
     * 切换相应的页面内容，通过设置当前页display:block，其他页display:none的方式，以避免每次切换到3d图会重新加载模型。
     * @param page 要切换的页面名称
     */
    hidePage = (page) => {
        this.setState({
            hideMapPage: page === 'mapPage',
            hide3dPage: page === '3dPage'
        })
    };

    render() {
        return (
            <div className="App" style={{height: '100%', width: '100%'}}>
                <MapPage hidePage={this.hidePage.bind(this, 'mapPage')} hide={this.state.hideMapPage}/>
                <ThreeDPage hidePage={this.hidePage.bind(this, '3dPage')} hide={this.state.hide3dPage}/>
            </div>
        );
    }
}

export default App;

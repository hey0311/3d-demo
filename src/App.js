import React, {Component} from 'react';
import './App.css';
import MapPage from "./MapPage/index";
import ThreeDPage from "./ThreeDPage/index";

class App extends Component {
    constructor(p) {
        super(p);
        this.state = {
            hideMapPage: false,
            hide3dPage: true
        }
    }

    hidePage = (page) => {
        if (page === 'mapPage') {
            this.setState({
                hideMapPage: true,
                hide3dPage: false
            })
        } else {
            this.setState({
                hideMapPage: false,
                hide3dPage: true
            })
        }
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

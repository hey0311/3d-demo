import React, {Component} from 'react';
import './App.css';
import MapPage from "./MapPage/index";
import ThreeDPage from "./ThreeDPage/index";

class App extends Component {
    constructor(p) {
        super(p);
        this.state = {
            showPage: 0
        }
    }

    render() {
        return (
            <div className="App" style={{height:'100%',width:'100%'}}>
                {
                    this.state.showPage===0?<MapPage/>:<ThreeDPage/>
                }
            </div>
        );
    }
}

export default App;

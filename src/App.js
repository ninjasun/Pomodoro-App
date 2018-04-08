import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            display:'25:00'
        }
        this.onClickReset = this.onClickReset.bind(this);
        this.onClickStop = this.onClickReset.bind(this);
        this.onClickReset = this.onClickReset.bind(this);
    }
    onClickStart(){
        //start count down

    }
    onClickStop(){
        //stop count down

    }
    onClickReset(){
        //reset count down to the original time

    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
            <div className='display'>
                {this.state.display}
            </div>
            <div className='button-bar'>
                <button
                    className='button btn-start'
                    onClick={this.onClickStart}
                >
                    START
                </button>

                <button
                    className='button btn-stop'
                    onClick={this.onClickStop}
                >
                    STOP
                </button>

                <button
                    className='button btn-reset'
                    onClick={this.onClickReset}
                >
                    RESET
                </button>
            </div>

        </div>
      </div>
    );
  }
}

export default App;

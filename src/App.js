import React, { Component } from 'react';
import logo from './pomodoro-technique.svg';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            interval:'',
            timer:{
                start:1500,
                end:0,
                elapsed:1500
            }
        };

        this.onClickReset = this.onClickReset.bind(this);
        this.onClickStop = this.onClickStop.bind(this);
        this.onClickStart = this.onClickStart.bind(this);

    }

    onClickStart(){
        //start count down
        let self = this;
        console.log("this is: ", this);

        var countDown = function(){
            console.log("Elapsed is: ", self.state.timer.elapsed);
            let newElapsed = self.state.timer.elapsed -1;

            self.setState({
                timer:{
                    elapsed:newElapsed
                }
            });
        };
       let interval = setInterval(
           countDown, 1000
       );


        self.setState({
            interval:interval
        })


    }
    onClickStop(){
        //stop count down
        const self= this;
        this.setState({
            interval: clearInterval(self.state.interval)
        })
    }

    onClickReset(){
        //reset count down to the original time
        const self= this;
        this.setState({
            timer:{
                elapsed:1500
            },
            interval: clearInterval(self.state.interval)
        })
    }
    setTimer({timer}){

        this.setState({
            timer:{
                start:timer * 60,
                elapsed:timer * 60
            }
        })
    }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

        </header>
        <div className="container">
            <div className='tool-bar'>
                <button
                    className='filter'
                    onClick={this.setTimer.bind(this, {timer:25})}>
                    POMODORO
                </button>
                <button
                    className='filter'
                    onClick={this.setTimer.bind(this, {timer:5})}>
                    SHORT BREAK
                </button>
                <button
                    className='filter'
                    onClick={this.setTimer.bind(this, {timer:25})}>
                    LONG BREAK
                </button>
            </div>
            <div className='display'>
                {this.state.timer.elapsed}
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

import React, { Component } from 'react';
import logo from './pomodoro-technique.svg';
import './App.css';




//allow react dev tools work
window.React = React;


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            interval:'',
            timer:{
                start:1500,
                end:0,
                elapsed:1500,
                isRunning:false
            }
        };

        this.onClickReset = this.onClickReset.bind(this);
        this.onClickStop = this.onClickStop.bind(this);
        this.onClickStart = this.onClickStart.bind(this);
        this.playSound = this.playSound.bind(this);

    }
    playSound(){
        console.log("play sound");
        return;
    }
    onClickStart(){
        //start count down
        if (this.state.timer.isRunning) return;

        let self = this;

        var countDown = function(){
           const { end, elapsed } = self.state.timer;


           if (end === elapsed){
               //play sound and stop counter
               self.playSound();
               self.onClickReset();
               return;
           }
            let newElapsed = self.state.timer.elapsed -1;

            self.setState({
                timer:{
                    elapsed:newElapsed,
                    isRunning:true
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
        if (!this.state.timer.isRunning) return;
        const self= this;
        this.setState({
            interval: clearInterval(self.state.interval)
        })
    }

    onClickReset(){
        //reset count down to the original time
        if (!this.state.timer.isRunning) return;
        const self= this;
        this.setState({
            timer:{
                elapsed:1500
            },
            interval: clearInterval(self.state.interval)
        })
    }
    setTimer({timer}){
        if (this.state.timer.isRunning) {
            this.onClickStop();
        }
        this.setState({
            timer:{
                start:timer * 60,
                elapsed:timer * 60
            }
        })
    }
    getTimeElapsed(elapsed){
        let min = parseInt(elapsed / 60); //total minutes
        let second = Math.round((elapsed / 60 - min) * 60);
        return min + ":" + second
    }

  render() {

    const { elapsed } = this.state.timer;
    const timeElapsed = this.getTimeElapsed(elapsed);

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
                {timeElapsed}

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

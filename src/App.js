import React, { Component } from 'react';
import logo from './pomodoro-technique.svg';
import './App.css';

import Sound from 'react-sound';

import Notification from 'react-web-notification';

import sound from './alarmclock.mp3';

//allow react dev tools work
window.React = React;

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            interval:'',
            ignore:true,
            title:'',
            options:{},
            playStatus:Sound.status.STOPPED,
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


    }


    onClickStart(){
        //start count down
        if (this.state.timer.isRunning) return;

        let self = this;

        var countDown = function(){

           const {  elapsed } = self.state.timer;

          const end = 0;

           if (end === elapsed){
               //play sound and stop counter
               console.log('Countdown is finished! ',elapsed )
               self.setState({
                   playStatus : Sound.status.PLAYING

               });

               self.handleButtonClick();
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
            interval: clearInterval(self.state.interval),
            isRunning:false
        })
    }

    onClickReset(){
        //reset count down to the original time
        if (!this.state.timer.isRunning) return;
        const self= this;
        this.setState({
            timer:{
                elapsed:1500,
                isRunning:false
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
    handleSongFinishedPlaying(){
        const self = this;

        self.setState({
            playStatus : Sound.status.STOPPED
        })
    }

    handleNotificationOnClick(e, tag){
        console.log(e, 'Notification clicked tag:' + tag);
    }

    handleNotificationOnError(e, tag){
        console.log(e, 'Notification error tag:' + tag);
    }

    handleNotificationOnClose(e, tag){
        console.log(e, 'Notification closed tag:' + tag);
    }

    handleNotificationOnShow(e, tag){

        console.log(e, 'Notification shown tag:' + tag);


        if(this.state.ignore) {
            return;
        }

        const now = Date.now();

        const title = 'React-Web-Notification' + now;
        const body = 'Hello' + new Date();
        var tag = now;
        const icon = 'http://georgeosddev.github.io/react-web-notification/example/Notifications_button_24.png';
        // const icon = 'http://localhost:3000/Notifications_button_24.png';

        // Available options
        // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
        const options = {
            tag: tag,
            body: body,
            icon: icon,
            lang: 'en',
            dir: 'ltr'
        }
        this.setState({
            title: title,
            options: options
        });
    }


    handlePermissionGranted(){
        console.log('Permission Granted');
        this.setState({
            ignore: false
        });
    }
    handlePermissionDenied(){
        console.log('Permission Denied');
        this.setState({
            ignore: true
        });
    }
    handleNotSupported(){
        console.log('Web Notification not Supported');
        this.setState({
            ignore: true
        });
    }

    handleNotificationOnClick(e, tag){
        console.log(e, 'Notification clicked tag:' + tag);
    }

    handleNotificationOnError(e, tag){
        console.log(e, 'Notification error tag:' + tag);
    }

    handleNotificationOnClose(e, tag){
        console.log(e, 'Notification closed tag:' + tag);
    }

    handleNotificationOnShow(e, tag){

        console.log(e, 'Notification shown tag:' + tag);
    }
    handleButtonClick() {

        const now = Date.now();


        const body = 'Hello' + new Date();
        const tag = now;
        const icon = 'http://georgeosddev.github.io/react-web-notification/example/Notifications_button_24.png';
        // const icon = 'http://localhost:3000/Notifications_button_24.png';

        // Available options
        // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
        const options = {
            tag: tag,
            body: body,
            icon: icon,
            lang: 'en',
            dir: 'ltr'
        }
        this.setState({
            options: options,
            title:'Pomodoro timer'
        });
    }



  render() {

    const { elapsed } = this.state.timer;
    const timeElapsed = this.getTimeElapsed(elapsed);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <Sound
                url={sound}
                playStatus={this.state.playStatus}

                onFinishedPlaying={this.handleSongFinishedPlaying.bind(this)}
            />

            <Notification
                ignore={this.state.ignore && this.state.title !== ''}
                notSupported={this.handleNotSupported.bind(this)}
                onPermissionGranted={this.handlePermissionGranted.bind(this)}
                onPermissionDenied={this.handlePermissionDenied.bind(this)}
                onShow={this.handleNotificationOnShow.bind(this)}
                onClick={this.handleNotificationOnClick.bind(this)}
                onClose={this.handleNotificationOnClose.bind(this)}
                onError={this.handleNotificationOnError.bind(this)}
                timeout={5000}
                title={this.state.title}
                options={this.state.options}
            />
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
                    onClick={this.setTimer.bind(this, {timer:1})}>
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

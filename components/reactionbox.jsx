import Image from 'next/image'
import { Component } from 'react'
import Lightning from '../public/icons8-lightning-bolt-96.png'
import Refresh from '../public/icons8-refresh-480.png'
import { 
    test_container,
    reac_container,
    test_bar,
    bar_item,
    reset_button,
    readyState,
    goState
} from './reactionbox.module.css'

class Reactionbox extends Component {
    state = {
        timerOn: false,
        timerStart: 0,
        timerTime: 0,
        auto: false,
        ready: false,
        go: false, // logic
    }

    readyState = () => {
        this.setState({ready: true})
        setTimeout(() => {
            this.setState({
                go: true
            })
        }, Math.random() * 10000)
    }

    startTimer = () => {
        this.setState({
            timerOn: true,
            timerTime: this.state.timerTime,
            timerStart: Date.now() - this.state.timerTime,
            auto: true    
        })
        this.timer = setInterval(() => {
            this.setState({
                timerTime: Date.now() - this.state.timerStart
            })
        }, 10)
    }

    stopTimer = () => {
        this.setState({ timerOn: false })
        clearInterval(this.timer)
    }

    resetTimer = () => {
        this.setState({
            timerStart: 0,
            timerTime: 0,
            auto: false,
            ready: false,
            go: false
        })
        clearInterval(this.timer)
    }

    goState = () => {
        this.setState({go: true})
        
    }

    componentDidMount() {
        setInterval(() => {
            if (this.state.go === true){
                document.getElementById("ready").click()
            }
        }, 5) 
    }

    render(){

        let { timerTime } = this.state
        let { ready } = this.state
        let { go } = this.state // responislbe for setting image to green
        let { auto } = this.state 
        let goTime = null
        let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2)
        let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2)
        let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2)
        let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2)

        // I got a bit stuck, we need it to measure the amount of time it took to react to the green box!
        // how do we do that!

        if (go === true){
            goTime = 'ready'
        }

        return(
            <div className={test_container}>
                <button id={goTime} className={ go === true ? goState : ready === true ? readyState : reac_container} onClick={go === true ? this.startTimer : auto === true ? this.stopTimer : this.readyState } >
                    {ready == true ? '' : <Image src={Lightning} alt="Lightning Symbol" />}
                </button>
                <div className={test_bar}>
                    <div className={bar_item}>
                        {/* Should contain previous Speed or '-' to signify nothing has been recorded yet*/}
                    </div>
                    <div className={bar_item} >
                        <div>
                            {console.log(timerTime, ready, go, goTime, auto)}
                            {hours} : {minutes} : {seconds} : {centiseconds}
                        </div>
                    </div>
                    <button className={reset_button} onClick={this.resetTimer}>
                        <Image width={30} height={30} src={Refresh} alt="Refresh Symbol"/>
                    </button>
                </div>
            </div>
        )
    }
}

export default Reactionbox

// reaction time - time it takes for the user to click on green
// so starttime - when go value is true
// endTime - when clicked. 
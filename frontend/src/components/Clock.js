import {Component} from 'react';

export class Clock extends Component {

    constructor (props) {
        super(props)
        this.state = {
            date: new Date()
        }
    }

    componentDidMount () {
        this.timer = window.setInterval(() => {
            this.setState({
                date: new Date()
            })
        })
    }

    componentWillUnmount () {
        clearInterval(this.timer)
    }

    render () {
        return <div className="clock">
            {this.state.date.toLocaleString()}
        </div>
    }
}
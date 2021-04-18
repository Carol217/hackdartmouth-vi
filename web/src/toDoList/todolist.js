import React, {Component} from 'react';
import './todolist.css';

class todolist extends Component {
    constructor(props) {
        super(props);
        let date = new Date();
        this.state = {
            hour: date.getHours().toLocaleString(),
            minutes: date.getMinutes().toLocaleString()
      }; 
    }
    componentDidMount() {
        setInterval(() => {
        let date = new Date();
        let mod_min = date.getMinutes().toLocaleString();
        let mod_hour = date.getHours().toLocaleString();
        if (mod_min < 10) mod_min = "0" + mod_min;
        if (mod_hour === "0") mod_hour = "00";
        this.setState({
            hour: mod_hour,
            minutes: mod_min 
        })
        }, 1000)
      }
  
    render() {
        let message;
        if (5 <= this.state.hour && this.state.hour < 12) {
            message = "Good Morning";
        } else if (12 <= this.state.hour && this.state.hour < 6) {
            message = "Good Afternoon";
        } else {
            message = "Good Evening";
        }
            
        return (
            <div id="todolist">
                <div className="left-list">
                    <h1 className="time-header">{this.state.hour + ":" + this.state.minutes}</h1>
                    <h3>{message}</h3>
                    <div className="piecharts">
                        <div className="piechart">
                            1
                        </div>
                        <div className="piechart">
                            2
                        </div>
                    </div>
                </div>
                <div className="right-list">
                    <h2>What would you like to get done <span className="emphasis">today</span>?</h2>
                    <div className="box-list boxlist2"></div>
                    <div className="box-list boxlist1">

                    </div>
                </div>
            </div>
        );
    }
  }

export default todolist;
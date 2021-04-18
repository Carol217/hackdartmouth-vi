import BarChart from './BarChart';
import { useContext } from 'react';

const HoursBarChart = ({context}) => {

    const hourState = {
        id: "barChart", 
        labels: ["5am", "6pm", "7pm", "8am", "9am"],
        datasets: [
            {
            label: 'Productivity',
            backgroundColor: [
            '#FFFFFA',
            '#FFF3C9',
            '#FFF3C9',
            '#FFFFFA'
            ],
            hoverBackgroundColor: [
            '#D1DAD8',
            '#C19700',
            '#C19700',
            '#D1DAD8'
            ],
            data: [40, 72, 70, 45]
            }
        ]
    };

    return (
        <div>
            <BarChart state={hourState} context={context} />
        </div>
    )
}

export default HoursBarChart;
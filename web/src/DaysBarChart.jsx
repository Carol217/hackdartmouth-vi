import BarChart from './BarChart';
import { useContext } from 'react';

const DaysBarChart = ({context}) => {

    const dayState = {
        id: "barChart", 
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
            {
            label: 'Productivity',
            backgroundColor: [
            '#FFF3C9',
            '#FFF3C9',
            '#FFFFFA',
            '#FFFFFA',
            '#FFF3C9',
            '#FFF3C9',
            '#FFFFFA'
            ],
            hoverBackgroundColor: [
            '#C19700',
            '#C19700',
            '#D1DAD8',
            '#D1DAD8',
            '#C19700',
            '#C19700',
            '#D1DAD8'
            ],
            data: [80, 71, 33, 40, 72, 70, 45]
            }
        ]
    };

    return (
        <div>
            <BarChart state={dayState} context={context} />
        </div>
    )
}

export default DaysBarChart;
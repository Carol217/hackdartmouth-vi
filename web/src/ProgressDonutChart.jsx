import DonutChart from './DonutChart';
import { useContext } from 'react';

const ProgressDonutChart = ({context}) => {

    const contextValues = useContext(context);

    const progressState = {
        id: "progressChart", 
        title: "My Task Progress",
        labels: ["Tasks Complete", "Tasks Incomplete"],
        datasets: [
          {
            label: 'Progress',
            backgroundColor: [
                '#FFF3C9',  
                '#FFFFFA'
              
            ],
            hoverBackgroundColor: [
                '#D29538',
                '#D1DAD8'
            ],
            data: [contextValues.checked, contextValues.unchecked]
          }
        ]
    };

    const onClick = (e) => {
        console.log(progressState);
        progressState.datasets.data = [contextValues.checked, contextValues.unchecked]
    }

    return (
        <div onClick={(e) => onClick(e)}>
            <DonutChart state={progressState} context={context} />
        </div>
    )
}

export default ProgressDonutChart;
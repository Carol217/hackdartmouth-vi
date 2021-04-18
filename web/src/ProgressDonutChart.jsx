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
              '#F8FFFC',
              '#AED3CB'
            ],
            hoverBackgroundColor: [
              '#D1DAD8',
              '#AED3CB'
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
import DonutChart from './DonutChart';
import { useContext } from 'react';

const ProgressDonutChart = ({context}) => {

    const contextValues = useContext(context);
    const data = [contextValues.checked, contextValues.unchecked];

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
            data: data
          }
        ]
    };

    return (
        <DonutChart state={progressState}/>
    )
}

export default ProgressDonutChart;
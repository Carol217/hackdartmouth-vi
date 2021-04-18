import DonutChart from './DonutChart';
import { useContext } from 'react';

const ProductivityDonutChart = ({context}) => {
    
    const contextValues = useContext(context);

    const updateDataset = (newData) => {
      contextValues.chartInstance.data.datasets[0].data = newData;
      contextValues.chartInstance.update();
    };

    const productivityState = {
        id: "productivityChart", 
        title: "My Productivity",
        labels: ["Time Productive", "Time Unproductive"],
        datasets: [
          {
            label: 'Productivity',
            backgroundColor: [
              '#71CE7A',
              '#FFFFFA'
            ],
            hoverBackgroundColor: [
              '#83BDB0',
              '#D1DAD8'
            ],
            data: [contextValues.timeProductive, contextValues.timeUnproductive]
          }
        ]
      };

    return (
      <DonutChart state={productivityState} context={context}/>
    )
}

export default ProductivityDonutChart;
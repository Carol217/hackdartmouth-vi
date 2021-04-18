import DonutChart from './DonutChart';
import { useContext } from 'react';

const ProductivityDonutChart = ({context}) => {
    
    const contextValues = useContext(context);
    const data = [contextValues.timeProductive, contextValues.timeUnproductive];


    const productivityState = {
        id: "productivityChart", 
        title: "My Productivity",
        labels: ["Time Productive", "Time Unproductive"],
        datasets: [
          {
            label: 'Productivity',
            backgroundColor: [
              '#FFF0BB',
              '#AED3CB'
            ],
            hoverBackgroundColor: [
              '#E4C000',
              '#AED3CB'
            ],
            data: data
          }
        ]
      };

    return (
      <DonutChart state={productivityState} context={context}/>
    )
}

export default ProductivityDonutChart;
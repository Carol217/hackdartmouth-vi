import React, { useEffect, useRef, useState, useContext } from 'react';
import Chartjs from 'chart.js';


// this a wrapper to generate a Donut Chart
// id is a numerical identifier for the cahrt
// labels is a list of the different sections (complet & incomplete)
// there should be 2 labels
// datasets should be a dictionary containing:
//      label: String
//      backgroundColor: List of hex values
//      hoverBackgroundColor: list of hex values
//      data: values of each label.

const BarChart = ({state, context}) => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const contextValues = useContext(context);
  
  contextValues.chartInstance = chartInstance


  const chartConfig = {
    type: 'bar',
    data: state,
    options: {
        title:{
            display:false
        },
        legend:{
            display:false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
  };

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  return (
    <div id={state.id}>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default BarChart;
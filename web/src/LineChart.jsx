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

const LineChart = () => {
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const labels = []
    const data = []

    const addDays = (origDate, day) => {
        var date = new Date(origDate.valueOf());
        date.setDate(date.getDate() + day);
        return date;
    }

    let currentDate = new Date("2021-03-18");
    for (let i = 0; i < 30; i ++) {
        labels.push((currentDate.getMonth() + 1) + "/" + currentDate.getDay());
        data.push(Math.floor(Math.random()*100))
        currentDate = addDays(currentDate, 1);
    }


    const state = {
        id: "barChart", 
        labels: labels,
        datasets: [
            {
            label: 'Productivity',
            data: data,
            borderColor: '#FFF3C9',
            backgroundColor: "rgba(193, 163, 54, 0.25)"
            }
        ]
    };

    const chartConfig = {
        type: 'line',
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

    export default LineChart;
import { Doughnut } from 'react-chartjs-2';


// this a wrapper to generate a Donut Chart
// id is a numerical identifier for the cahrt
// labels is a list of the different sections (complet & incomplete)
// there should be 2 labels
// datasets should be a dictionary containing:
//      label: String
//      backgroundColor: List of hex values
//      hoverBackgroundColor: list of hex values
//      data: values of each label.
const DonutChart = ({state}) => {
    
    return (
        <div id={state.id}>
            <Doughnut
                data={state}
                options={{
                    title:{
                        display:true,
                        text: state.title,
                        fontSize:20
                    },
                    legend:{
                        display:false,
                        position:'right'
                    },
                    cutoutPercentage:75
                }}
            />
        </div>
    )
}

export default DonutChart;
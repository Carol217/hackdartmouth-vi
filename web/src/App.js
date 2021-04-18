import React from 'react';
import TaskList from './TaskList'
import ProductivityDonutChart from './ProductivityDonutChart'
import ProgressDonutChart from './ProgressDonutChart'

const ProgressContext = React.createContext({checked: 0, unchecked: 1, chartInstance: null})
const ProductivityContext = React.createContext({timeProductive: 1, timeUnproductive: 0, chartInstance:null})

const tasks = [
  {checked: false, value: "Click here to add to-dos!", shouldFocus: false}
];

function App() {
  return (

    <div id="body">
      <TaskList tasks={tasks} context={ProgressContext} />
      <ProgressDonutChart context={ProgressContext}/>
      
      <ProductivityDonutChart context={ProductivityContext}/>
    </div>
  );
}

export default App;

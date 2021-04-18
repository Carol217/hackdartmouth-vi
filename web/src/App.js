import React, { useState } from 'react';
import logo from './logo.svg';
import TaskList from './TaskList'
import ProductivityDonutChart from './ProductivityDonutChart'
import ProgressDonutChart from './ProgressDonutChart'

const ProgressContext = React.createContext({checked: 0, unchecked: 1})
const ProductivityContext = React.createContext({timeProductive: 1, timeUnproductive: 0})

const tasks = [
  {checked: false, value: "Click here to add to-dos!", shouldFocus: false}
];

function App() {
  return (
    <div>
      <TaskList tasks={tasks} context={ProgressContext} />
      <ProgressDonutChart context={ProgressContext}/>
      
      <ProductivityDonutChart context={ProductivityContext}/>
      </div>
  );
}

export default App;

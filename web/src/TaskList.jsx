import React, { useState } from 'react';

// Individual task is rendered here
const Task = ({checked, initialValue, shouldFocus}) => {
    const [tabbed, setTabbed] = useState(false);
    const [done, setDone] = useState(checked);
    const [value, setValue] = useState(initialValue);
    const [del, setDel] = useState(false);

    const handleCheckTask = (e) => {
        setDone(e.target.checked);
    }

    const handleKeyDown = (e) => {
        if (e.nativeEvent.code === "Tab") {
            e.preventDefault();
            setTabbed(!tabbed)
        } else if (e.nativeEvent.code === "Backspace") {
            if (value === "") {
                setDel(true)
            }
        }
    }

    return (
        del ? "" :
            <div>
                <input type="checkbox" className={
                    tabbed? "bg-gray-150 mx-7 py-2 rounded-lg text-lg text-gray-650": "bg-gray-150 mx-3 py-2 rounded-lg text-lg text-gray-650"} 
                    onChange={(e) => handleCheckTask(e)} checked={done} />
                <input className={
                    done ? "text-lg line-through px-3 w-96" :"text-lg px-3 w-96"
                    } autoFocus={shouldFocus} value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} />
            </div>
    )
};

/*
    <div>
        <input className="bg-gray-150 px-3 py-2 rounded-lg text-lg text-gray-650 antialiased" type="checkbox" 
        onChange={()=>{parent.}}/>
        &ensp;
        <input id="task_item_{id}" type="text" className="text-lg"/>
        <br />
    </div>
);
*/

// This is a list of tasks, takes an array of objects where each objects is composed of the following properties
// - checked: whether the task is checked or not
// - value: the text for the task
const TaskList = ({tasks, context}) => {

    const [tasklist, setTasks] = useState(tasks);

    const onEnterKey = (e) => {
        if (e.nativeEvent.code === "Enter") {
            var copy = Object.assign([], tasklist);
            copy.push({checked: false, value: "", shouldFocus: true});
            setTasks(copy);
        }
    }

    return (
        <div id="tasklist" onKeyDown={(e) => onEnterKey(e)}>
            {tasklist.map((task, index) => 
            <Task key={index} checked={task.checked} initialValue={task.value} shouldFocus={task.shouldFocus} />
            )}
        </div>
    )
}

export default TaskList;
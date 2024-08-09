import React, {useState} from "react";

import Task from "./Tasks";

const ToDoList = () => {

    const[newTask, setNewTask] = useState("")

    const[TaskList, setTaskList] = useState

    return(
        <div>
            <input type="text" value={search} placeholder="What do you want to do next" />
            onChange={(event) => setNewTask(event.target.value)}
            
            onKeyUp = {(event) => {(event.target.key == "Enter")
            
            onkeyup = (event) => {
                if (event.key == 'Enter'){
                    setTaskList([newTask, ...TaskList])
                    setNewTask("");
                }
            }
            
            
            }};
            {(TaskList.length == 0) && <div>No more task!, Time for drink!</div>}
            {TaskList.map((tarea, index) => <Task task={tarea} key={index} onRemove={()=>{
                setTaskList(TaskList.filter((_tarea, indiceABorrar)=> indice != indiceABorrar))
            }} />)}
            <p>{TaskList.length}items left</p>

        </div>
    )
}

export default ToDoList;
import React, {useState, useEffect} from "react";

import Task from "./Tasks";

const ToDoList = () => {

    

    const[newTask, setNewTask] = useState("");

    const[TaskList, setTaskList] = useState([]);

    const fetchTask =  async() => {
        const res = await fetch('https://playground.4geeks.com/todo/users/cesarcontreras');
        const data = await res.json();
        setTaskList(data.todos);
    }
    useEffect(() => {
        fetchTask();
    }, [])

    const createTask = async () => {
        const post = await fetch('https://playground.4geeks.com/todo/todos/cesarcontreras' , {
            method: 'POST',
            body: JSON.stringify({
                label: newTask,
                is_done: false,
            }),
            headers: {
                "Content-Type": "application/json"
            },
            
        });
        const data = await post.json();
        setTaskList([...TaskList, data]);
        setNewTask("");
    };

    const deleteAllTasks = async () => {
        await fetch('https://playground.4geeks.com/todo/todos/cesarcontreras' , {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            },
        });
        setTaskList([]);
    };


    

    const newTodo = () => {
        if (inputValue.trim() != ""){
            createTask();
        }
    };

   console.log(TaskList);
    return(
        <div>
            <input type="text" value={newTask} placeholder="What do you want to do next" 
            onChange={(event) => setNewTask(event.target.value)}
            
            onKeyUp = {(event) => {
            
                if (event.key == 'Enter'){
                    createTask();

                }
                console.log(event.key);

            }}/>
            <button onClick={deleteAllTasks} className="border-0 bg-transparent"> <i class="fa-solid fa-trash"></i> </button>
          
            {(TaskList.length == 0) && <div>No more task!, Time for drink!</div>}
            {TaskList.map((tarea, index) => <Task task={tarea} key={index} onRemove={()=>{
                setTaskList(TaskList
                    .filter((_tarea, indiceABorrar)=> index != indiceABorrar))
            }} />)}
            <p>{TaskList.length} items left</p>

        </div>
    )
}

export default ToDoList;
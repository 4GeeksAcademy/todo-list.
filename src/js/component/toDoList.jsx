import React, {useState, useEffect} from "react";

import Task from "./tasks";

const ToDoList = () => {

    

    const[newTask, setNewTask] = useState("");

    const[TaskList, setTaskList] = useState([]);

    const fetchTask =  async() => {
        const response = await fetch('https://playground.4geeks.com/todo/users/cesar');
        console.log(response);
        if (response.status === 404){
            createUser();
            return;
        }
        if (response.ok){
            const data = await response.json();
            setTaskList(data.todos);
        }
    }
    useEffect(() => {
        fetchTask();
    }, [])

    const createUser = async() => {
        const response = await fetch('https://playground.4geeks.com/todo/users/cesar', {method: 'POST'});
        const data = await response.json();
        console.log(data);
    }

    const createTask = async () => {
        const post = await fetch('https://playground.4geeks.com/todo/todos/cesar' , {
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
        const deleteTask = await fetch('https://playground.4geeks.com/todo/users/cesar', {method: 'DELETE'});
        if (deleteTask.ok){
            setTaskList([]);
        }
    };

    const deleteTask = async (id) => {
        const response = await fetch('https://playground.4geeks.com/todo/todos/'+ id , {method: 'DELETE'});
        console.log(response)
        if (response.ok){
            setTaskList(TaskList.filter(tarea => tarea.id != id));
        }
    };
    

   console.log(TaskList);
    return(
        <div>
            <input type="text" value={newTask} placeholder="What do you want to do next" 
            onChange={(event) => setNewTask(event.target.value)}
            
            onKeyUp = {(event) => {
            
                if (event.key == 'Enter'){
                    if (newTask.trim() != ""){
                        createTask();
                    }
                }
                console.log(event.key);

            }}/>
            <button onClick={deleteAllTasks} className="border-0 bg-transparent"> <i className="fa-solid fa-trash"></i> </button>
          
            {(TaskList.length == 0) && <div>No more task!, Time for drink!</div>}
            {TaskList.map((tarea, index) => <Task task={tarea} key={index} onRemove={()=> deleteTask(tarea.id)} />)}
            <p>{TaskList.length} items left</p>

        </div>
    )
}

export default ToDoList;
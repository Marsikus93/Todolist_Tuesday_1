import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {triggerAsyncId} from "async_hooks";

type TodolistsType = { id: string, title: string, filter: FilterValuesType }
export type FilterValuesType = "all" | "completed" | "active"

function App() {
    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    // let [tasks1, setTasks1] = useState<Array<TaskType>>([
    //     {id: v1(), title: 'CSS', isDone: true},
    //     {id: v1(), title: 'HTML', isDone: true},
    //     {id: v1(), title: 'React', isDone: false},
    //     {id: v1(), title: 'Redux', isDone: false}
    // ])
    let  [tasks1, setTasks1] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });
    console.log(tasks1)
    // let [filter, setFilter] = useState<FilterValuesType>("all")
    const removeTodolist=(todolistId:string)=>{
        setTodolists(todolists.filter(el=>el.id!==todolistId))
    }
    const removeTask = (todolistId:string,taskId: string) => {
        // let filteredTasks = tasks1.filter(t => id !== t.id)
        // setTasks1(filteredTasks)
        setTasks1({...tasks1,[todolistId]:tasks1[todolistId].filter(el=>el.id!==taskId)})
    }
    const addTask = (todolistId:string,title: string) => {
        let newTask=  {id: v1(), title: "GraphQL2", isDone: false},
         set
        setTasks1({...tasks1,[todolistId]:[...tasks1[todolistId],newTask]})
        // let newTask = {id: v1(), title: title, isDone: false}
        // let newTasksArray = [newTask, ...tasks1]
        // setTasks1(newTasksArray)
    }
    const changeStatus = (todolistId:string,taskId: string, newIsDone: boolean) => {
        setTasks1({...tasks1,[todolistID1]:tasks1[todolistID1].map(el=>el.id===taskId?{...el,isDone:newIsDone}:el)})
        // let task = tasks1.find(t => t.id === taskId)
        // if (task) {
        //     task.isDone = isDone
        // }
        // setTasks1([...tasks1])
    }
    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists (todolists.map(el=>el.id===todolistId ? {...el,filter:value}: el))
        // setFilter(value)
    }
    // let tasksForTodolist = tasks1;
    // if (filter === "completed") {
    //     tasksForTodolist = tasks1.filter(t => t.isDone === true)
    // }
    // if (filter === "active") {
    //     tasksForTodolist = tasks1.filter(t => t.isDone === false)
    // }
    return (
        <div>
            {todolists.map((el) => {
                let tasksForTodolist = tasks1[el.id];
                if (el.filter === "completed") {
                    tasksForTodolist = tasks1[el.id].filter(t => t.isDone === true)
                }
                if (el.filter === "active") {
                    tasksForTodolist = tasks1[el.id].filter(t => t.isDone === false)
                }
                return (
                    <TodoList
                        key={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        todolistId={el.id}
                        removeTask={removeTask}
                        changeFilter={changeFilter} addTask={addTask}
                        changeStatus={changeStatus}
                        filter={el.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;

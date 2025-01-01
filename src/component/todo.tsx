import { useState } from "react";
import type { TodoType } from "../type";
import { api } from "../utils/api";
import UpdateTodoList from "./updateForm";

export default  function Todo({ todo }: { todo: TodoType }) {
  const[newtodo,setNewtodo]=useState('')
  const[switch1,setSwitch1]= useState(false)
  const trpc= api.useUtils()
  const { mutate } = api.todo.delete.useMutation({
    onSettled:async()=> await trpc.todo.all.invalidate()
  });
  const {mutate:toggle}= api.todo.toggle.useMutation({
    onSettled:async()=> await trpc.todo.all.invalidate()
  })
  const{id,done}=todo
  
  const handleChange=()=> {
    setNewtodo(todo.content)
    setSwitch1(!switch1)
  }
  return (
    <>
    <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="done"
            id="done"
            checked={done}
            onChange={(e)=> toggle({id:id,done:e.target.checked})}
            className="focus:ring-3 h-4 w-4 cursor-pointer rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <label
            htmlFor="done"
            className={`cursor-pointer  ${todo.done ? "line-through text-black " : ""}`}
          >
            {" "}
            {todo.content}{" "}
          </label>
        </div>
        <div className=" flex gap-1">
          <button 
        disabled={switch1}
        onClick={()=> mutate({id:id})}
        className="w-fit rounded-lg bg-blue-700 px-10 py-1 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Delete
        </button>
        <button 
         disabled={switch1}
          onClick={handleChange}
        className="w-fit rounded-lg bg-blue-700 px-4 py-1 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          
          Edit
        </button>
        </div>
        
        { switch1 && (<UpdateTodoList 
          id={id}
          content={todo.content}
          switch1={switch1}
          setSwitch1={setSwitch1}
          newtodo={newtodo}
         setNewtodo={setNewtodo}
        />)}
      </div>
     
    </>
  );
}

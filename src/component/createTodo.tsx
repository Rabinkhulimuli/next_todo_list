"use client"
import { useState } from "react";
import { todoInput } from "../type";
import toast from "react-hot-toast";

import { api } from "../utils/api"; 
export function CreateTodo() {
   const trpc= api.useUtils()
    const [newTodo,setNewTodo]= useState('')
    const {mutate}=api.todo.create.useMutation({
      onSettled:async()=> await trpc.todo.all.invalidate()
    })
   
  return (
    <>
      <form
      onSubmit={async(e)=> {
        e.preventDefault()
        const result= todoInput.safeParse(newTodo)
        if (!result.success){
          console.log("not valid")
          toast.error(result.error.format()._errors.join('\n'))
        }else{
        mutate(newTodo)
        setNewTodo("")
        }
        
      }}
      
      className="flex gap-2">
        {/* <CreatenewTodo  
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        /> */}
        <input
          type="text"
          onChange={(e)=> setNewTodo(e.target.value)}
          value={newTodo}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
        <button className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {" "}
          Create
        </button>
      </form>
    </>
  );
}

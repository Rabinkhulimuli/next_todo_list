import { useState ,type Dispatch,type SetStateAction} from "react"
import { api } from "src/utils/api"
export type props={
    id:number,
    content:string,
    switch1:boolean,
    setSwitch1: Dispatch<SetStateAction<boolean>>
    setNewtodo: Dispatch<SetStateAction<string>>
    newtodo:string
}
export default function UpdateTodoList({id,content,switch1,setSwitch1,newtodo,setNewtodo}:props){
  
    const trpc= api.useUtils()
    const{mutate:updateTodo}= api.todo.update.useMutation({
        onSettled:async()=> await trpc.todo.all.invalidate()
      })
    return (
        <>
        <div   className="flex items-center  fixed   bg-red-500 z-4 p-4 rounded-xl drop-shadow-lg  ">
       
        <form 
        onSubmit={(e)=> e.preventDefault()}
        
        >
            <input type="text"
            className="text-black block px-4 py-1 text-center text-sm rounded-lg "
            id="update"
            name="update"
            value={newtodo}
            onChange={(e)=>  setNewtodo(e.target.value)}
            
            />
            <div className=" flex gap-1 my-1" >
            <button 
             className="w-full rounded-lg bg-blue-700 px-4 py-1 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={()=> setSwitch1(!switch1)} >Cancel</button>
            <button 
             className="w-full rounded-lg bg-blue-700 px-4 py-1 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
             onClick={()=> { updateTodo({id:id,content:newtodo})
                               setSwitch1(!switch1) 
            }}
            >Update</button>
            </div>
            
        </form>
        </div>
        
        </>
    )
}
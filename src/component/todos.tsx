import { api } from "../utils/api";

import Todo from "./todo";
import type { TodoType } from "../type"; 

export default  function Todos() {
  const {data} = api.todo.all.useQuery()
 
  
  if (!data ) {
    return <div>Create your first todo</div>;
  } 
  return (
    <>
      {data.map((todo: TodoType) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </>
  );
}

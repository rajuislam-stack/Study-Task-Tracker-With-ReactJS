import { useState } from "react";
import TaskList from "./TaskList";

export default function FilterTask({taskListArr,onHandleCheck,onHandleDelete}) {
   const [currentActiveFilter, setCurrentActiveFilter] = useState('all');

   let tasksArr = [];

   if(currentActiveFilter == 'all'){
     tasksArr = taskListArr;
   }
   else if(currentActiveFilter == 'completed'){
    tasksArr = taskListArr.filter((obj)=>{
       return obj.isCompleted;
    })
   }
   else{
    tasksArr = taskListArr.filter((obj)=>{
      return !obj.isCompleted;
    })
   }
   
  
  return (
    <div>

      <div className="navigation-btn-section ">

        <button onClick={()=> setCurrentActiveFilter('all')} className={`basis-1 navigation-btn ${currentActiveFilter == 'all' ? 'bg-red-100':''}`}>
          All
        </button>

        <button onClick={()=> setCurrentActiveFilter('completed')} className={
          `basis-2 navigation-btn ${currentActiveFilter == "completed" ? 'bg-red-100':''}`
        }>
          Completed
         </button>

        <button onClick={()=> setCurrentActiveFilter('pending')} className={`navigation-btn ${currentActiveFilter == 'pending' ? 'bg-red-100':''}`}>
          Pending
        </button>
      </div>
       
      <TaskList tasksArr = {tasksArr} currentActiveFilter = {currentActiveFilter} onHandleCheck = {onHandleCheck} onHandleDelete = {onHandleDelete}/>
    </div>
  )
}

import TaskItem from "./TaskItem";

export default function TaskList({tasksArr,currentActiveFilter,onHandleCheck,onHandleDelete}) {
  
  let emptyMessage;

  if(currentActiveFilter == 'all' ){
    emptyMessage = 'No tasks yet. Add your first study task.';
  }
  else if(currentActiveFilter == 'completed'){
    emptyMessage = "No completed tasks.";
  }
  else{
   emptyMessage = "No pending tasks.";
  }
  
  return (
    <div className="flex flex-col gap-2 mt-4 w-full">
      {tasksArr.map((obj)=>{
      return  <TaskItem key={obj.id} taskObj = {obj}  onHandleCheck = {onHandleCheck} onHandleDelete = {onHandleDelete}/>
      })}

      <p className="mt-4 text-gray-500 dark:text-gray-400">{!tasksArr.length ? (emptyMessage): ''}</p>
    </div>
  )
}

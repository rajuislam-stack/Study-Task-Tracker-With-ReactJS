
export default function TaskItem({taskObj,onHandleCheck, onHandleDelete}) {
 
  return (
    <div className="task-item">
      <label className="flex justify-center items-center cursor-pointer min-w-0 wrap-break-word p-1">
        <input
         type="checkbox"
         checked = {taskObj.isCompleted}
         onChange={(e)=> onHandleCheck({...taskObj, isCompleted: e.target.checked})}
         className="mr-2 peer accent-purple-200 cursor-pointer" 
         />

        <span className="peer-checked:line-through peer-checked:text-gray-400 min-w-0 wrap-break-word">{taskObj.title}</span>
      </label>

      <button className=" text-red-400 cursor-pointer" onClick={()=>{
         onHandleDelete(taskObj.id);
      }}>
        Delete
      </button>
    </div>
  )
}

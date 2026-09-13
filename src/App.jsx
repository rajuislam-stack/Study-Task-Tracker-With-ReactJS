import { useRef, useState } from "react";
import AddTask from "./components/AddTask";
import FilterTask from "./components/FilterTask";
import TaskSummary from "./components/TaskSummary";
import { taskListMain } from "../Data";

export default function app() {
  const [taskListArr, setTaskListArr] = useState(taskListMain);
  const [isEmptyInput, setIsEmptyInput] =  useState(false);
  const [selectedMode, setSelectedMode] = useState('');
  let refId = useRef(-1);
  let refInput = useRef(null);

  const summaryObj = taskListArr.reduce((acc, obj, i , arr)=>{
          acc.allCount = arr.length;
          acc.completedCount = obj.isCompleted ? (acc.completedCount + 1) : (acc.completedCount);
          acc.pendingCount =  arr.length - acc.completedCount;

          return acc;
  }, {allCount:0,completedCount:0, pendingCount: 0})

  
  function handleAddTask(inputText){
    let title = inputText.trim();
    
    if(!title){
      setIsEmptyInput(true);
      refInput.current.focus();
      return;
    }

    setTaskListArr([
      ...taskListArr,
      {id: refId.current = refId.current + 1, title: title , isCompleted: false}
    ])
    
    setIsEmptyInput(false);
    refInput.current.focus();
  }

  function handleCheck(updatedObj){
   setTaskListArr( taskListArr.map((obj)=>{
      if(obj.id == updatedObj.id){
        return updatedObj;
      }
      else{
        return obj;
      }
   }))
  }

  function handleDelete(id){
     setTaskListArr( taskListArr.filter((obj)=> obj.id !== id))
  }




  //Light & Dark Mode

let htmlElement = document.documentElement;

function addMode(mode){

  if(mode == 'light'){
   htmlElement.classList.add('light');
   htmlElement.classList.remove('dark');
  }
  else if(mode == 'dark'){
    htmlElement.classList.add('dark');
    htmlElement.classList.remove('light');
  }

  else{
    if(window.matchMedia("(prefers-color-scheme: dark)").matches){
     htmlElement.classList.add('dark');
     htmlElement.classList.remove('light');
    }
    else{
      htmlElement.classList.add('light');
      htmlElement.classList.remove('dark');
    }
  }
}


 if(selectedMode == 'light'){
   localStorage.setItem('theme', 'light');
   addMode('light');
 }
 else if(selectedMode == 'dark'){
  localStorage.setItem('theme', 'dark');
  addMode('dark');
 }
 else if(selectedMode == 'device'){
  localStorage.setItem('theme', 'device');
  addMode('device');
 }


window.addEventListener('load', ()=>{
  let currentMode = localStorage.getItem('theme');
  let devicePrefers = window.matchMedia("(prefers-color-scheme: dark)").matches;


  if(!currentMode){
    addMode('device');
    setSelectedMode('device');
  }
  else if( currentMode == 'light'){
    addMode('light')
    setSelectedMode('light')
  }
  else if(currentMode == 'dark'){
    addMode('dark');
    setSelectedMode('dark')
  }
  else if(currentMode == 'device'){
    if(devicePrefers){
      addMode('dark');
      setSelectedMode('device')
    }
    else{
      addMode('light');
      setSelectedMode('device')
    }
  }
  
})
 


let prefsMode = window.matchMedia("(prefers-color-scheme: dark)");

prefsMode.addEventListener('change', (e)=>{
   let currentMode = localStorage.getItem('theme');
  
    if(!currentMode || currentMode === 'device'){
       addMode('device');
    }
})



  

  return (
    <div className="app-style">

     <div className="flex justify-between items-center dark:text-white">
       <p className="font-semibold text-purple-800">STUDY SPACE</p>  
      
       <div>
        <span>Mode:</span>
        <select
         value={selectedMode}
         onChange={(e)=> {
          setSelectedMode(e.target.value)
         }}
         
        >
        <option value="light" className="dark:text-gray-900">Light</option>
        <option value="dark" className="dark:text-gray-900">Dark</option>
        <option value="device" className="dark:text-gray-900">Device</option>
       </select>
       </div>
     </div>

      <h1>Study Task Tracker</h1>
      <p className="text-gray-600 mb-3 dark:text-gray-400">Small steps. Better learning</p>

      <TaskSummary summaryObj = {summaryObj}/>

      <AddTask onHandleAddTask = {handleAddTask} isEmptyInput = {isEmptyInput} onSetIsEmptyInput = {setIsEmptyInput} refInput = {refInput}/>

      <FilterTask taskListArr = {taskListArr} onHandleCheck = {handleCheck} onHandleDelete = {handleDelete}/>
    </div>
  )
}

import { useState } from "react"

export default function AddTask({onHandleAddTask,isEmptyInput,onSetIsEmptyInput, refInput}) {
  const [inputText,setInputText] = useState('');
  
  let warningMessage;
  let inputTextLength = inputText.trim().length;

  if(isEmptyInput){
    warningMessage = "Please enter a task title.";
  }
  else if(inputTextLength >= 80){
    warningMessage = "You reached the charecter limit.";
  }

  return (
    <div className="flex-style flex-col md:flex-row">

      <div className="py-2 w-full ">

        <label>

        <span className="font-extrabold dark:text-gray-200">Task title</span> <br />

        <input type="text"
         value={inputText}
         onChange={(e)=> {
          onSetIsEmptyInput(false);
    
          if(e.target.value.trim().length > 80) return;

          setInputText(e.target.value);

         }}

         onKeyDown={(e)=>{
           if(e.key == 'Enter'){
              onHandleAddTask(inputText);
              setInputText('');
           }
         }}
         
         placeholder="What will you study next?"
         ref={refInput} 
         className="input-style"
         />
      </label>
     
      <div className="flex justify-between items-center">
         <p className="text-nowrap mr-1 text-red-400">{warningMessage}</p>
         <p className="dark:text-gray-300">{inputTextLength}\80</p>
      </div>
      
      
      </div>

      <button onClick={()=> {
        onHandleAddTask(inputText);
        setInputText('');
      }}  className="btn-style cursor-pointer">
        Add Task
      </button>

    </div>
  )
}

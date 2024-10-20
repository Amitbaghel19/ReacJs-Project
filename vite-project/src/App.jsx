import React, { useState } from 'react'

function App() {
    const [num, changeNum] = useState(0);
    const add=()=>{
      changeNum(num+1);
    }
    const sub=()=>{
      changeNum(num-1);
      if(num<1){
        alert("can't decrease")
        changeNum(0);
      }
    }
  return (
    <div>
         <button onClick={add}>+</button>
      <input value={num}></input>
      <button onClick={sub}>-</button>
       
    </div>
  )
}

export default App

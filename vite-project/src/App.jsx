import React, { useState } from 'react'

function App() {
    const [num, changeNum] = useState(0)
  return (
    <div>
         <button onClick={()=> changeNum(num+1)} id='plus'>+</button>
      <input type='text' id='input-field' value={num}></input>
      <button onClick={()=> {changeNum(num-1)
        if(num<1){
          alert("can't decreement")
          changeNum(0)
        }
      
      }} id='minus'>-</button>
    </div>
  )
}

export default App

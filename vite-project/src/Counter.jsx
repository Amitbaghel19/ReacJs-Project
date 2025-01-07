import React, { useState } from 'react'

function Counter() {
    const [count, setcount] = useState(0);

    const handler=()=>{
        setcount(count=>count+1)
        setcount(count=>count+1)
        setcount(count=>count+1)
           
    }
  return (
    <div>
      <button onClick={handler}>submit</button>
      <h1>{count}</h1>
    </div>
  )
}

export default Counter

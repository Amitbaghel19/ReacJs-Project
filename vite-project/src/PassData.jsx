import React from 'react'
import ObjectInProps from './ObjectInProps'


function PassData() {
    const person={
        name:"amit",
        age:21,
        course:"Btech",
        number:[90,67,88]
    }

    const data=[
        {
            name:"am"
        },
        {
            fullname:"amit baghel"
        }
    ]
  return (
    <div>
      {/* <ObjectInProps details={person} /> */}
      <ObjectInProps  details={person} dt={data[0].name} />
      
    </div>
  )
}

export default PassData

import React from 'react'
import{ useState,useEffect } from 'react';
function TodoList() {
    const [input, setInput] = useState("")
    const [todo,setTodo]=useState([]);
    const [editId,setEdit]=useState(null)
    const [error,setError]=useState("");

    // pagination concept

    const [currentPage,setCurrentPage]=useState(1);
    const recordsPerPage=5;
    const totalRecord=todo.length;
    const totalPage=Math.ceil(totalRecord/recordsPerPage);

    // for index of records
    const indexOfLastRecord= currentPage * recordsPerPage;
    const indexOfFirstRecord=indexOfLastRecord-recordsPerPage;
    const currentRecord=todo.slice(indexOfFirstRecord,indexOfLastRecord);

    const Handler=()=>{
        if(input!==""){
              if(editId!==null){
                const update=todo.map((item)=>
                    item.userId==editId ?{...item,data:input}:item
                );
                 if(!todo.some((item)=>item.data.toLowerCase().replaceAll(' ', '')===input.toLowerCase().replaceAll(' ', ''))){
                setTodo(update);
                setEdit(null)
                setError("")
                 }
              else{
                setError("Already exist")
                
              }
              }
              else{

              if(!todo.some((item)=> item.data.toLowerCase().replaceAll(' ', '')===input.toLocaleLowerCase().replaceAll(' ', ''))){
                let uniqueId= (Math.floor(Math.random() * 500) + 6000);
               setTodo([...todo,{data:input,userId:uniqueId}]);  
               setError("")
        
              //  pagination concept *********

             const itemOnCurrentPage=todo.slice(indexOfFirstRecord,indexOfLastRecord).length;
             if(itemOnCurrentPage>=5){
             setCurrentPage((prev)=>prev+1)
              }
             
              }
              else{
          setError("Already exist")
        }   
    }
    setInput("");
    }     

    }
      const handleRemove=(userId)=>{
       const removeItem=todo.findIndex(todoList=>
           todoList.userId===userId);

       if(removeItem!==-1){
        let arr=[...todo];
        arr.splice(removeItem,1);
        setTodo(arr)
           
       }
       
      }
            // for sorting by id

      const handleSort=()=>{
        const sort=[...todo].sort((a,b)=> a.userId-b.userId);
        setTodo(sort);
      }

//   for sorting by title

      const handleSortByTitle=()=>{
        const sort=[...todo].sort((a,b)=> a.data.localeCompare(b.data));
        setTodo(sort);
      }  

    //   Edit ***********

        const handleEdit=(item)=>{
         setInput(item.data)
         setEdit(item.userId);    
        }    

        // pagination handler    
        const nextPage=()=>{
         setCurrentPage((prev)=>Math.min(prev+1,totalPage));
        }

        const previousPage=()=>{
          setCurrentPage((prev)=>Math.max(prev-1,1));
        }
      
        useEffect(() => {
          if (currentRecord.length === 0 && currentPage > 1) {
            ((prev) => prev - 1);

          }
        }, [currentRecord]);
      

        
  return (
    <>
    <div className='container'>
      <input id='input-box'  type='text'  placeholder='  Enter title' value={input} onChange={(e)=>setInput(e.target.value)}></input>
      <button id='add' onClick={Handler} 
      > {editId ? "Update" : "Add"}</button><br></br><br></br>
            { error ? <p style={{ color: 'red', marginLeft:'30px' }}>{error}</p> : null}
      <table id='table'>
        <div id='main'>
       <tr>

            <th style={{paddingRight:"100px"}} >Id
                </th> 
            <th>Title
                </th>    
        </tr>
        <tbody>
            {
                currentRecord.map((todos,userId)=>(
                    <tr>
                        <td>{todos.userId} </td>
                        <td>{
                        todos.data}</td><button id='remove' onClick={()=> handleRemove(todos.userId)}>Remove</button>
                        <button id='edit' onClick={()=>handleEdit(todos)}>Edit</button>
                    </tr>
                ))
            }
        </tbody>
        </div>
           </table>
       
           <button id='sort' onClick={handleSort}>sort by id</button>
           <button id='title' onClick={handleSortByTitle}>sort by title</button>
                     </div>
                     
                     <div className='page'>
                     <button onClick={previousPage} disabled={currentPage===1}>Previous</button>
                     <span>Page <b>{currentPage}</b></span>
                     <button onClick={nextPage} 
                     disabled={currentPage===totalPage || currentRecord.length===0}>Next</button>
                   </div>
                 </>
  )
}
export default TodoList

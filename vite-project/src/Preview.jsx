import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Preview = ({previewData,onDelete, handleSubmit,handledit}) => {
  const navigate = useNavigate();
  const renderContentBlocks = (content) => {

    const parsed = JSON.parse(content)
    console.log("elemdata",parsed)
    return parsed.blocks.map((block, index) => {
         
      if (block.type === "paragraph" || block.type === "header") {
        return <div key={index} dangerouslySetInnerHTML={{ __html: block.data.text }} />;
      } else if (block.type === "list") {

        if (block.data.style === "checklist") {
          // Checklist rendering
          return (
            <ul key={index} style={{ listStyleType: "none", paddingLeft: "0" }}>
              {block.data.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    style={{ marginRight: "8px" }}
                    checked={item.meta?.checked || false} // Handle the checked state
                    onChange={(e) => {
                      item.meta = { ...item.meta, checked: e.target.checked };
                    }}
                  />
                  {item.content}
                </li>
              ))}
            </ul>
          );
        }


        return (
          <ul className='ml-[2%]' key={index} style={{listStyle:block.data.style==="ordered" ? "decimal":"disc"}}>
            {block.data.items.map((item, itemIndex) => (
              <li key={itemIndex}>{item.content}</li>
            ))}
          </ul>
        );
      } else if (block.type === "image") {
        return (
          <div key={index} className="my-4">
            <img
              src={block.data.file.url}
              alt="Content"
              className="w-[700px] h-[300px] object-cover border rounded-md"
            />
          </div>
        );
      } 
     
      else {
        return null; 
      }
    });
  };
  
  const onSubmit=(elem)=>{
    handleSubmit(elem);
    onDelete(previewData.indexOf(elem))
    navigate("/Data");
  
  }

  
  const gotoPrevious=(elem)=>{
    handledit(elem)
    onDelete(previewData.indexOf(elem))
    navigate("/Blog");
  }

  

  return (
    <div className='h-[60vh] w-[100vw] text-black mt-[100px]'>
        {previewData.map((elem, index) => {
          
        return (
          <div key={index} className='border border-b-2 mx-[100px] border-black'>
            <h1 className='font-semibold'>Title:{elem.title}</h1>
            <h1 className='font-semibold'>Author: {elem.author}</h1>
            {elem.imagePreview && (
              <div className='mx-[500px] flex justify-end'>
                <img 
                  src={elem.imagePreview} 
                  alt="image" 
                  className='w-[700px] h-[150px] object-cover border rounded-md' 
                />
              </div>
            )}

            <h1 className='font-semibold'>Description: {elem.description}</h1>
            <h1 className='font-semibold'>Country: {elem.country}</h1>
            <h1 className='font-semibold'>State: {elem.state}</h1>
            <h1 className='font-semibold'>City: {elem.city}</h1>
           
           

        <span className='font-semibold '>Content:</span>
        <div>{renderContentBlocks(elem.content)}</div>
        

            <button className='bg-black w-[100px] text-white mx-[300px] rounded-md mb-2' onClick={()=>gotoPrevious(elem)}>Previous</button>
             {/* <button onClick={() => onDelete(index)}  className='bg-red-400 w-[100px] text-black rounded-md hover:bg-red-300'>Delete</button> */}
             <button className='mx-[20px] bg-amber-600 text-white w-[100px] rounded-md' onClick={()=>onSubmit(elem)}>Submit</button>

          </div>
        );
      })}
      
      
    </div>
  )
}




export default Preview

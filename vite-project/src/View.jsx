import React, { useEffect, useState,useContext } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { ThemeContext,themes } from './context/ThemeContext'

function View({selectedData}) {
      const navigate = useNavigate();
      const {theme}=useContext(ThemeContext);
  
    

    const gotoPrevious=(elem)=>{
        navigate("/Data");
      }


      
    const renderContentBlocks = (content) => {

        const parsed = JSON.parse(content)
        console.log("elemdata",parsed)
        return parsed.blocks.map((block, index) => {
             
          if (block.type === "paragraph" || block.type === "header") {
            return <div key={index} dangerouslySetInnerHTML={{ __html: block.data.text }} />;
          } else if (block.type === "list") {
    
            if (block.data.style === "checklist") {
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
  return (
    <>
    

<div className='max-w-3xl mx-auto p-6  shadow-lg  rounded-lg mt-10'>
  <div className='space-y-6'>
    <h1 className={`text-2xl font-bold text-center ${theme===themes.light ? `text-black` :`text-white`}`}>Article Details</h1>

    {selectedData ? (
      <div className="space-y-4">
        <h2 className="text-3xl text-blue-700 font-semibold">{selectedData.title}</h2>
        
        <div className={`text-sm ${theme===themes.light ?`text-gray-700` :`text-white`}`}>
          <p><b>Author:</b> <span>{selectedData.author}</span></p>
          <p><b>Country:</b> {selectedData.country}</p>
          <p><b>State:</b> {selectedData.state}</p>
          <p><b>City:</b> {selectedData.city}</p>
        </div>

        <p className={` flex justify-center ${theme===themes.light ?`text-gray-700` :`text-white`}`}>{selectedData.description}</p>

        {selectedData.imagePreview && (
          <div className="flex justify-center my-6">
            <img
              src={selectedData.imagePreview}
              alt="Preview"
              className="w-[80%] h-auto object-cover border rounded-md shadow-md"
            />
          </div>
        )}

        <div className={`prose ${theme===themes.light ?`text-gray-700`:`text-white`}`}>
          {renderContentBlocks(selectedData.content)}
        </div>

      </div>
    ) : (
      <p className="text-center text-gray-500">No data found</p>
    )}

    <div className="flex justify-center">
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        onClick={gotoPrevious}
      >
        Previous
      </button>
    </div>
  </div>
</div>





    </>
  )
}

export default View

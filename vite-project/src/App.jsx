import React, { useState,useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import Home from './Home'
import { Route, Routes,useNavigate } from 'react-router-dom';
import Blog from './Blog';
import Datashow from './Datashow';
import Preview from './Preview';
import View from './View'
import axios from 'axios'
import "./global.css"
import {ThemeContext,themes} from './context/ThemeContext'
function App() {
  const [selectedData, setSelectedData] = useState(null); // Store selected data
  const navigate = useNavigate();
  const location = useLocation();
    const [reset, setReset] = useState(0)
   const [dataArray, setDataArray] = useState([]);
   const [previewData, setPreviewData] = useState([]); // For preview data
    const [edit, setEdit] = useState([]) 
    const [theme,setTheme]=useState(themes.light)
    const handleReset=(e)=>{
         setReset(e);
      }
     
      

      useEffect(() => {
        fetch("http://localhost:5000/dataArray")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            return response.json();
          })
          .then((data) => {
            setDataArray(data); // Update the state with fetched data
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []);
      
     
   const arr = (newdata) =>{
       setDataArray((prev)=>[...prev,newdata])
   }

   const setPreview=(newdata)=>{
      setPreviewData((prev)=>[...prev,newdata])
   }
    
   const handleView = (elem) => {
    setSelectedData(elem); // Set the selected data in central state
    navigate(`/view/${elem.id}`); // Navigate to the view page

  };

  


   const handleDelete = (indexToDelete) => {
    const updatedArray = previewData.filter((_, index) => index !== indexToDelete);
    setPreviewData(updatedArray);
  };

  const confirmationDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item ?");
    if (isConfirmed) {
      deleteHome(id);
    }
  };
  

  const deleteHome = async (indexToDelete) => {
    const deletedItem = dataArray[indexToDelete];
    try {
      await axios.delete(`http://localhost:5000/dataArray/${deletedItem.id}`);
      const updatedArray = dataArray.filter((_, index) => index !== indexToDelete);
      setDataArray(updatedArray);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  

  const handleSubmit = async (formData) => {
    try {
      if (formData.id) {
        await axios.put(`http://localhost:5000/dataArray/${formData.id}`, formData);
        alert("Successfully updated!");
        
        setDataArray((prevData) => {
          return prevData.map((item) =>
            item.id === formData.id ? formData : item
          );
        });
      } else {
        await axios.post("http://localhost:5000/dataArray", formData);
        alert("Successfully added!");
        
        setDataArray((prev) => [...prev, { ...formData, id: Date.now() }]);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  

  const handledit = (elem) =>{
           setEdit(elem);
           navigate(`/Blog/${elem.id}`); // Navigate to the edit page

      } 

      useEffect(() => {
        document.body.style.backgroundColor = theme === themes.light ? '#ffffff' : '#121212';
        document.body.style.color = theme === themes.light ? '#000000' : '#ffffff';
      }, [theme]);
    

      
       const changeTheme=()=>{
        setTheme((prevTheme) => (prevTheme === themes.light ? themes.dark : themes.light));
      }

     
       
  
  return (
    <div className='h-[100vh] w-[100vw] '>
      <ThemeContext.Provider value={{theme,changeTheme}}>
       <Home handleReset={handleReset} edit={edit} setEdit={setEdit}   />
      <Routes>
      <Route path='/view/:id' element={<View dataArray={dataArray} selectedData={selectedData} />}/>
         <Route path='/Data' element={<Datashow dataArray={dataArray} deleteHome={confirmationDelete} handleSubmit={handleSubmit} handleView={handleView} handledit={handledit}/>}/>
         <Route path='/Blog/:id' element={<Blog key={location.key} handleReset={handleReset} reset={reset} arr={(newData) => setDataArray((prev) => [...prev, newData])}  setPreview={setPreview} handleSubmit={handleSubmit} edit={edit} dataArray={dataArray} />} />

         <Route  path='/Blog' element={<Blog key={location.key} handleReset={handleReset} reset={reset} arr={(newData)=>setDataArray((prev)=>[...prev,newData])} dataArray={setDataArray}   setPreview={setPreview} handleSubmit={handleSubmit} edit={edit} />}/>
         <Route path='/preview' element={<Preview  previewData={previewData} onDelete={handleDelete} handleSubmit={handleSubmit} handledit={handledit}/>}></Route>
      </Routes>
    
      </ThemeContext.Provider>

    </div>
  )
}

export default App

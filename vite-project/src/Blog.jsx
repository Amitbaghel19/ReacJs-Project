import React,{useEffect, useRef, useState} from 'react'
import { useNavigate,useLocation, useParams} from 'react-router-dom';
import Home from './Home'
import Preview  from './Preview';
import { Country, State, City } from "country-state-city";
import EditorJS from '@editorjs/editorjs';
import Header from "@editorjs/header";
import EditorjsList from '@editorjs/list';
import Table from '@editorjs/table'
import ImageTool from '@editorjs/image';
import ChangeCase from 'editorjs-change-case';

function Blog({arr,dataArray,setPreview,onNavigate,handleSubmit,edit,reset,handleReset,temp,handletemp,handlefinal}) {
  const editorInstance=useRef();
  const contextRef = useRef(null);
  const location = useLocation(); 
    const navigate = useNavigate();
    const {id}=useParams();
    const [error,setError]=useState({})
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        author: '',
        country: '',
        state: '',
        city: '',
        imagePreview: null,
        content:''
      });


      
      useEffect(() => {
        if(reset>0 && edit)
        {
          resetForm();
          handleReset(0)
          edit = "";
        }
        
      }, [reset])
      

        const resetForm = () => {
          setFormData({
            title: '',
            description: '',
            author: '',
            country: '',
            state: '',
            city: '',
            imagePreview: null,
            content: '',
          });
      
        };
      
        useEffect(() => {
          if(location.pathname=="/Blog"){
            setFormData({
              title: '',
            description: '',
            author: '',
            country: '',
            state: '',
            city: '',
            imagePreview: null,
            content: '',
            })
          }
        
          
        }, [location.key])
        
      
      const onSubmit = (e) => {
        e.preventDefault();     
        handleSubmit(formData)
        navigate('/Data');
        setFormData({
          title: '',
          description: '',
          author: '',
          country:'',
          state: '',
          city: '',
          imagePreview: null,
          content:''

        });
      };


      

      const handleChange = (e) => {
        const { name, value } = e.target;
        setError((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      
        setFormData((prevData) => ({
          ...prevData,
          [name]: value || "" 
        }));
      
      };

    
const contentChange = () => {
  const editor = new EditorJS({
    holder: 'editorJs',
    
    data: edit.content ? JSON.parse(edit.content) : {
      blocks :[
        {
          type:"paragraph",
          data : {text:""},
        },
      ],
    }, 

    onReady: () => {
      editorInstance.current = editor;
    },
    autofocus: true,
    onChange: async () => {
      const data = await editor.saver.save();

      setFormData((prev) => ({
        ...prev,
        content: JSON.stringify(data), 
      }));
      
      setError((prevErrors) => ({
        ...prevErrors,
        content: "", 
      }));

     

    },
    tools: {
      header: {
        class: Header,
      },
      list: {
        class: EditorjsList,
        inlineToolbar: true,
        config: {
          itemTags:['ul','ol'],
        },
      },
      changeCase: {
        class: ChangeCase,
        config: {
          showLocaleOption: true,
          locale: 'tr',
        },
      },
      table: {
        class: Table,
        inlineToolbar: true,
        config: {
          rows: 2,
          cols: 3,
          maxRows: 5,
          maxCols: 5,
        },
      },
      image: {
        class: ImageTool,
        config: {
          uploader: {
            uploadByFile: async (file) => {
              return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                  resolve({
                    success: 1,
                    file: {
                      url: reader.result, // Base64 string representing the image
                    },
                  });
                };
                reader.onerror = () => {
                  reject({
                    success: 0,
                    message: 'File reading failed',
                  });
                };
                reader.readAsDataURL(file); // Read file as base64 string
              });
            },
          },
        },
      },
    },
  });
};



useEffect(() => {
  if (!edit) {
    setFormData({ title: "",description:"", content: "",author:"",imagePreview:"",country:"",state:"",city:"" }); // Clear the form for a new entry
  } else {
    setFormData(edit); // Populate form with data for editing
  }
}, [edit]);


      useEffect(() => {
        if(editorInstance.current===null){
          contentChange();
        }
        return ()=>{ editorInstance?.current?.destroy();
        editorInstance.current=null
        }
      }, [])


      const handleFileChange = (e) => {
        const file = e.target.files[0];
 
        if (file) {
          const reader = new FileReader(); 
          reader.onload = (event) => {
            setFormData((prevData) => ({
              ...prevData,
              imagePreview: event.target.result, 
            }));

            setError((prevErrors) => ({
              ...prevErrors,
              imagePreview: "", 
            }));
      
          
          };
          reader.readAsDataURL(file); 
        }
      };
       
      const handlePreview=(e)=>{
        e.preventDefault();
        const newErrors={
          
        };

        if (!formData.title)
           newErrors.title = "Title is required.";
        if (!formData.description)
           newErrors.description = "Description is required.";
        if (!formData.author)
           newErrors.author = "Author name is required.";
        if (!formData.country) 
          newErrors.country = "Country is required.";
        if (!formData.state) 
          newErrors.state = "State is required.";
        if (!formData.city) 
          newErrors.city = "City is required.";
        if(!formData.imagePreview)
          newErrors.imagePreview="file/media is required"
        if (!formData.content)
           newErrors.content = "Content is required.";
      
         setError(newErrors);

         if (Object.keys(newErrors).length > 0) return;
         
        
          setPreview(formData)
          navigate("/preview");
          
       
        
    }
   
      
  const countries = Country.getAllCountries();
  const states = formData.country ? State.getStatesOfCountry(formData.country) : [];
  const cities = formData.state ? City.getCitiesOfState(formData.country, formData.state) : [];

  const handleCountryChange = (e) => {
    setError((prevErrors) => ({
      ...prevErrors,
      country: "", 
    }));
    setFormData({ ...formData, country: e.target.value, state: "", city: "" });
  };

  const handleStateChange = (e) => {
    setError((prevErrors) => ({
      ...prevErrors,
      state: "", 
    }));
    setFormData({ ...formData, state: e.target.value, city: "" });
  };

  const handleCityChange = (e) => {
    setError((prevErrors) => ({
      ...prevErrors,
      city: "", 
    }));
    setFormData({ ...formData, city: e.target.value });
  };

    
  return (
    <div className='mx-[35%]'>


        <form  className='border rounded-md border-black  w-[500px] mt-[130px] bg-slate-300' >
        <div className='flex justify-between flex-col border-solid px-4 '>
       <h1 className='ml-[200px] inline-block font-bold '>Form Data</h1>
        <label className='mt-[20px]' >Title </label>
           <input name='title' className='border  mt-2 h-[40px] rounded-md border-black'  type="text" value={formData.title} onChange={handleChange}  />
          {error.title && (
            <p className='text-red-600 font-semibold'>{error.title}</p>
          )}
        <label >Description</label>
        <textarea name='description' rows={3} cols={30} className='border rounded-md border-black' value={formData.description} onChange={handleChange} ></textarea>
        {error.description && (
            <p className='text-red-600 font-semibold'>{error.description}</p>
          )}
        <label >Author Name</label>
        <input name='author' className='border mt-2 h-[40px] border-black rounded-md'  type="text" value={formData.author} onChange={handleChange} />
        {error.author && (
            <p className='text-red-600 font-semibold'>{error.author}</p>
          )}
        <label>Country</label>
          <select value={formData.country} onChange={handleCountryChange} className="rounded-md border mt-4 h-[30px] border-black"    >
            <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name}
          </option>
        ))}</select>
           {error.country && (
            <p className='text-red-600 font-semibold'>{error.country}</p>
          )}
       {formData.country  && states.length>0 && (
       <>
        <label >Select State</label>
        <select value={formData.state} onChange={handleStateChange} disabled={!formData.country} className='rounded-md border mt-4 h-[30px] border-black'   >  
        <option value="">select states</option>
        {states.map((state)=>(
          <option key={state.isoCode} value={state.isoCode}>
          {state.name}
          </option>
        ))}
       
        </select>
        {error.state  && states.length>0 &&<p className="text-red-500 font-semibold text-sm">{error.state}</p>}

        </>
       )}
       
        {formData.state  &&  cities.length>0 &&(
        <>
        <label className='mt-2'>Select city</label>
        <select value={formData.city} onChange={handleCityChange} disabled={!formData.state} className=' rounded-md mt-4 h-[30px] border border-black'   >
            <option value="">select city</option>
            {cities.map((city)=>(
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
        </select>
        {error.city && cities.length>0 && (
            <p className='text-red-600 font-semibold'>{error.city}</p>
          )}

        </>
        )}
       
        <label className='mt-4'>Media</label>
        <input type="file" onChange={handleFileChange} />
        {formData.imagePreview && (
            <div className="mt-4">
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="w-full h-auto rounded-md border"
              />
            </div>
          )}
     
        </div>
        {error.imagePreview && (
            <p className='text-red-600 font-semibold ml-[10px]'>{error.imagePreview}</p>
          )}

      
        <div className='px-2 mt-3'  >
          <label  className='mt-3 '>Content</label>
          <div  id="editorJs" ref={contextRef}
             className=" border border-black rounded-md p-2"></div>
        </div>
        
        {error.content && (
            <p className='text-red-600 font-semibold ml-[10px]'>{error.content}</p>
          )}

        <div className='mt-2'>
            <button onClick={handlePreview} type='button' className='mb-2 mx-40 h-12  bg-blue-500 w-[200px] rounded-lg text-white' >
               {id ? "Update":"submit" }
            </button>
       


        </div>
       </form>
      
    </div>
  )
}

export default Blog
  
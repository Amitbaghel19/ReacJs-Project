import React,{useState,useEffect,useContext} from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from 'react-router-dom';
import { ThemeContext,themes } from './context/ThemeContext'

const Datashow = ({ dataArray,deleteHome,handleSubmit,handleView,handledit}) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigate = useNavigate();
    const {theme}=useContext(ThemeContext)

  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle expand/collapse
  };
   

  const [currentPage,setCurrentPage]=useState(1);
  const recordsPerPage=2;
  const totalRecord=dataArray.length;
  const totalPage=Math.ceil(totalRecord/recordsPerPage);


  const indexOfLastRecord= currentPage * recordsPerPage;
  const indexOfFirstRecord=indexOfLastRecord-recordsPerPage;


  const currentRecord = dataArray.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );


  useEffect(() => {
    if (totalRecord > 0 ) {
      setCurrentPage(totalPage)
    }
  }, [totalRecord,totalPage]);



    const handlerEdit = (elem) => {
      const index = dataArray.findIndex((item) => item === elem); 
      if (index !== -1) {
        const updatedArray = [...dataArray];
        const updatedItem = {
          ...elem,
        };
        updatedArray[index] = updatedItem;     
        handledit(updatedItem); 
      }
    };


  

  const handlePageClick = (page) => {
    if (page === "...") return; // Do nothing if "..." is clicked
    setCurrentPage(page);
  };

 
  const getPagination = () => {
    const pages = [];
    const pageNeighbors = 1;

    pages.push(1);

    const startPage = Math.max(2, currentPage - pageNeighbors);
    const endPage = Math.min(totalPage - 1, currentPage + pageNeighbors);

    if (startPage > 2) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPage - 1) {
      pages.push("...");
    }

    if (totalPage > 1) {
      pages.push(totalPage);
    }

    return pages;
  };


  const renderContentBlocks = (content) => {
    const parsed = JSON.parse(content)

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
      } else {
        return null; 
      }
    });
  };

return (
  

// card form ui

<div className="mt-10 text-black">
<div className="grid grid-cols-1 gap-6 w-[95%] ml-[3%]">
  {currentRecord.map((elem, index) => {
    return (
      <div
        key={index}
        className="flex flex-col md:flex-row border border-gray-300 rounded-lg shadow-md p-4"
      >
        {/* Left Side: Image */}
        {elem.imagePreview && (
          <div className="flex-shrink-0 w-full md:w-1/3 mb-4 md:mb-0">
            <img
              src={elem.imagePreview}
              alt="Preview"
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        )}

        <div className="flex-grow pl-0 md:pl-4">
        
        <h2 className={`font-bold text-lg ${theme === themes.light ? 'text-black' : 'text-white'}`}>
                  {elem.title}
                </h2>

          {/* <h2 className="font-bold text-lg ">{elem.title}</h2> */}
          <p className="text-sm text-blue-600">By: {elem.author}</p>
          <p className={`font-medium text-lg ${theme===themes.light ? `text-gray-700`:`text-gray-200`}`}>{elem.description}</p>

         

          {/* Buttons */}
          <div className="flex  justify-center items-center gap-10 mt-[150px] mr-[40%]">
            <button
              className="text-red-600"
              onClick={() => deleteHome(index)}
            >
              <DeleteIcon />Delete
            </button>
            <button
              className="text-blue-600"
              onClick={() => handleView(elem)}
            >
              <RemoveRedEyeIcon />View
            </button>
            <button
              className="text-green-600"
              onClick={() => handledit(elem)}
            >
              <CreateIcon />Edit
            </button>
          </div>

         
        </div>
      </div>
    );
  })}
</div>

{/* Pagination */}
<div className="pagination mt-6 flex justify-center">
  {getPagination().map((page, index) => (
    <button
      key={index}
      onClick={() => handlePageClick(page)}
      className={`px-3 py-1 mx-1 ${
          currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200"
      } rounded`}
      
      disabled={page === "..."}
    >
      {page}
    </button>
  ))}
</div>
</div>



  )
}

export default Datashow;

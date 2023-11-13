// @ts-nocheck
import axios from "axios"
import { useEffect, useState } from "react"
import ReactPaginate from 'react-paginate'
import "./paginate.css"
import { ScaleLoader } from "react-spinners"
import { Modal } from "@mui/material"
import {RxCross2} from "react-icons/rx"
import Recomendation from "./Recomendation"
import Header from "./Header"
import {LiaLightbulb} from "react-icons/lia"
import { AiOutlineClose } from "react-icons/ai"
import OverviewDetails from "./OverviewDetails"
const Dashboard = () => {
  const [data,setData]=useState([])
  const [data2,setData2]=useState([])
  const [open,setOpen]=useState(false)
  const [rightOpen,setRightOpen]=useState(false)

  const [courseName,setCourseName]=useState(null)
  function paginateData(pageNumber:any, pageSize:any) {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = data.slice(startIndex, endIndex);
    return pageData;
  }
  useEffect(() => {
    const fetchData = async () => {
      if (data.length === 0) {
        try {
          console.log("kl")
          const response = await axios.get(`http://127.0.0.1:5000/unique_course`);
          setData(response.data?.unique_course);
          setData2(response.data?.unique_course.slice(0,16))
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, []);

  const handlePageClick = (event:any) => {
    // setPageNumber(event.selected + 1);
    setData2(paginateData(event.selected + 1,16));

  };
  // console.log(data2[0]["Course Name"])
  const handleSkill=(name:any)=>{
    setRightOpen(true)
    setCourseName(name)
  }
  const handleCourse=(name:any)=>{
    setCourseName(name)
  }
  const removeModel=()=>{
    setOpen(false)
  }
  const setOpenModel=()=>{
    setOpen(true)
  }
  console.log(data)
  return (
    <div className="flex items-center justify-center">
      <div className="w-[75%] px-6 py-3 no-scrollbar flex flex-col  h-[680px] overflow-y-auto  bg-[white] rounded-md shadow-2">
        
        {
          data2.length===0?
          <div className="h-screen flex items-center justify-center">
          <ScaleLoader color="black"/>
          </div>:
          <div className="flex  items-center mx-auto  flex-row flex-wrap">
            <div className="h-[55px] w-full mx-8 mb-3">
             <Header data={data}/>
            </div>
      {
                data2?.map((item:any,index)=>(
                  <div  key={index} className="p-3 relative hover:scale-[1.02]  w-[250px] cursor-pointer m-2 h-[180px] rounded-md bg-[whitesmoke]">
                    <LiaLightbulb onClick={()=>handleSkill(item["Course Name"])}  size={30} className="absolute bottom-2 right-2"/>
                 <p onClick={()=>handleCourse(item["Course Name"])} className="text-[17px] text-black font-medium">{item["Course Name"]}</p>
                 {
                  courseName===item["Course Name"]&&(
                 <div onClick={setOpenModel} className="absolute bottom-2 left-2 bg-[black] p-2 rounded-md">
                  <p className="text-white font-satoshi font-medium">Get Recomendation</p>
                 </div>
                  )
                 }
                 
                </div>
                ))
              }
          </div>
        }
        
        <div>
      <ReactPaginate
        breakLabel="...."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={215}
        previousLabel="< Previous"
        // renderOnZeroPageCount={null}
        className={"Pagination"}
        marginPagesDisplayed={2}
        activeClassName={"Pagination_Active"}
        pageClassName={"Pagination_Item"}
        previousLinkClassName={"Pagination_Item_Previous"}
        nextLinkClassName={"Pagination_Item_Next"}
      />
      </div>
      </div>
      {
        open&&(
     <Modal
          keepMounted
          open={open}
          onClose={()=>setOpen(false)}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
         <div style={{
          position: 'absolute' as 'absolute',
          top: '60%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width:"60%",
          bgcolor: '#1C1B22',
          boxShadow: 24,
          p: 1,
          outline: 0,
          height:800,
          border:"2px"
         }} className=" bg-white flex items-center relative  rounded-md  py-2">
          <RxCross2 onClick={removeModel} size={25} className="z-999999 absolute top-2 right-2 cursor-pointer"/>
          <Recomendation course={courseName} />
         </div>
         
        </Modal>
        )
        
      }
      {rightOpen && (
        <div className=" h-screen fixed right-0 top-0  w-[400px] bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] z-30 transition-all duration-00 overflow-hidden">
          <div className=" h-screen bg-white p-3">
            {/* Modal content */}
            <AiOutlineClose
                className="cursor-pointer absolute z-9999 right-2 "
                size={32}
                onClick={()=>setRightOpen(false)}
              />
            <OverviewDetails course={courseName} data={data2}/>
          </div>
        </div>
      )}
     
    </div>
  )
}

export default Dashboard
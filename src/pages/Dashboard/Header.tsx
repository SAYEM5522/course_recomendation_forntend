// @ts-nocheck
import { Modal } from '@mui/material'
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { RxCross2 } from 'react-icons/rx'
import Recomendation from './Recomendation'

const Header = ({data}:any) => {
  const [open,setOpen]=useState(false)
  const [open2,setOpen2]=useState(false)

  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [courseName,setCourseName]=useState(null)

  const handleOpen=()=>{
    setOpen(true)
  }
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();

    // Filter the data based on the search input
    const filteredResults = data.filter((item) => {
      const courseName = item["Course Name"].toLowerCase();
      const skills = item.Skills.toLowerCase();

      // Match whole words using word boundaries (\b)
      const wordRegex = new RegExp(`\\b${searchValue}\\b`, "i");

      return wordRegex.test(courseName) || wordRegex.test(skills);
    });

    setSearchInput(searchValue);
    setFilteredData(filteredResults);
  };
  const handleCourse=(name:any)=>{
    setCourseName(name)
    setOpen2(true)
    setOpen(false)
  }
  const handleCloseModel=()=>{
    setOpen(false)
    setFilteredData([])
  }
  return (
    <div className='flex flex-row'>
      <div>
        <p className='font-satoshi font-semibold text-lg p-4 border-b border-b-[whitesmoke] mr-2  bg-white shadow-1'>Learning Path</p>
      </div>
      <div onClick={handleOpen}  className="relative flex-1  cursor-pointer bg-white shadow-1  border-b border-b-[whitesmoke] p-4 ">
             <button className="absolute top-1/2 left-0 -translate-y-1/2">
               <CiSearch size={27} className="ml-2"/>
             </button>
             <div
               className="w-full bg-transparent pr-4 pl-9 focus:outline-none"
             >
            <p>Type to search your course...</p>
             </div>
           </div>
           {
            open&&(
              <Modal
          keepMounted
          open={open}
          onClose={handleCloseModel}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
         <div style={{
          position: 'absolute' as 'absolute',
          top: '56%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width:"57%",
          bgcolor: '#1C1B22',
          boxShadow: 24,
          p: 1,
          outline: 0,
          height:760,
          border:"2px"
         }} className=" bg-white  relative  rounded-md  py-2">
          <div onClick={handleOpen}  className="relative flex-1  cursor-pointer bg-white shadow-1  border-b border-b-[whitesmoke] p-4 ">
             <button className="absolute top-1/2 left-0 -translate-y-1/2">
               <CiSearch size={27} className="ml-2"/>
             </button>
             <input
              onChange={handleSearch}
               type="text"
               placeholder="Type to search your demo..."
               className="w-full bg-transparent pr-4 pl-9 focus:outline-none"
             />
           </div>
           <ul className='overflow-y-auto  h-full no-scrollbar'>
        {filteredData?.map((item, index) => (
          <li onClick={()=>handleCourse(item["Course Name"])} className='px-4 py-2 hover:bg-[whitesmoke] cursor-pointer' key={index}>
            <strong>Course Name: </strong>
            <p className='text-black font-satoshi font-normal text-[16px]'>{item["Course Name"]}</p>
{/*             
            <br />
            <strong>Skills: </strong>
            {item.Skills} */}
          </li>
        ))}
      </ul>
         </div>
         
        </Modal>
            )
           }
           {
        open2&&(
     <Modal
          keepMounted
          open={open2}
          onClose={()=>setOpen2(false)}
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
          <RxCross2 onClick={()=>setOpen2(false)} size={25} className="z-999999 absolute top-2 right-2 cursor-pointer"/>
          <Recomendation course={courseName} />
         </div>
         
        </Modal>
        )
        
      }
    </div>
  )
}

export default Header
// @ts-nocheck
import axios from "axios"
import { useEffect, useState } from "react"
import { ScaleLoader } from "react-spinners"
import {CiSquareMore} from "react-icons/ci"
import { Modal } from "@mui/material"
import { RxCross2 } from "react-icons/rx"
const Recomendation = ({course}:any) => {
  const [open,setOpen]=useState(false)
  const [data,setData]=useState([])
  const [active,setActive]=useState()
  const getRecomendation=async()=>{
    await axios.post("http://127.0.0.1:5000/recommend",{
      course_title:course
    }).then(res=>{
      console.log(res.data?.recommendations)
      setData(res.data?.recommendations)
      // setLoading(false)

    }).catch(err=>{
      console.log(err)
    })
  }
  useEffect(()=>{
     getRecomendation(),
     ()=>getRecomendation
  },[course])
  const handleOpen=(i)=>{
    setActive(i)
    setOpen(true)
  }
  return (
    <div className="mx-auto">
      {
        data?.length===0?
        <div className="h-screen flex items-center justify-center">
          <ScaleLoader color="black"/>
          </div>:
          <div className="flex flex-row flex-wrap w-full h-screen mb-20 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden  justify-center">
            {
              data?.map((item:any,index:any)=>{
               return(
               <div key={index} className="p-3  relative  w-[250px] cursor-pointer m-2 h-[180px] rounded-md bg-[whitesmoke]">
                <CiSquareMore onClick={()=>handleOpen(index)} size={30} className="absolute text-black top-2 right-2"/>
                <div className="p-5">
                  <p className="text-black font-satoshi font-medium text-[17px">{item[0]["Course Name"]}</p>
                </div>
               </div> 
               )
              })
            }
          </div>
        
      }
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
          top: '56%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width:"43%",
          bgcolor: '#1C1B22',
          boxShadow: 24,
          p: 1,
          outline: 0,
          height:750,
          border:"2px"
         }} className=" bg-white  relative  rounded-md  py-2">
          <RxCross2 onClick={()=>setOpen(false)}  size={25} className="z-999999 absolute top-2 right-2 cursor-pointer"/>
          {
            <div className="p-5 h-screen overflow-y-auto no-scrollbar">
            <p className="p-2 bg-white shadow-2 mt-3 rounded-md">
              <span className="font-satoshi font-medium text-[18px] ">Description: </span>
             {
                data[active][0]["Course Description"]
              }
            </p>
            <p className="p-2 bg-white shadow-2 mt-3 rounded-md">
            <span className="font-satoshi font-medium text-[18px] ">Skills: </span>
             {
                data[active][0]["Skills"]
              }
            </p>
            <p className="p-2 bg-white shadow-2 mt-3 rounded-md">
            <span className="font-satoshi font-medium text-[18px] ">Difficulty Level: </span>
             {
                data[active][0]["Difficulty Level"]
              }
            </p>
            <p className="p-2 bg-white shadow-2 mt-3 rounded-md">
            <span className="font-satoshi font-medium text-[18px] ">Course URL: </span>
             {
                data[active][0]["Course URL"]
              }
            </p>
              
            </div>
            
          }
         </div>
         
        </Modal>
        )
      }
    </div>
  )
}

export default Recomendation
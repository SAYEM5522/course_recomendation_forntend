
// @ts-nocheck
import axios from "axios"
import { useEffect, useState } from "react"
import Header from "./Header"
import { useNavigate } from "react-router-dom"
import {AiOutlinePlus} from "react-icons/ai"
import {FadeLoader} from "react-spinners"
import { useDispatch } from "react-redux"
// @ts-ignore
import {setSpaceId} from "../components/feature/videoSlice.js"
import SupportedPlatfoem from "./SupportedPlatfoem.js"
const override = {
  display: "block",
  margin: "0 auto",
};
const SpaceInfo = () => {
    const [spaceList,setSpaceList]=useState([])
    const [loading,setLoading]=useState(true)
    const dispatch=useDispatch()
    const email=localStorage.getItem("email")
    const getSpaceList=async()=>{
         await axios.get(`http://localhost:8081/getSpaeList/${email}`).then((res)=>{
          setSpaceList(res.data)
          setLoading(false)
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
      getSpaceList()
    },[])
    const navigation=useNavigate()
    const ShiftSpaceId=(id:any,name:any)=>{
    //    dispatch(
    //     setSpaceId(
    //         {
    //         SpaceId:id
    //         }
    //     )
        
    //    )
    localStorage.setItem("sid",id)
    localStorage.setItem("Name",name)

      navigation(`/overview/${id}`)
    }

  return (
    <div>
         <Header/>
         {
          loading?
          <div className="grid place-items-center h-screen">
         <FadeLoader
         color="#000"
        // @ts-ignore
        size={60}
           aria-label="Loading Spinner"
           data-testid="loader"
           cssOverride={override}
         />
         </div> 
          : 
          <div>
<div className="bg-white h-screen w-full flex flex-col  ">
         <div className="flex justify-between ml-auto mr-auto  px-5 items-center w-[700px] h-[100px] mt-5 bg-white rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
            <p className="text-xl font-semibold">Space</p>
            <div onClick={()=>navigation("/createspace")} className="cursor-pointer flex items-center flex-row w-[30%] justify-center rounded bg-[#25224A] p-3 font-medium text-white ">
                <AiOutlinePlus size={27} color="white" className="mr-3"/>
                <button  type='submit' className="flex   ">
                  Create Workspace
            </button>
            </div>
            
            
         </div>
         <div className="flex items-center flex-col cursor-pointer">
         {
            spaceList.map((item:any,index)=>{
                return(
                 <div key={index} onClick={()=>ShiftSpaceId(item?._id,item?.Name)} className="px-5 flex flex-row justify-between items-center w-[700px] h-[80px] mt-5 bg-white rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
                <div className="bg-[#25224A] text-white text-3xl justify-center items-center flex w-[13%] rounded-[50%] p-3 h-full">{item?.Name[0]}</div>
                <div>
                  <p className="text-xl font-semibold">{item?.Name}</p>
                  <p className="text-md ml-2">{item?.Des}</p>

                </div>
                 </div>
                )
            })
         }
         </div>
         
         </div>
          </div>

          }

         
    </div>
  )
}

export default SpaceInfo
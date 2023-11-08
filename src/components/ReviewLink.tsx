// @ts-nocheck
import { useRef } from "react";
import useCopyToClipboard from "./useCopyToClipboard";
import { ToastContainer, toast } from 'react-toastify';
import { BiCopy } from "react-icons/bi";
import 'react-toastify/dist/ReactToastify.css';

const ReviewLink = () => {
    const spaceId=localStorage.getItem("sid")
  const inputRef = useRef(null);
  const [value, copy] = useCopyToClipboard()

    const copyToClipboard = () => {
    copy(inputRef.current.value)
    toast("Text copied successfuly")
  };
  return (
    <>
     <div className="flex items-center bg-black mt-10 h-[100px] rounded-lg p-3 w-full">
       <input
           type="text"
           className="bg-white w-[470px] text-black py-2 px-4 rounded-md font-medium mr-4"
           value={`http://localhost:5173/review/${spaceId}`}
           readOnly
           ref={inputRef}
         />
         <button
           // className="bg-white text-pink-600 py-2 px-4 rounded-md font-medium"
           onClick={copyToClipboard}
         >
           { <BiCopy color='#fff' size={30}/>}
         </button>

       </div>
         <ToastContainer autoClose={5000}/>
         </>


  )
}

export default ReviewLink

const OverviewDetails = ({course,data}:any) => {
  return (
    <div className="relative overflow-y-auto h-screen no-scrollbar">
      <p className="font-satoshi font-semibold text-lg">Available Skills</p>
      {
        data.map((item:any,index:any)=>(
          (course===item["Course Name"])&&(
            <div key={index} className="flex flex-1 items-center flex-row flex-wrap p-3">
             {
              item["Skills"].split(" ").filter((item:any) => item !== "").map((ite:any,i:any)=>{
                return(
                  <div className="" key={i}>
                     <p className="font-satoshi rounded-lg text-lg m-3 py-2 px-4 bg-[whitesmoke]">{ite}</p>
                  </div>
                )
              })
             }
            </div>
          )
        ))
      }
    </div>
  )
}

export default OverviewDetails
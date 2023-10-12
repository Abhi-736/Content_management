import React from 'react'
import {BiMenuAltLeft} from 'react-icons/bi'
import {Link} from 'react-router-dom'

const Sidebar = () => {
    const [isOpen,setisOpen] = React.useState<boolean>(false)
    
    
  return (
    <div className={`h-screen fixed top-0 bottom-0 left-0 z-10 w-80 bg-slate-500 flex transition-all ${isOpen?'transform translate-x-0':'transform translate-x-[-90%]'}  `}>
        <BiMenuAltLeft onClick={()=>{setisOpen((value:boolean)=>!value)}} className='h-7 w-7 inline-block absolute top-1 right-1 hover:text-white hover:scale-125 transition'/>

<div className={` w-full m-2 pt-4 flex flex-col justify-start align-middle divide-y `}>
<p className='self-center text-3xl font-medium pb-4 '>Sidebar</p>
<Link to="/" onClick={()=>{setisOpen(value=>!value)}} className='text-2xl hover:text-white self-center cursor-pointer py-2 transition hover:scale-90'>Contact</Link>
<Link to="ChartsMaps" onClick={()=>{setisOpen(value=>!value)}} className='text-2xl py-2 self-center hover:text-white cursor-pointer transition-all hover:scale-90'>Charts and Maps</Link>

</div>

    </div>
  )
}

export default Sidebar
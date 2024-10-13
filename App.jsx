import { useState,useEffect,ref } from 'react'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { CgAddR } from "react-icons/cg";


function App() {
const [todo, settodo] = useState("")
const [todos, settodos] = useState([])
const [placeholder, setplaceholder] = useState("Enter your todo")
const [showFinished, setshowFinished] = useState(true)
useEffect(() => {
  let todostring =localStorage.getItem("todos")
  if (todostring){
    let parsetodos= JSON.parse(localStorage.getItem("todos"))
    settodos(parsetodos)
  }
}, [])
useEffect(() => {
 
        localStorage.setItem("todos",JSON.stringify(todos))
    
}, [todos])


const handleEdit = (id)=> {
    
    let findIndex = todos.findIndex((e) => id == e.id )
    let filtertodos = todos.filter((item) => id == item.id )
    let newtodos = [...todos]
  
    newtodos.splice(findIndex,1)
    settodos(newtodos)
    settodo(filtertodos[0].todo)

// saveToLs()
}

const handleAdd = (e)=> {
    e.preventDefault()
    
    if(todo){
        let newtodos = [...todos,{ id :uuidv4(),todo, isCompleted : false} ]
        settodos(newtodos)
        settodo("")
        // saveToLs()
} else {
    setplaceholder("Please Add a todo")   
    }
};

const handlechange = (e)=>{ settodo(e.target.value) }

const handleCheck = (e) => {
    
    const id = e.target.name
    let findindex = todos.findIndex((item)=>{ return  item.id === id })
    let newtodo = [...todos]
    newtodo[findindex].isCompleted = !newtodo[findindex].isCompleted
    settodos(newtodo) 
//  saveToLs()

}

const handleDelete = (id)=> {
    let findIndex = todos.findIndex((e) => id == e.id )
 let newtodos = [...todos]
newtodos.splice(findIndex,1)
 settodos(newtodos)
//  saveToLs()
}

let handlefinished = ()=> {
 
  
  if (showFinished === true) {
        setshowFinished(false)      
    }
    else{
        setshowFinished(true)      

    }
}




return (
    <>
<Navbar/>
<div>
<div>
    <div className="container min-h-[60vh] flex  flex-col  text-center bg-[#eeeaa8] m-auto mt-6">
   <div className='todosInput flex flex-col  m-4'>
    <h1 className='font-bold text-lg my-1 '> ITASK - Manage your daily task.</h1>
    <div className='font-medium text-xl  '>Add a Todo</div>
    <form action="" className=' flex w-full items-center m-3 justify-center '>
    <input type="text" value={todo} placeholder={placeholder} onChange={handlechange} className=" rounded-md border-none  bg-black text-white p-1 pl-3 w-1/2"  />
    <button  onClick={handleAdd} className='bg-black text-[#849ece] text-lg p-1 min-h-8 items-center px-3 m-1 rounded-lg hover:text-[#a1bcee] cursor-pointer '  > <CgAddR /></button>
    </form>
    </div>
    <div className="todoDisplay flex flex-col 
     "> 
    <div className='font-bold  text-gray-600  text-lg mb-1'> Your Todos</div>
    <div><input type="checkbox"  className='m-2' checked={showFinished} onClick={handlefinished} />
    Show Finished</div>
    
    {todos.length === 0 && <div className='text-red-900'>No Todo to Display</div> }
     {todos.map((item,index) => {
      return (
        
          
          <div key={index} > 
          { (showFinished || !item.isCompleted) && (
            // <div className='flex flex-c '>
            <div className='xl:w-1/2  lg:w-2/3 md:w-9/12 w-5/6 mx-4 my-2'>
          <div className={item.isCompleted ? "line-through text-lg" : "text-lg"}>
  <div className=' flex items-center mt-3 m-2 ml-1 space-x-7 '>  
    <input type="checkbox" name={item.id} onClick={handleCheck} className="m-2" checked={item.isCompleted} /> {item.todo}
        <div className="buttons flex  ">
        <button onClick={() => handleEdit(item.id)} className=" bg-black hover:text-[#849ece] w-8 rounded-lg m-1 flex justify-center text-gray-300 text-lg"><CiEdit /></button>
        <button   onClick={()=> handleDelete(item.id) } className="  text-lg  bg-black text-red-800 w-8   m-1 flex justify-center rounded-lg hover:text-red-600" ><MdDelete /></button>
  </div>
     </div>
        </div>
           </div>
    )}
    </div>)
})}
</div>
</div>    
    </div>
    </div>

      </>
    )
}

export default App
 
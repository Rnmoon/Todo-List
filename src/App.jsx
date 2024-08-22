import { useState,useEffect, useLayoutEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useLayoutEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  const saveToLS = (params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const toggleFinished = (e) =>{
    setShowFinished(!showFinished)
  }
  const handleEdit = (e,id)=>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id
    }
    );
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e,id)=>{
    const confirmDelete = window.confirm("Are you sure you want to delete this todo?")
      if(confirmDelete){

        let newTodos = todos.filter(item=>{
          return item.id !== id
        }
        );
        setTodos(newTodos)
      }
      saveToLS()
  }
  const handleAdd = ()=>{
    setTodos([...todos,{id: uuidv4(), todo, isCompleted:false}])
    setTodo("")
    saveToLS()
  }
  const handleChange = (e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox = (e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  return (
    <>
    <div className="main">
      {/* <Navbar/> */}
      <div className='flex justify-center'>
      <div className=" mx-3 container bg-[#1e1647] text-white md:mx-auto m-4 p-7 border rounded-2xl md:w-1/2 min-h-[95vh] ">
        {/* <h1 className='font-bold flex justify-center '>iTask - Manager your todos at one place</h1> */}
        <h1 className='font-bold flex justify-center font-poppins text-3xl'>Get Things Done!</h1>
        {/* <h2 className='font-bold py-3 '>Add a Todo</h2> */}
        <div className="inp flex py-3 -mt-3">
          <input onChange={handleChange} value={todo} type="text" placeholder='What is the task today?' className='bg-[#1e1647] disabled:bg-violet-900 border my-3 py-2 border-[#862cfe]  w-[36vw]
           px-2 focus:ring-0 focus:outline-none '/>
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-[#862cfe] hover:bg-violet-800 disabled:bg-violet-900 px-6 py-1 my-3 text-white font-semibold'>Add Task</button>
        </div>
        <input type="checkbox" onChange={toggleFinished} name="showfin" id="" className='cursor-pointer ' /><span className='mx-2'>Show Finished</span>
        {/* <div className='bg-slate-300 h-[3px] border rounded-full border-slate-300 my-4'></div> */}
        <h2 className=' font-bold text-xl py-2'>Your Todos</h2>
        <div className="todos justify-between my-2">
          {todos.map(item=>{
            
            return(showFinished || !item.isCompleted) && <div key={item.id} className="todo-wr flex justify-between gap-2 py-1 bg-[#872cff] border border-none rounded-md px-4 my-1">

             <div key={item.id} className="todo flex gap-3">
            <input type="checkbox" name={item.id} onChange={handleCheckbox} checked={item.isCompleted} />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
          <div className="btn flex gap-2 h-full">
            <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-600 hover:bg-violet-800 w-11 border rounded-full px-3 py-1 text-white font-semibold'><img src="edit.svg" className='hover:invert'/></button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-600 hover:bg-violet-800 w-11 border rounded-full px-3 py-1 text-white font-semibold'><img src="delete.svg" className='hover:invert'/></button>
          </div>
        </div>
          })}
          </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default App

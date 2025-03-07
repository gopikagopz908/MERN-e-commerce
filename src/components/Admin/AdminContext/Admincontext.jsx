import React,{useState,useEffect} from 'react'
import { createContext } from 'react'
import axios from 'axios'
import { log } from 'debug/src/browser'
import axiosInstance from '../../../Api/axiosInstance'

export const AdminContext=createContext()
function Admin({children}) {

    
    const [toggled, setToggled] =useState(false);
    const [broken, setBroken] = useState(window.matchMedia('(max-width: 800px)').matches);

    const[users,setUsers]=useState([])
    const[products,setProducts]=useState([])
    const[total,setTotal]=useState([])

    useEffect(()=>{
        axiosInstance.get("/admin/allusers")
        
        .then((res)=>{
          // console.log(res.data)

            setUsers(res.data.data.users)       
         })
        .catch((error)=>{
            console.log(error)
        })
    },[])
    useEffect(()=>{
        axiosInstance.get("/products")
        .then((res)=>{
            setProducts(res.data.products)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])
    useEffect(()=>{
        axiosInstance.get("/admin/orders/")
        .then((res)=>{
            
            setTotal(res.data.order)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])
    
    const handleBlock = (user) => {
      axiosInstance
        .put(`/admin/blockUser/${user._id}`, { isBlocked: !user.isBlocked })
        .then(() => {
          setUsers((prevUsers) =>
            prevUsers.map((u) =>
              u._id === user._id ? { ...u, isBlocked: !u.isBlocked } : u
            )
          );
        })
        .catch((error) => {
          console.error("Error updating block status:", error);
        });
    };
    
       const totalRevenue=total.reduce((acc,item)=>acc+item.total,0)
       
  return (
    <div>
        <AdminContext.Provider value={{users,setUsers,products,setProducts,toggled, setToggled,broken, setBroken,handleBlock,total,totalRevenue}}>
            {children}

        </AdminContext.Provider>
      
    </div>
  )
}

export default Admin

import { useEffect, useState } from 'react';
import Navbar from '../component/Navbar.jsx'
import axiosUtils from '../lib/axios.jsx';
import RateLimit from '../component/RateLimit.jsx';
import toast from "react-hot-toast"
import NoteCard from '../component/NoteCard.jsx';
import LoginCard from '../component/LoginCard.jsx';

const HomePage = () => {
  const[isRateLimited,setIsRateLimited]=useState(false);
  const [notes,setNotes]=useState([]);
  const [loading,setLoading]=useState(true);
  const[isLoggedIn,setisLoggedIn]=useState(()=>{
    return localStorage.getItem("isLoggedIn")==="true";
  });

  useEffect(()=>{
   const fetchNotes=async()=>{
      try {
        const res=await axiosUtils.get("/notes");
        setNotes(res.data);
        console.log(res.data);
      } catch (error) {
        console.log("Error fetching notes");
        if(error.response.status===429){
          setIsRateLimited(true)
        }else{
          toast.error("Failed to load notes")
        }
      } finally{
        setLoading(false);
      }
   } 
   if(isLoggedIn){
     fetchNotes();
    }
  },[isLoggedIn])

  return (
    <div className="min-h-sceen">
        <Navbar isLoggedIn={isLoggedIn}/>

        {!isLoggedIn && <LoginCard setisLoggedIn={setisLoggedIn}/>
        }
        
        {isRateLimited && <RateLimit/>}

        <div className="max-w-7xl mx-auto p-4 mt-6">
          {loading && isLoggedIn && <div className="text-center text-primary py-10">Loading Notes...</div>}

          {notes.length===0 && !loading && isLoggedIn && <div className="text-center text-primary py-10">
            No notes....
          </div>}

          {notes.length > 0 && !isRateLimited && isLoggedIn && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note)=>(
                 <NoteCard key={note._id} note={note} setNotes={setNotes}/>
              ))}
            </div>
          )}
        </div>
    </div>
      
  );
  
};

export default HomePage;

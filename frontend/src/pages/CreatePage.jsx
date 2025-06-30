import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { ArrowLeftIcon } from 'lucide-react';
import axiosUtils from '../lib/axios.jsx'


const CreatePage = () => {
  const[title,setTitle]=useState("");
  const[content,setContent]=useState("");
  const[loading,setLoading]=useState(false);

  const navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault();

    if(!title.trim() || !content.trim()){
      toast.error("All fields are required")
      return;
    }

    setLoading(true)
    try {
      await axiosUtils.post("/notes",{
        title,
        content
      })
      toast.success("Note Created")
      navigate("/")
    } catch (error) {
      if(error.response.status===429){
        toast.error("Too many attempts")
      }else{
        toast.error("Failed ...!!")
      }
    }finally{
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-5">
        <div className="max-w-2xl mx-auto">
        <Link to={"/"} className="btn btn-ghost mb-6">
          <ArrowLeftIcon className="size-5"/>
          Back to Notes
        </Link>

        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Create New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text"
                  placeholder="Note Title"
                  className="input input-bordered" 
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                />
              </div>
               
               <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea type="text"
                  placeholder="Write notes..."
                  className="textarea textarea-bordered h-32" 
                  value={content}
                  onChange={(e)=>setContent(e.target.value)}
                />
              </div>

              <div className="card-actionsjustify-end"></div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Processing..": "Create Note"}
                </button>
                 
            </form>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}

export default CreatePage;

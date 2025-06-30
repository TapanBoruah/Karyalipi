import React, { useEffect, useState } from 'react'
import { useNavigate,useParams} from 'react-router';
import axiosUtils from '../lib/axios';
import { Link } from 'react-router';
import { Trash2Icon,ArrowLeftIcon,LoaderIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const NoteDetailPage = () => {
  const [note,setNote]=useState(null);
  const[loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);


  const navigate=useNavigate()

  const {id} =useParams();


  useEffect(()=>{
    const fetchNote=async()=>{
      try {
        const idNote=await axiosUtils.get(`/notes/${id}`);
        setNote(idNote.data);
      } catch (error) {
        toast.error("Failed to load...")
      }finally{
        setLoading(false);
      }
    }
    fetchNote();
  },[id]);

  const deleteNotes = async( )=>{
    if(!window.confirm("Confirm Delete ?")) return;

    try {
      axiosUtils.delete(`/notes/${id}`);
      toast.success("Note Deleted");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete")
    }
  }

  const handleSave=async()=>{
    if(!note.title.trim() || !note.content.trim() ){
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true)

    try {
      await axiosUtils.put(`notes/${id}`,note)
      toast.success("Note updated..")
    } catch (error) {
      toast.error("Error in updating..!")
    }finally{
      setSaving(false)
    }
  }

  if(loading){
    return(
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10"/>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto"> 
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5"/>
              Back to Notes 
            </Link>
            <button onClick={deleteNotes} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5"/> 
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">
                    Title
                  </span>
                </label>
                <input type="text"
                placeholder='Note title'
                className="input input-bordered"
                value={note.title}
                onChange={(e)=>setNote({...note,title:e.target.value})} />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">
                    Content
                  </span>
                </label>
                <textarea 
                placeholder="Write your note.."
                className="text-area text-area-bordered h-32"
                value={note.content}
                onChange={(e)=>setNote({...note,content:e.target.value})}/>
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving? "Saving...":"Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage;

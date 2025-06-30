import { Link } from 'react-router'
import { PiSquareIcon } from 'lucide-react'
import { Trash2Icon } from 'lucide-react'
import {formatDate} from "../lib/utils.jsx"
import axiosUtils from '../lib/axios.jsx'
import toast from 'react-hot-toast'
 

const NoteCard = ({note,setNotes}) => {

  const deleteNotes=async(e,id)=>{
    e.preventDefault();

    if(!window.confirm("Confirm Delete ?")) return;

    try {
      axiosUtils.delete(`/notes/${id}`);
      setNotes((prev)=>prev.filter(note=>note._id!==id));
      toast.success("Note Deleted");
    } catch (error) {
      toast.error("Failed to delete")
    }
  }

  return (
    <Link to={`/note/${note._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#f4a30c]">
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-action justify-between items-center mt-4">
          <span className="text-sm teext-base-content/60">
            {formatDate( new Date (note.createdAt))}
          </span> 
          <div className="flex items-center gap-1">
            <PiSquareIcon className="size-4"/>
            <button className="btn btn-ghost btn-xs text-error" onClick={(e)=> deleteNotes(e,note._id)}>
              <Trash2Icon className="size-4"/>
            </button>
          </div>
        </div>
      </div>

    </Link>
  )
}

export default NoteCard

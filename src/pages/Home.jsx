import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NoteModal from '../components/NoteModal'
import axios from 'axios';
import NoteCard from '../components/NoteCard';
import { toast } from 'react-toastify';

const Home = () => {

  const [isModalOpen, setModalOpen]=useState(false);
  const [filteredNotes, setFilteredNote]=useState(false);
  const [notes, setNotes]= useState([])
  const [currentNote, setCurrentNote] = useState(null)
  const [query,setQuery]= useState('')
  useEffect(()=>{
    fetchNotes()
},[]);

  useEffect(()=>{
    setFilteredNote(notes.filter((note)=>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.description.toLowerCase().includes(query.toLowerCase())
  ) 
  );
    
},[query,notes])

  const fetchNotes= async () => {
      try {
        const {data}= await axios.get('https://mern-note-app-api-kwo6.onrender.com/api/note',
           {
            headers :{Authorization:`Bearer ${localStorage.getItem('token')}`
            }
          }

        )
        setNotes(data.notes)
      } catch (error) {
        console.log(error)
      }
    }
  const closeModal =()=>{
    setModalOpen(false)
  }

  const onEdit = (note) => {
    setCurrentNote(note)
    setModalOpen(true)
  }

  const addNote = async (title,description) => {
    try {
           const response = await axios.post('https://mern-note-app-api-kwo6.onrender.com/api/note/add', {title,description}, {
            headers :{Authorization:`Bearer ${localStorage.getItem('token')}`
            }
          }

           ) 
           if(response.data.success){
            toast.success('Note Added Successfully')
            fetchNotes()
            closeModal()
           }
            
        } catch (error) {
            console.log(error)
            
        }

  }

  const deleteNote = async (id) => {
    try {
           const response = await axios.delete(`https://mern-note-app-api-kwo6.onrender.com/api/note/${id}`, {
            headers :{Authorization:`Bearer ${localStorage.getItem('token')}`
            }
          }

           ) 
           if(response.data.success){
            toast.success('Note Deleted Successfully')
            fetchNotes()
           }
            
        } catch (error) {
            console.log(error)
            
        }
    
  }

  const editNote = async (id,title,description) => {
    try {
           const response = await axios.put(`https://mern-note-app-api-kwo6.onrender.com/api/note/${id}`, {title,description}, {
            headers :{Authorization:`Bearer ${localStorage.getItem('token')}`
            }
          }

           ) 
           if(response.data.success){
            toast.success('Note Updated Successfully')
            fetchNotes()
            closeModal()
           }
            
        } catch (error) {
            console.log(error)
            
        }
    
  }
  return (
    <div className='bg-gray-100  min-h-screen '>
      <Navbar  setQuery={setQuery}/>

      <div className='grid grid-cols-1 md:grid-cols-3 px-8 pt-4 gap-3'>
       {filteredNotes.length>0 ? filteredNotes.map((note) =>(
        <NoteCard 
         note={note}
         onEdit={onEdit}
         deleteNote={deleteNote}/>
       )) : <p>No notes please login/signup to add notes</p>}
       </div>

      <button className='bg-teal-500 text-2xl text-white font-bold rounded-full p-4 fixed right-4 bottom-4' onClick={()=>setModalOpen(true)}> 
        +
        
      </button>
      {isModalOpen && <NoteModal 
      closeModal={closeModal}
      addNote={addNote}
      currentNote={currentNote}
      editNote={editNote}
      deleteNote={deleteNote}/>}
    </div>
  )
}

export default Home
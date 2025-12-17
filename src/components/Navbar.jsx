import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider';

const Navbar = ({setQuery}) => {
    const {user,logout}= useAuth()
    
  return (
    <nav className='bg-gray-900 p-4 text-white flex justify-between items-center w-full  ' >
        <div className='text-xl font-bold'>
            <Link to='/'>NoteApp</Link>
        </div>
        <input type="text" placeholder='Search notes...' className='bg-gray-600 py-2 px-4 rounded ' onChange={(e)=>setQuery(e.target.value)} /><div>
            
            {!user ? (
                <>
                <Link to='/login' className='bg-blue-500 py-2 px-4 rounded mr-4'>Login</Link>
            <Link to='/register' className='bg-green-500 py-2 px-4 rounded mr-4'>Signup</Link>
                </>
            )
            : <>
            <span className='mr-4'>{user.name}</span>
            <Link to={'/login'} className='bg-red-500 py-2 px-4 rounded ' onClick={logout}>Logout</Link>
            </>}
        </div>

    </nav>
  );
};

export default Navbar
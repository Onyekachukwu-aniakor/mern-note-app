
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Signup = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate= useNavigate()

    const handleSubmit =async(e) =>{
        e.preventDefault();
        try {
           const response = await axios.post('https://mern-note-app-sqi8.onrender.com/api/auth/register', {name,email,password}) 
           if(response.data.success){
            toast.success('Signed Up Successfully')
            navigate('/login')
           }
            
        } catch (error) {
            console.log(error)
            
        }

    }
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100  bg-gradient-to-br from-blue-200 to-purple-400'>
    <div className='border shadow p-6 w-80 bg-white'>
        <h2 className='text-2xl font-bold mb-4'>Signup</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                <label className='block text-gray-700' htmlFor="name">Name</label>
                <input onChange={(e)=>setName(e.target.value)} className='w-full px-3 border py-2' type="text" placeholder='Enter Name' required />
            </div>
            <div className='mb-4'>
                <label className='block text-gray-700' htmlFor="email">Email</label>
                <input onChange={(e)=>setEmail(e.target.value)} className='w-full px-3 border py-2' type="email" placeholder='Enter email' required />
            </div>
            <div className='mb-4'>
                <label className='block text-gray-700' htmlFor="password">Password</label>
                <input onChange={(e)=>setPassword(e.target.value)} className='w-full px-3 border py-2' type="password" placeholder='******'  required/>
            </div>
            <div className='mb-4'>
            <button type='submit' className='w-full bg-blue-600 py-2 text-white'>Signup</button>
            <p className='text-center'>Already Have An Account? <Link className='btn bg-blue-600 rounded mt-2' to={'/login'}>Login</Link></p>
            </div>
        </form>
    </div>
    </div>
  )
}

export default Signup
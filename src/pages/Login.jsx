
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider'
import { toast } from 'react-toastify'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const {login}= useAuth()

    const handleSubmit =async(e) =>{
        e.preventDefault();
        try {
           const response = await axios.post('https://mern-note-app-api-kwo6.onrender.com/api/auth/login', {email,password}); 
           if(response.data.success){
            login(response.data.user)
            toast.success('Loggedin successfully')
            localStorage.setItem('token', response.data.token)
            navigate('/')

           }
            
        } catch (error) {
            console.log(error)
            
        }

    }
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 bg-gray-100   '>
    <div className='border shadow p-6 w-80 bg-white'>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        <form onSubmit={handleSubmit}>
            
            <div className='mb-4'>
                <label className='block text-gray-700' htmlFor="email">Email</label>
                <input onChange={(e)=>setEmail(e.target.value)} className='w-full px-3 border py-2' type="email" placeholder='Enter email' required />
            </div>
            <div className='mb-4'>
                <label className='block text-gray-700' htmlFor="password">Password</label>
                <input onChange={(e)=>setPassword(e.target.value)} className='w-full px-3 border py-2' type="password" placeholder='******'  required/>
            </div>
            <div className='mb-4'>
            <button type='submit' className='w-full bg-blue-600 py-2 text-white'>Login</button>
            <p className='text-center'>Don't Have An Account? <Link className='btn bg-blue-600 rounded mt-2' to={'/register'}>Register</Link></p>
            </div>
        </form>
    </div>
    </div>
  )
}

export default Login
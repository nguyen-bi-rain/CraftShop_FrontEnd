import * as Yup from 'yup'
import React from 'react'
import { useFormik } from 'formik'
import { LoginApi } from '../services'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

const Signin = () => {
    const navigate = useNavigate()
    
    const fomik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required('Required'),
            password: Yup.string().min(8).required('Required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/, 'Password must be have at least one lowercase letter,one digit, uppercase and one special character')
        }),
        onSubmit : async (values) => {
            try{
                const login  = await LoginApi(values)
            localStorage.setItem('user',login.result.token)
            toast.success('Welcome to our website!')
            navigate('/')
            window.location.reload()
            }catch(e){
                console.log(e)
            }
        }
    }) 
    return (
        <div className='w-full flex justify-center mt-10'>
            <div class="w-full max-w-sm bg-white shadow-md rounded">
                <h1 className='text-center uppercase font-bold text-xl mt-4'>Log in</h1>
                <form class="px-8 pt-6 pb-8 mb-4" onSubmit={fomik.handleSubmit}>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                            Email
                        </label>
                        <input name='email' value={fomik.values.email} onChange={fomik.handleChange} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" />
                        {fomik.errors.email ? <p className='text-red-500 text-xs italic'>{fomik.errors.email}</p> : null}
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input name='password' value={fomik.values.password} onChange={fomik.handleChange} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter your password" />
                        {fomik.errors.password ? <p className='text-red-500 text-xs italic'>{fomik.errors.password}</p> : null}
                    </div>
                    <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign In
                        </button>
                        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Forgot Password?
                        </a>
                    </div>
                </form>
                
            </div>
        </div>
    )
}

export default Signin
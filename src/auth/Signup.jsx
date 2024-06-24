import React from 'react'
import * as Yup from "yup"
import { useFormik } from 'formik'
import { RegisterApi } from '../services'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const nagivate = useNavigate()
  const fomik = useFormik({
    initialValues: {
      email: '',
      password: '',
      userName: '',
      phoneNumber: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      userName: Yup.string().required('Required'),
      phoneNumber: Yup.string().required('Required').matches(/^(0|\+84)[1-9][0-9]{8}$/, 'that is not a valid phone number'),
      email: Yup.string().email().required('Required'),
      password: Yup.string().min(8).required('Required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/, 'Password must be have at least one lowercase letter,one digit, uppercase and one special character'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match')
    }),
    onSubmit: async (values) => {
      try {
        const register = await RegisterApi(values)
        nagivate('/signin')
      } catch {
        console.log('error');
      }
    }
  })
  return (
    <div className='w-full flex justify-center mt-10'>
      <div class="w-full max-w-sm ">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={fomik.handleSubmit}>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="userName">
              UserName
            </label>
            <input name='userName' value={fomik.values.userName} onChange={fomik.handleChange} class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="userName" type="text" placeholder="Enter your UserName" />
            {fomik.errors.userName ? <p className='text-red-500 text-xs italic'>{fomik.errors.userName}</p> : null}
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              Email
            </label>
            <input name='email' value={fomik.values.email} onChange={fomik.handleChange} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" />
            {fomik.errors.email ? <p className='text-red-500 text-xs italic'>{fomik.errors.email}</p> : null}
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="phoneNumber">
              phoneNumber
            </label>
            <input name='phoneNumber' value={fomik.values.phoneNumber} onChange={fomik.handleChange} class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="phoneNumber" type="phone" placeholder="Enter your phoneNumber" />
            {fomik.errors.phoneNumber ? <p className='text-red-500 text-xs italic'>{fomik.errors.phoneNumber}</p> : null}
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input name='password' value={fomik.values.password} onChange={fomik.handleChange} class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter your password" />
            {fomik.errors.password ? <p className='text-red-500 text-xs italic'>{fomik.errors.password}</p> : null}
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="confirmPassword">
              ComfirmPassword
            </label>
            <input name='confirmPassword' value={fomik.values.confirmPassword} onChange={fomik.handleChange} class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="confirmPassword" type="password" placeholder="Enter your confirmPassword" />
            {fomik.errors.confirmPassword ? <p className='text-red-500 text-xs italic'>{fomik.errors.confirmPassword}</p> : null}
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Sign Up
            </button>
            <Link to='/signin' class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Sign in
            </Link>
          </div>
        </form>
        <p class="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Signup
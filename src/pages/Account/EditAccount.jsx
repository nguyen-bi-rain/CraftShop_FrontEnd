import React, { useEffect, useState } from 'react'
import { getUserAccount, UpdateUserAccount } from '../../services';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
const EditAccount = () => {


    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            let token = localStorage.getItem('user');
            const response = await getUserAccount(token);
            setUser(response.result);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };
    var name = user?.name;
    console.log(name);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            id: localStorage.getItem('userId'),
            email: user?.email || '',
            userName: user?.userName || '',
            name: name || 'nguyen',
            phoneNumber: user?.phoneNumber || '',
            address: user?.address || ''
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            userName: Yup.string().required('Required'),
            email: Yup.string().email().required('Required'),
            phoneNumber: Yup.string().required('Required').matches(/^(0|\+84)[1-9][0-9]{8}$/, 'that is not a valid phone number'),
            address: Yup.string().required('Required')
        }),
        onSubmit: async (values) => {
            try {
                const res = await UpdateUserAccount(values).then((res) => console.log(res)); 
                console.log(res);
                debugger

                navigate('/account')
            } catch (err) {
                console.log(err);
            }
        }
    })
    console.log(formik.initialValues);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading user data</div>;
    }

    return (
        <div>
            <h2 className='text-xl font-bold mb-4'>Edit Information</h2>
            <form className='w-full' onSubmit={formik.handleSubmit}>
                <div className="md:flex md:items-center mb-6">
                    <div className="">
                        <label className="block md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                            Full Name
                        </label>
                    </div>
                    <div className="md:w-2/3 md:ml-10">
                        <input onChange={formik.handleChange} className=" appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="userName" type="text" value={formik.values.userName} name='userName' />
                    </div>
                    <div>
                        {formik.errors.userName ? <p className='text-red-500 text-xs italic'>{formik.errors.userName}</p> : null}
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="">
                        <label className="block md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                            Email
                        </label>
                    </div>
                    <div className="md:w-2/3 md:ml-[69px]">
                        <input onChange={formik.handleChange} value={formik.values.email} name='email' className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="email" type="text" />
                    </div>
                    <div>
                        {formik.errors.email ? <p className='text-red-500 text-xs italic'>{formik.errors.email}</p> : null}
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="">
                        <label className="block   md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                            Phone Number
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input onChange={formik.handleChange} value={formik.values.phoneNumber} name='phoneNumber' className=" appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="phoneNumber" type="text" />
                    </div>
                    <div>
                        {formik.errors.phoneNumber ? <p className='text-red-500 text-xs italic'>{formik.errors.phoneNumber}</p> : null}
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="">
                        <label className="block   md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                            Address
                        </label>
                    </div>
                    <div className="md:w-2/3 md:ml-12">
                        <input onChange={formik.handleChange} value={formik.values.address} name='address' id='address' className=" appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" />
                    </div>
                    <div>
                        {formik.errors.address ? <p className='text-red-500 text-xs italic'>{formik.errors.address}</p> : null}
                    </div>
                </div>

                <div>
                    <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Save
                    </button>
                </div>

            </form>
        </div>
    )
}

export default EditAccount
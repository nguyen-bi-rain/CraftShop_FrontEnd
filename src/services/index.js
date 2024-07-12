import axios from 'axios';

const API_URL = 'https://localhost:7188/api';


export const fetchData = async (pageSize, pageNumber) => {
    try {
        const response = await axios.get(`${API_URL}/product/GetAllProduct`, {
            params: {
                pageSize: pageSize,
                pageNumber: pageNumber,
            }
        });
        return {
            data: response.data,
            pagination: JSON.parse(response.headers['x-pagination'])
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const addData = async (item) => {
    try {
        const response = await axios.post(`${API_URL}/Product/${item}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export async function getProductById(id) {
    try {
        const res = await axios.get(`${API_URL}/Product/${id}`);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export async function LoginApi(values) {
    try {
        const res = await axios.post(`${API_URL}/auth/login`, values);
        return res.data;
    } catch (err) {
        throw err;
    }
}
export async function RegisterApi(values) {
    try {
        const res = await axios.post(`${API_URL}/auth/register`, values);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export async function getUserAccount(value) {
    try {
        const res = await axios.get(`${API_URL}/auth/GetUserForAccount`, {
            headers: {
                Authorization: `Bearer ${value}`
            },params:{
                token : value
            }
        });
        return res.data;
    } catch (err) {
        throw err;
    }
}

export async function SearchProuct(name,categoryId,pageSize,pageNumber,minPrice,maxPrice){
    try{
        const response = await axios.get(`${API_URL}/product/ProductSearch`,{
            params:{
                Name : name,
                CategoryId : categoryId,
                pageSize : pageSize,
                pageNumber : pageNumber,
                minPrice : minPrice,
                maxPrice : maxPrice
            },
            headers : {
                Authorization : `Bearer ${localStorage.getItem('user')}`
            }
        });
        return {
            data: response.data,
            pagination: JSON.parse(response.headers['x-pagination'])
        };
    }
    catch(err){
        throw err;
    }   
}


export async function UpdateUserAccount(value,token){
    try{
        const res = await axios.put(`${API_URL}/auth/UpdateAccount`,value,{
            headers : {
                Authorization : `Bearer ${localStorage.getItem('user')}`
            }
        })
        return res.data;
    }catch(err){
        throw err;
    }
}
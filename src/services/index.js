import axios from 'axios';

const API_URL = 'https://localhost:7188/api';


export const fetchData = async (pageNumber,pageSize) => {
    try {
        const response = await axios.get(`${API_URL}/product/GetAllProduct`,{
            params : {
                pageSize : pageSize,
                pageNumber : pageNumber
            }
        });
        return {
            data : response.data,
            pagination : JSON.parse(response.headers['x-pagination'])
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
        const res = await axios.post(`${API_URL}/auth/login`,values);
        return res.data;
    } catch (err) {
        throw err;
    }
}
export async function RegisterApi(values) {
    try {
        const res = await axios.post(`${API_URL}/auth/register`,values);
        return res.data;
    } catch (err) {
        throw err;
    }
}

import axios from 'axios';

const API_URL = 'https://localhost:7188/api';


export const fetchData = async () => {
    try {
        const response = await axios.get(`${API_URL}/product/GetAllProduct`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const addData = async () => {
    try {
        const response = await axios.get(`${API_URL}/GetAllProduct`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getProductById = async (productId) => {
    try{
        const response  = await axios.get(`${API_URL}/Product/${productId}`);
        return response.data;
    }catch(error){
        console.error('error fetching product:', error);
        throw error;
    }
}
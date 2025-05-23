import { useState , useEffect } from "react";
import axiosIns from "../utils/axios.jsx";

export default function useCategory(){
    const [categories , setCategories ] = useState([]);

    //get category
    const getCategories = async () =>{
        try {
            const {data} = await axiosIns.get(`/api/v1/category/get-category`);
            setCategories(data?.category)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(()=>{
        getCategories();
    },[]);

    return categories;
}
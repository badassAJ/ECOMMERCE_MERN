import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async(req,res)=>{
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401).send({message:"Name is Required"});
        }
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:"Category Already Exists"
            })
        }
        const category = await new categoryModel({name, slug:slugify(name)}).save();
        res.status(201).send({
                success:true,
                message:"New Category Created",
                category
            })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in Category"
        })
    }

};


//update category
export const updateCategoryController =async (req,res) =>{
    try {
        const {name}  =req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        res.status(201).send({
                success:true,
                message:"Category Updated Successfully",
                category
            })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in Updating Category"
        })
    }
};



//category controller
export const categoryController = async(req,res) => {
    try {
        const category = await categoryModel.find({});
        res.status(201).send({
                success:true,
                message:"All Categories List",
                category
            })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting All Categories"
        })
    }
}


//single category 
export const singleCategoryController = async(req,res) => {
    try {
        const {slug} = req.params
        const category = await categoryModel.findOne({slug});
        res.status(200).send({
                success:true,
                message:"Get Single Category Successfully",
                category
            })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting Category"
        })
    }
}


//delete
export const deleteCategoryController = async(req,res) => {
    try {
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
                success:true,
                message:"Category Deleted Successfully",
                
            })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while deleting"
        })
    }
}
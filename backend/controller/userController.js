import User from "../models/userModel.js";

export const create = async (req,res) => {
    try {
        const newUser = new User(req.body)
        const {email} = newUser;

        const userExist = await User.findOne({email})
        if (userExist) {
            return res.status(400).json({message:"L'utilisateur existe déja"})   
        }
        const savedData = await newUser.save()
        // res.status(200).json(savedData)
        res.status(200).json({message:"Utilisateur crée avec succès"})
    } catch (error) {

       return res.status(500).json({errorMessage:error.message})
    }
}

export const getAllUsers = async (req,res) => {

    try {
        const userData = await User.find()

        if (!userData || userData.length === 0) {
            return res.status(404).json({message:"Pas de données trouvés"})
            
        }
        return res.status(200).json(userData)
    } catch (error) {
        return res.status(500).json({errorMessage:error.message})
    }

}

export const getUserById = async(req,res) => {
    try {
        const id = req.params.id
        const userExist = await User.findById(id)
        if (!userExist) {
            return res.status(404).json({message:"utilisateur non trouvé"})
        }
        return res.status(200).json(userExist)
    } catch (error) {
        return res.status(500).json({errorMessage:error.message})
    }
}

export const updateUserById = async(req,res) => {
    try {

        const id = req.params.id
        const userExist = await User.findById(id)
        if (!userExist) {
            return res.status(404).json({message:"utilisateur non trouvé"})
        }
        const UpdatedData = await User.findByIdAndUpdate(id,req.body,{
            new:true
        })
        // return res.status(200).json(UpdatedData)
        return res.status(200).json({message:"Utilisateur Modifié avec succès"})
    } catch (error) {
        return res.status(500).json({errorMessage:error.message})
    }
}

export const deleteUserById = async (req,res) => {
    try {

        const id = req.params.id
        const userExist = await User.findById(id)
        if (!userExist) {
            return res.status(404).json({message:"utilisateur non trouvé"})
        }
        await User.findByIdAndDelete(id)
        return res.status(200).json({message:"Utilisateur supprimé avec succès"})
        
    } catch (error) {
        return res.status(500).json({errorMessage:error.message})
    }
}
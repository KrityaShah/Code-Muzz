const User = require('../model/user-model');
const Project = require("../model/Project-model")
const bcrypt = require('bcryptjs')

// Home page:
const home = async (req, res) => {
    try {
        return res
        .status(200)
        .send("Welcome to home using controller");
    } catch (error) {
        console.error(error);
        
    }
   
}

// Registration:

const register = async (req, res) =>{
    try {

        const {username, password, email, phone } = req.body;

        const userExist = await User.findOne({email})

        if(userExist){
            return res
            .status(400)
            .json({Message: "Email already Exist!"});
        }

        const saltRound = 10;
        const hash_password = await bcrypt.hash(password, saltRound);

        const userCreated = await User.create({username, password : hash_password, email, phone});

       return res
        .status(201)
        .json({Message: "Registration Sucessfull!", token: await userCreated.generateToken(), userId: userCreated._id.toString()});
    } catch (error) {
        console.error(error);
        
    }
}


// Login

const login = async (req, res) =>{
    try {
        const {email, password } = req.body;
        
        const userExist = await User.findOne({email});

        if(!userExist){
            return res
            .status(400)
            .json({message: "Invalid credential"})
        }

        
        const isPasswordValid  = await bcrypt.compare(password, userExist.password);

        if(isPasswordValid ){
            res.status(200).json({
                message: "Login sucessfull",
                token : await userExist.generateToken(),
                userId: userExist._id.toString(),
            })
        }else{
            res.status(401).json({message: "invalid Credentail"});
        }

    } catch (error) {
        console.error(error);
        
    }
}

// ForProjectCreation:

const projectCreation = async (req, res) => {
    try {
        const { name, description, html, css, javascript } = req.body
      
        const projectExist = await Project.findOne({name})

        if(projectExist){
           return res
            .status(400)
            .json({message: "Project name already existed!"})
        }

        const projectCreated = await Project.create({name, description, html, css, javascript});

        return res
        .status(201)
        .json({Message: "File Created sucessfully!",  projectId: projectCreated._id,});
       

    } catch (error) {
        console.error(error);
        
    }
}

// For projectid
const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        return res.status(200).json(project); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// to update the project

const updateProject = async (req, res) => {
    try {
        const { id } = req.params; 
        const updatedData = req.body; 

      
        const updatedProject = await Project.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        return res.status(200).json(updatedProject);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = {home, register, login, projectCreation,  getProjectById, updateProject};
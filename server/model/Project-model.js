const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        require : true,
    },
    description :{
        type: String,
        require : true,
    },
    html:{
        type: String,
        require: false,
    },
    css:{
        type: String,
        require: false,
    },
    javsscript:{
        type:String,
        require: false,
    }
})


const Project = new mongoose.model("Project", projectSchema)

module.exports = Project;
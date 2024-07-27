const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema ({
    contactId: {
        type: String,
        required: true,
    },
    name :{
        type : String,
        default: "",
        required: true
    },
    email :{
        type : String,
        default: "",
        required: true
    },
    message :{
        type : String,
        default: "",
        required: true
    }
}, {timestamps: true}
)
module.exports = mongoose.model('contact', contactSchema)
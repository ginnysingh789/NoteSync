const mongoose=require('mongoose');
const { string } = require('zod');

const Inputscheme=new mongoose.Schema(
    {
        email:String,
        password:String,
        notes: { type: [String], default: [] }
    })
    const database=mongoose.model('database',Inputscheme);
    module.exports={database}

const express=require('express');
const bcrypt=require('bcrypt');
const cors=require('cors');
const { InputScheme } = require('./InputValidation');
const { database } = require('./Database');
const jwt=require('jsonwebtoken');
const SECRET_KEY='ginny1singh';
const app=express();
app.use(express.json());
app.use(cors());
//New user
app.post('/Sign-up',async function(req,res)
{
    const RecieveData=req.body;
    const pareseRecieveData=InputScheme.safeParse(RecieveData);
    //First check it follows the validation Scheme 
       if(!pareseRecieveData.success)
       {
        return res.status(400).json({msg:'Invalid data'})
       }
       //check the user is already is Exist or not 
       if( await checkUserExit(pareseRecieveData.data.email))
       {
         return res.status(411).json({msg:'User already Exists'})
       }
       else{
        //First hash the password before push in the database
        const hashedpassword=await bcrypt.hash(pareseRecieveData.data.password,10);
        //Push the data in the Database
        const pushdata=await database.create(
            {
                email:pareseRecieveData.data.email,
                password:hashedpassword
            }
           )
           res.status(200).json({msg:'Successfully push the data '})
       }
})
//CheckUserExit Function and Password 
async function checkUserExit(useremail)
{
    const checkemail=await database.findOne({email:useremail});
    return checkemail?true:false;
}
 async function checkUserCreditenials(userCreditenials)
{
   const checkEmail=await database.findOne({email:userCreditenials.data.email});
   if(!checkEmail)
   {
        return false;
   }
   const checkPass= await bcrypt.compare(
    userCreditenials.data.password,checkEmail.password)
    if(!checkPass)
    {
       return false
    } 
    return true;
}
//Existing user open NoteTaking app
app.post('/sign-in', async function(req,res)
{
    const signUpData=req.body;
    //check input match the validation;
    const parsedData=InputScheme.safeParse(signUpData);
    if(!parsedData.success)
    {
        return res.status(400).json({msg:'Invalid datatype'})
    }
    if( !await checkUserExit(parsedData.data.email))
        {
          return res.status(401).json({msg:'First register '})
        }
    if(! await checkUserCreditenials(parsedData))
    {
       return res.status(403).json({msg:'Invalid Creditenails'})
    }
    //Generate token
    const token=jwt.sign({email:parsedData.data.email},SECRET_KEY);
     res.status(200).json({ token, user: { _id: user._id } });
})
app.delete('/delete-note/:index', authorizeUser, async function(req, res) {
    try {
        const index = parseInt(req.params.index); // Convert index to number
        const user = await database.findOne({ email: req.useremail });

        if (!user) {
            return res.status(403).json({ msg: 'User not found' });
        }

        if (index < 0 || index >= user.notes.length) {
            return res.status(400).json({ msg: 'Invalid index' });
        }

        user.notes.splice(index, 1); // Remove note from array
        await user.save(); // Save updated notes

        res.status(200).json({ notes: user.notes }); // Return updated notes list
    } catch (error) {
        res.status(500).json({ msg: 'Error deleting note', error });
    }
});
function result() {
  let a = 1;
  let b = 2;
  return Math.min(a, b);
}

console.log(result()); // Output: 

//Take input notes from the user
function authorizeUser(req,res,next)
{
    const token =req.headers.authorization;
    if(!token)
    {return res.json({msg:'Token not recieved'})}
    try {
        const decoded=jwt.verify(token,SECRET_KEY);
        req.useremail=decoded.email;
    } catch (error) {
       res.status(401).json({msg:'Invalid token'})
    }
    next();
}
app.post('/saveNotes',authorizeUser, async function(req,res)
{
   const newNotes=req.body.notes;
   const saveToEmail=await database.findOne({email:req.useremail});
   if(!saveToEmail)
   {
     return res.json('Something went during in the submitting process');
   }
   if(!saveToEmail.notes)
    {
        saveToEmail.notes=[];
    }
   saveToEmail.notes.push(newNotes);
   await saveToEmail.save();
   res.status(200).json('Successfully save data in the database');

})

//get the save notes
app.get('/getNotes',authorizeUser, async function(req,res)
{
    const user=await database.findOne({email:req.useremail});
    if(!user)
    {
        return res.status(401);
    }
    res.status(200).json({notes:user.notes||[]})

})
// app.delete('/delete-note/${userId}/${index}', async function(req,res)
// {
//     const {userId,index}=req.params;
//     try {
//         const user =await database.findById(userId);
//         if(!user)
//         {
//             return res.status(403).json('User not found');

//         }
//         user.notes.slice(index,1);
//         await user.save();
//         res.status(200).json({notes:user.notes});
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting note", error });
//     }
// })

app.listen(5000,()=>
{
    console.log('Port is running')

})

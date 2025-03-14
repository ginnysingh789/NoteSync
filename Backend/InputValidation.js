const zod=require('zod');
const InputScheme=zod.object(
    {
        email:zod.string().email(),
        password:zod.string().min(5)
    })


module.exports={InputScheme};
const asyncHandler =(requestHandler) => {
    return (req,res,next)=>    {
        Promise.resolve(requestHandler(req,res,next)).catch ((err) => next(err))
    }
}


export{asyncHandler}

// const asyncHandler  = () => {}
// const asyncHandler =(function) => () => {}
// const asyncHandler =(function) => async() => {}
// above is explanation of below

// const asyncHandler =(fn) => async(req,res,next) => {

// try {
//     await fn(req,res,next)
// } catch (error) {
//     res.status(err.code||400).json({
//     sucess:false,
//     message:err.message

// })
    
// }}
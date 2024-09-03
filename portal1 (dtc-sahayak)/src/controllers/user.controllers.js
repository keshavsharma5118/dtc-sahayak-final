import{asyncHandler} from "../utils/asyncHandler.js";
// importing API error
import {ApiError} from "../utils/ApiError.js"
// imported model/user since we know that our user contain schema of our mongodb so we need to export that 
import {User} from "../models/user.models.js"
// importingg for cloudinary

import {uploadOncloudinary} from "../utils/cloudinary.js"

// importing API RESPONSE
import {ApiResponse} from "../utils/ApiResponse.js" 
 
const generateAccessAndRefreshToken = async(userId) =>   {
    try {
      const user =  await User.findById(userId)
        const accessToken= user.generateAccessToken()
       const refreshToken = user.generateRefreshToken()


       user.refreshToken = refreshToken
      await user.save({validateBeforeSave: false})

       return{accessToken,refreshToken}



    } catch (error) {
        throw new ApiError(500,"Something Went wrong while checking and trying refresh token")
    }
}

const registerUser = asyncHandler (async ( req , res )  => {
    // step to register user
    // validation not error in email or phone number etc - not empty
    // check the user already exist through username and emails
    // check images
    // check for avatar
    // upload them to cloudinary
    // create user object - create entry in db
    // remove password and refresh token field fr5om response
    // check fo user creation   
    // return response


    //   working on validation
    const {FullName, email, username, password } = req.body 

    if (
        [FullName, email, username, password].some((field) => field?.trim() === "")
    )
  {
        throw new ApiError(400, "All fields are required, and email must contain '@' and end with '.com'",[]);
    }

    // now user will tell us that the user is available or not
    const ExistedUser = await  User.findOne({

        $or:[{username},{email}]
    })
// checking a the user is existing or not 
    if (ExistedUser) {
        throw new ApiError(409,  "Already Existing User",[])
        
    }


    // storing files


    
    // const avatarLocalPath = req.files?.avatar[0]?.path ;
    // const coverImagelocalPath = req.files?.coverImage?.[0]?.path || null;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
// checking for avatar is there or not using if 
// if (!avatarLocalPath) {
    // throw new ApiError(400 , "Avatar required",[])
    
// }

// uploading on cloudinary 
// const avatar = await uploadOncloudinary(avatarLocalPath)

const coverImage = await uploadOncloudinary(coverImageLocalPath)

// if (!avatar) {
//     throw new ApiError (404 ,"avatar image not found",[])
    
// }


// entry in database

const user = await User.create({
    FullName,
    // avatar: avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
})

// to check wheater empty folder is not stored check it by a methodfindby id when a data is entered mongodb creates an id of the data
const createduser = await User.findById(user._id).select(
    "-password -refreshToken"
)
if (!createduser) {
    throw new ApiError(501,"something went wong while registring a user",[])
    
}
//  sending response
return res.status(201).json(
    new ApiResponse(200,createduser,"User registered successfully")
)
   


})

const loginUser = asyncHandler (async(req,res)=>{
    // step to login
    // req.body ->data fatching
    // username/email
    // Find the user
    // password check
    // acess and refresh token generated  some part alreaddy done in user.models.js
    // send secure cookie

    const {email,username,password} = req.body
    console.log(email);
    if (!username && !email)
        {
throw new ApiError (400,"username or password required")

    }
// finding the user
 const user = await User.findOne({
    $or:[{username},{email}]
})
if (!user) {
    throw new ApiError ( 404,"user not found")   
}

const isPasswordValid=await user.isPasswordCorrect(password)

if (!isPasswordValid) {
    throw new ApiError ( 401,"Password is Incorrect")   
}

const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)
  const loggedInUser = await User.findById( user._id).select("-password -refreshToken")


  const options = {
httpOnly:true,
secure:true  
  }

return res
.status(200)
.cookie("accessToken",accessToken,options)
.cookie("refreshToken",refreshToken,options)
.json(
    new ApiResponse(
        200,
        {
            user: loggedInUser,accessToken,refreshToken
        },
        "User Logged In Successfully"
    )
)



})

const logoutUser = asyncHandler(async(req,res)=>{

    User.findByIdAndUpdate(
        req.user._id,{
            $set:{
                refreshToken: undefined
            }
        },
        {
            new:true
        }
    )
    const options = {
        httpOnly:true,
        secure:true  
          }
       
          return res
          .status(200)
          .clearCookie("accessToken",options)
          .clearCookie("refreshToken",options)
          .json(new ApiResponse(200,{},"User looged out  "))
   
})



export  {
    registerUser,
    loginUser,
    logoutUser,
} 
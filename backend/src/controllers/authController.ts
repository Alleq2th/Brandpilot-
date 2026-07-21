import { Request, Response } from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  getUser
} from "../services/authService.js";


// =======================
// SIGN UP
// =======================

export const signup = async (
  req: Request,
  res: Response
) => {
  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required"
      });
    }


    const user = await signupUser({
      name,
      email,
      password
    });


    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: user
    });


  } catch (error: any) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }
};



// =======================
// LOGIN
// =======================

export const login = async (
  req: Request,
  res: Response
) => {

  try {

    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        success:false,
        message:"Email and password are required"
      });
    }


    const session = await loginUser({
      email,
      password
    });


    return res.status(200).json({
      success:true,
      message:"Login successful",
      data: session
    });


  } catch(error:any){

    return res.status(401).json({
      success:false,
      message:error.message
    });

  }

};



// =======================
// LOGOUT
// =======================

export const logout = async (
  req: Request,
  res: Response
)=>{

  try{

    await logoutUser();


    return res.status(200).json({
      success:true,
      message:"Logged out successfully"
    });


  }catch(error:any){

    return res.status(400).json({
      success:false,
      message:error.message
    });

  }

};



// =======================
// CURRENT USER
// =======================

export const getCurrentUser = async (
  req:Request,
  res:Response
)=>{

  try{

    const user = await getUser(
      req.headers.authorization
    );


    return res.status(200).json({
      success:true,
      data:user
    });


  }catch(error:any){

    return res.status(401).json({
      success:false,
      message:error.message
    });

  }

};

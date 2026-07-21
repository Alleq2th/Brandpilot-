import { Request, Response, NextFunction } from "express";
import { supabaseAdmin } from "../config/supabase.js";


// Extend Express request type
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}


// =======================
// AUTH MIDDLEWARE
// =======================

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const authHeader = req.headers.authorization;


    if (!authHeader) {

      return res.status(401).json({
        success: false,
        message: "Authorization token required"
      });

    }


    const token = authHeader.replace(
      "Bearer ",
      ""
    );


    const {
      data,
      error
    } = await supabaseAdmin.auth.getUser(
      token
    );


    if (error || !data.user) {

      return res.status(401).json({
        success:false,
        message:"Invalid authentication token"
      });

    }


    // Attach user to request
    req.user = data.user;


    next();


  } catch(error:any){

    return res.status(500).json({
      success:false,
      message:"Authentication failed"
    });

  }

};

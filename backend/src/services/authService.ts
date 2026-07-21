import { supabase, supabaseAdmin } from "../config/supabase.js";


// =======================
// SIGN UP USER
// =======================

interface SignupData {
  name: string;
  email: string;
  password: string;
}


export const signupUser = async ({
  name,
  email,
  password
}: SignupData) => {


  const {
    data,
    error
  } = await supabase.auth.signUp({

    email,

    password,

    options: {
      data: {
        name
      }
    }

  });


  if(error){
    throw new Error(error.message);
  }


  return {
    user:data.user,
    session:data.session
  };

};



// =======================
// LOGIN USER
// =======================


interface LoginData {
  email:string;
  password:string;
}


export const loginUser = async ({
  email,
  password
}:LoginData)=>{


  const {
    data,
    error
  } = await supabase.auth.signInWithPassword({

    email,

    password

  });


  if(error){
    throw new Error(error.message);
  }


  return {
    user:data.user,
    session:data.session
  };

};



// =======================
// LOGOUT USER
// =======================


export const logoutUser = async()=>{


  const {
    error
  } = await supabase.auth.signOut();


  if(error){
    throw new Error(error.message);
  }


};



// =======================
// GET CURRENT USER
// =======================


export const getUser = async(
  authorization?:string
)=>{


  if(!authorization){

    throw new Error(
      "Authorization token missing"
    );

  }


  const token =
    authorization.replace(
      "Bearer ",
      ""
    );


  const {
    data,
    error
  } = await supabaseAdmin.auth.getUser(
    token
  );


  if(error){

    throw new Error(
      "Invalid or expired token"
    );

  }


  return data.user;

};

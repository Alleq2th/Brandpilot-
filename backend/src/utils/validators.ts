import { z } from "zod";


// =======================
// SIGNUP VALIDATION
// =======================

export const signupValidator = z.object({

  name: z
    .string()
    .min(2, "Name must contain at least 2 characters")
    .max(50, "Name is too long"),


  email: z
    .string()
    .email("Invalid email address"),


  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")

});



// =======================
// LOGIN VALIDATION
// =======================

export const loginValidator = z.object({

  email: z
    .string()
    .email("Invalid email address"),


  password: z
    .string()
    .min(1, "Password is required")

});



// =======================
// VALIDATION HELPER
// =======================

export const validate = (
  schema:any,
  data:any
)=>{

  const result = schema.safeParse(data);


  if(!result.success){

    throw new Error(
      result.error.errors[0].message
    );

  }


  return result.data;

};

import { supabase } from "../config/supabase.js";


export async function createWorkspace(
  ownerId: string,
  name: string,
  description?: string
) {

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");


  const { data, error } = await supabase
    .from("workspaces")
    .insert({
      owner_id: ownerId,
      name,
      slug,
      description
    })
    .select()
    .single();


  if (error) {
    throw new Error(error.message);
  }


  return data;
}



export async function getUserWorkspaces(
  userId: string
) {

  const { data, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("owner_id", userId);


  if (error) {
    throw new Error(error.message);
  }


  return data;
}

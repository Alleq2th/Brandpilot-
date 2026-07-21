import { Request, Response } from "express";
import {
  createWorkspace,
  getUserWorkspaces
} from "../services/workspace.service.js";

export async function createWorkspaceController(
  req: Request,
  res: Response
) {
  try {
    const { ownerId, name, description } = req.body;

    if (!ownerId || !name) {
      return res.status(400).json({
        success: false,
        message: "ownerId and name are required"
      });
    }

    const workspace = await createWorkspace(
      ownerId,
      name,
      description
    );

    return res.status(201).json({
      success: true,
      message: "Workspace created successfully",
      data: workspace
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
}

export async function getWorkspacesController(
  req: Request,
  res: Response
) {
  try {

    const { userId } = req.params;

    const workspaces = await getUserWorkspaces(userId);

    return res.json({
      success: true,
      data: workspaces
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
  }

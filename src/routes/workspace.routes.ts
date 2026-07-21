import { Router } from "express";

import {
  createWorkspaceController,
  getWorkspacesController
} from "../controllers/workspace.controller.js";


const router = Router();


// Create workspace
router.post(
  "/",
  createWorkspaceController
);


// Get user workspaces
router.get(
  "/:userId",
  getWorkspacesController
);


export default router;

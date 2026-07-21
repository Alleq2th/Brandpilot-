import { Router } from "express";

import {
  createWorkspaceController,
  getWorkspacesController
} from "../controllers/workspace.controller.js";


const router = Router();


router.post(
  "/",
  createWorkspaceController
);


router.get(
  "/:userId",
  getWorkspacesController
);


export default router;

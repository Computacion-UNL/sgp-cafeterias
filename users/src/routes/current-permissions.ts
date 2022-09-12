import express from "express";
import { PrivilegeModel } from "../models";

const router = express.Router();

router.get("/currentpermissions", async (req, res) => {
  if (req.currentUser) {
    const permissions = await PrivilegeModel.find({
      roles: req.currentUser.rol.id,
    }).select("name status");

    return res.json(permissions);
  }

  res.json([]);
});

export { router as currentPermissionsRouter };

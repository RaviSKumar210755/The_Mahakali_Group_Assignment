import UserRole from "./../../models/userRoleModel.js";
import flushCache from "../../utils/flushAll.js";
const userRoleController = async (req, res) => {
  try {
    await flushCache();
    const { type, is_active } = req.body;

    if (!type) {
      return res.status(400).json({ error: "Role type is required" });
    }

    const newRole = await UserRole.create({
      type: type,
      is_active: is_active,
    });

    res
      .status(201)
      .json({ message: "User role created successfully", role: newRole });
  } catch (error) {
    res.status(400).send("Error creating user role: " + error.message);
  }
};
export default userRoleController;

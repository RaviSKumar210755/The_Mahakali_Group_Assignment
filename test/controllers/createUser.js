import User from "../../models/userModel.js";
import flushCache from "../../utils/flushAll.js";

const createUserController = async (req, res) => {
  try {
    await flushCache();

    const users = Array.isArray(req.body) ? req.body : [req.body];

    for (const userData of users) {
      await User.create(userData);
    }

    res.status(201).json("All Users created successfully");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default createUserController;

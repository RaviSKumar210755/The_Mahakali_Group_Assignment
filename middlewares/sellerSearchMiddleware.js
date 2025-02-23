const sellerSearchMiddleware = async (req, res, next) => {
  if (!req.query.id && !req.query.name && !req.query.mobile) {
    return res
      .status(400)
      .json({ message: "At least one search field is required" });
  }
  next();
};
export default sellerSearchMiddleware;

const checkDealerId = async (req, res, next) => {
  if (!req.query.dealerId) res.status(400).send("You must provide DealerId");
  next();
};

export default checkDealerId;

const filterByDate = async (req, res, next) => {
  if (!req.query.start || !req.query.end)
    res.status(400).send("Please provide a valid date");
  next();
};
const filterByEarningThreshold = async (req, res, next) => {
  if (!req.query.threshold)
    res.status(400).send("Please provide a Threshold value.");
  next();
};
const filterBySellerCategory = async (req, res, next) => {
  if (!req.query.category)
    res.status(400).send("Please provide a valid Category.");
  next();
};

export { filterByDate, filterByEarningThreshold, filterBySellerCategory };

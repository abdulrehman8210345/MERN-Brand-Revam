export const userTypeValidator =  (req, res, next) => {
  const userType = req.body.userType;

  if (!userType) {
    return res.status(400).json({ message: "userType is required" });
  }

  if (!userType || !["vendor", "customer"].includes(userType.toLowerCase())) {
    return res.status(400).json({ message: "userType not matched" });
  }

  //it means user has provided user type of either vendor or customer

  next();
};

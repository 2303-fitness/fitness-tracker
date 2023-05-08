function requireUser(req, res, next) {
  console.log("BEEEBOOOOPBEEEBOOOOP!", req.user);
  if (!req.user) {
    return res.status(403).json({
      error: "Unauthorized",
      message: "You must be logged in to perform this action"
    });
  }

  next();
}

module.exports = {
  requireUser
}
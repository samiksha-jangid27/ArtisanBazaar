function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ ERROR: "Access denied" });
    }
    next();
  };
}

module.exports = { authorizeRoles };

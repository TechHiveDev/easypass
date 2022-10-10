export const isAuthenticated = (req, res, next) => {
  if (!req?.user) {
    return res.status(401).json({
      status: 401,
      message: "Un-Auth  !",
    });
  }

  next();
};

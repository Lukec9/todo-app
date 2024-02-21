const User = require("../models/userModel");

module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
      if (err) return next(err);
      // res.redirect("/campgrounds");
      res.status(201).json({
        message: "User created successfully",
        user: registeredUser,
      });
    });
  } catch (e) {
    // res.redirect("register");
    console.error(e); // Log the error for debugging
    res.status(500).json({ error: "Internal Server Error" }); // Send a meaningful error response
  }
};

module.exports.login = (req, res) => {
  res.status(200).json({ message: "Login successful", user: req.user });
};

module.exports.logout = (req, res) => {
  req.logout(function (e) {
    res.json("Logged out successfully");
  });
};

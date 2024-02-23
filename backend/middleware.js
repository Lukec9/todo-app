const { todoSchema } = require("./schemas.js");

module.exports.validateTodo = (req, res, next) => {
  const { error } = todoSchema.validate(req.body);
  console.log(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    res.status(400).json({ error: msg });
  } else {
    next();
  }
};

// module.exports.validateUser = (req, res, next) => {
//   const { error } = userSchema.validate(req.body);
//   if (error) {
//     const msg = error.details.map(el => el.message).join(",");
//     res.status(400).json({ error: msg });
//   } else {
//     next();
//   }
// };

// module.exports.isAuthor = async (req, res, next) => {
//   const { id } = req.params;
//   const todo = await Todo.findById(id);
//   if (!todo.author.equals(req.user._id)) {
//     return res.json("error", "You do not have permission to do that!");
//   }
//   next();
// };

// module.exports.isReviewAuthor = async (req, res, next) => {
//   const { id, reviewId } = req.params;
//   const review = await Review.findById(reviewId);
//   if (!review.author.equals(req.user._id)) {
//     req.flash("error", "You do not have permission to do that!");
//     return res.redirect(`/campgrounds/${id}`);
//   }
//   next();
// };

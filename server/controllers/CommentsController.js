import CommentModel from "../models/Comment.js";
import UserModel from "../models/User.js";
import PostModel from "../models/Post.js";

export const createComment = async (req, res) => {
  try {
    const postId = req.body.postId;
    const doc = new CommentModel({
      comment: req.body.comment,
      author: req.userId,
    });

    const comment = await doc.save();
    await PostModel.findByIdAndUpdate(postId, {
      $push: { comments: comment._id },
    });

    CommentModel.findOne({ _id: comment.id })
      .populate({
        path: "author",
      })
      .then((comment) => {
        res.json(comment);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Please again, failed to create comment!",
    });
  }
};

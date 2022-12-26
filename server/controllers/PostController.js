import PostModel from "../models/Post.js";
import UserModel from "../models/User.js";
import CommentModel from "../models/Comment.js";

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Please again, failed to get articles!",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      },
      (error, doc) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            message: "Failed to get article!",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "The article didn't find!",
          });
        }

        res.json(doc);
      }
    ).populate("user");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Please again, failed to get articles!",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (error, doc) => {
        if (error) {
          console.log(err);
          return res.status(500).json({
            message: "Failed to delete article!",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "The article didn't find!",
          });
        }

        res.json({ success: true });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Please again, failed to get articles!",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().sort("-createdAt");
    const popularPosts = await PostModel.find().limit(5).sort("-viewsCount");

    if (!posts) {
      return res.json({ message: "There are not posts!" });
    }

    res.json({ posts, popularPosts });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Please again, failed to get articles!",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(","),
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Please again, failed to create article!",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags.split(","),
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to update article!",
    });
  }
};

export const getPostComments = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOne({ _id: postId })
      .populate({
        path: "comments",
        populate: {
          path: "author",
        },
      })
      .then((comments) => {
        res.json(comments);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Please again, failed to get comments for this post!",
    });
  }
};

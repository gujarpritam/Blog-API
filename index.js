const express = require("express");
const db = require("./config/db");
const Post = require("./models/Post");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

db()
  .then(() => {
    console.log("successfully connected to db");
  })
  .catch((err) => console.log(err));

app.get("/api/", (req, res) => {
  res.status(200).json({ message: "api is working fine" });
});

// fetching all posts
app.get("/api/posts", (req, res) => {
  Post.find({})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

// get a specific post
app.get("/api/posts/:id", (req, res) => {
  let postId = req.params.id;
  Post.find({ _id: postId })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

//creation of a post
app.post("/api/posts/", (req, res) => {
  let newPost = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  newPost
    .save()
    .then((data) => {
      console.log(data);
      res.status(200).json({ message: "Post created successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

app.put("/api/posts/:id", (req, res) => {
  let postId = req.params.id;
  console.log(req.body.title, " ", req.body.description);

  let newInfo = {
    title: req.body.title,
    description: req.body.description,
  };

  console.log(newInfo);

  Post.findByIdAndUpdate(postId, req.body)
    .then((data) => {
      console.log(data);
      res
        .status(200)
        .json({ message: "Post updated successfully", data: data });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

app.delete("/api/delete/:id", (req, res) => {
  let postId = req.params.id;

  Post.findByIdAndDelete(postId)
    .then((data) => {
      console.log(data);
      res
        .status(200)
        .json({ message: "Post deleted successfully", data: data });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server is running at port ${port}`);
  }
});

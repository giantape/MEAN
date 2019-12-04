const express = require("express");
const bodyParser = require("body-parser");
const PostSchema = require("./models/postsModel");
const dbConfig = require('./config/config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new PostSchema({
      title: req.body.title,
      content: req.body.content
  })
  console.log(post);
  post.save().then(result => {
    res.status(201).json({
        message: 'Post added successfully',
        postId: result._id
      });
  })

});

app.get("/api/posts", (req, res, next) => {
    PostSchema.find()
    .then(posts => {
        res.send(posts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error No Record in the Database."
        });
    });
});

app.delete("/api/posts/:id", (req, res) => {
    PostSchema.findByIdAndRemove(req.params.id)
        .then(post => {
            if (!post) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            res.send({ message: "user deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.id
            });
        });
})
module.exports = app;
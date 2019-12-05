const express = require('express');
const PostSchema = require("../models/postsModel");
const router =  express.Router();

router.post("", (req, res, next) => {
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
  
  router.get("", (req, res, next) => {
      PostSchema.find()
      .then(posts => {
          res.send(posts);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Error No Record in the Database."
          });
      });
  });
  
  router.get("/:id", (req, res) => {
      PostSchema.findById(req.params.id).then(post => {
          if(post){
              res.status(200).json(post)
          }else{
              res.status(400).json({message: 'Record not found'})
          }
      })
  })
  
  router.put("/:id", (req, res) => {
      const post = new PostSchema({
          _id: req.body.id,
          title: req.body.title,
          content: req.body.content
      })
      PostSchema.updateOne({_id: req.params.id}, post).then(result => {
          res.status(200).json({message: 'updated!!'})
      })
  })
  
  router.delete("/:id", (req, res) => {
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

  module.exports = router
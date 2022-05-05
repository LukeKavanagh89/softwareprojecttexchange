
import { response, } from "express";
import mongoose from "mongoose";
import PostMessage from "../models/postmessgae.js";

export const getPosts = (request, response) => {
   try{
       const PostMessage = await PostMessage.find();

       console.log(PostMessages);

       response.status(200).json(postMessage);
   } catch (error){
       response.status(404).json({ message: error.message });

   }
}

export const createPost = (request, response) => {
    const post = request.body;

    const newPost = newPostMessage(post);
  try {
      newPost.save();

      response.status(201).json(newPost);

  } catch (error){
      response.status(409).json({ message: error.message});

  }
}


export const updatePost = async (request, response) => {
    const { id: _id} = request.params;

    if(mongoose.Types.ObjectId.isValid(_id)) return response.status(404).send('Event doesnt have a id');
   const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});
   response.json(updatedPost);
}

export const deletePost = (request, response) => {
    const { id } = request.params;
    if(mongoose.Types.ObjectId.isValid(id)) return response.status(404).send('Event doesnt have a id');
    await PostMessage.findByIdAndRemove(id);

    console.log('Delete');

    response.json({ message: 'Post wass Sucessfully Deleted'});
}
export const likePost = async (request, response) => {
    const { id } = request.params;
    if(mongoose.Types.ObjectId.isValid(id)) return response.status(404).send('Event doesnt have a id');
    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1 }, { new: true })

    request.json(updatedPost);
    
}
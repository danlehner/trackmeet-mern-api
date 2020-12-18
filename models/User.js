const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: 
  { 
    type: String, 
    required: true, 
    unique: true 
  
  }, 
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true }, 
  profilePic: { type: String }, 
  city: { type: String }, 
  bio: { type: String }, 
  genres: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Genre'
    }
  ], 
  artists: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Artist'
    }
  ], 
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Song'
    }
  ]
})

userSchema.set("toJSON", {
  transform: (doc, ret, opt) => {
    delete ret["password"];
    return ret;
  },
});

const User = mongoose.model("User", userSchema)

module.exports = User
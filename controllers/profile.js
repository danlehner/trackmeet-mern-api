const express = require("express")
const router = express.Router()
const db = require("../models")

const show = async (req, res) => {
  try {
    const foundUser = await db.User.findById(req.userId).populate("artists").populate("genres").populate("songs")

    res.status(200).json({ status: 200, data: foundUser })
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again.",
    })
  }
}

const edit = async (req, res) => {
  try {
    const foundUser = await db.User.findById(req.userId)

    res.status(200).json({ status: 200, data: foundUser })
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again.",
    })
  }
}

const update = async (req, res) => {
  try {
    const foundUser = await db.User.findById(req.userId)

    const updateData = {
      $set: {
        username: req.body.username,
        profilePic: req.body.profilePic,
        city: req.body.city,
        bio: req.body.bio,
      },
    }

    await db.User.findByIdAndUpdate(foundUser._id, updateData, { new: true })

    res.status(200).json({ data: foundUser })
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again.",
    })
  }
}

const songDelete = async (req, res) => {
  try {
    const user = await db.User.findById(req.userId).populate("songs").populate("genres").populate("artists")

    console.log(user)

    const songToDelete = await db.Song.findById({ _id: req.params.songId })

    user.songs.remove(songToDelete)

    const artist = await db.Artist.findById(songToDelete.artist)
    artist.songs.remove(songToDelete)

    const genre = await db.Genre.findById(songToDelete.genre)
    genre.songs.remove(songToDelete)

    artist.songs.remove(songToDelete)
    genre.songs.remove(songToDelete)

    if (!artist.songs.length) {
      await db.Artist.findByIdAndDelete(artist._id)
      user.artists.remove(artist)
      genre.artists.remove(artist)
      await genre.save()
    } else {
      await artist.save()
    }

    if (!genre.songs.length) {
      await db.Genre.findByIdAndDelete(genre._id)
      user.genres.remove(genre)
    } else {
      await genre.save()
    }

    await db.Song.findByIdAndDelete(req.params.id)

    await user.save()

    res.status(200).json({ message: "song deleted" })
  } catch (error) {
    console.log(error)
    res.send({ message: "Internal Server Error" })
  }
}

module.exports = {
  show,
  edit,
  update,
  songDelete,
}

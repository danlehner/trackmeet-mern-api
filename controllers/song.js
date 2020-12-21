const express = require("express")
const router = express.Router()
const db = require("../models")

const index = async (req, res) => {
  try {
    const foundUser = await db.User.findById(req.userId).populate("songs")

    res.status(200).json({ status: 200, data: foundUser })
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again.",
    })
  }
}

const show = async (req, res) => {
  try {
    const foundSong = await db.Song.findById(req.params.songId)
    const foundArtist = await db.Artist.findById(foundSong.artist)
    const foundGenre = await db.Genre.findById(foundArtist.genre)

    res.status(200).json({ status: 200, song: foundSong, artist: foundGenre, genre: foundGenre })
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again.",
    })
  }
}

const destroy = async (req, res) => {
  try {
    const user = await db.User.findById(req.userId).populate("songs").populate("genres").populate("artists")

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
  index,
  show,
  destroy,
}

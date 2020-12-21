const express = require("express")
const router = express.Router()
const db = require("../models")

const index = async (req, res) => {
  try {
    const foundUser = await db.User.findById(req.userId).populate("artists")

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
    const foundArtist = await db.Artist.findById(req.params.artistId).populate("songs")
    const foundGenre = await db.Genre.findById(foundArtist.genre)

    res.status(200).json({ status: 200, artist: foundArtist, genre: foundGenre })
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again.",
    })
  }
}

module.exports = {
  index,
  show,
}

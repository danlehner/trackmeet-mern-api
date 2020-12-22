// external exports
const express = require("express")
const cors = require("cors")

// internal imports
const routes = require("./routes")

const PORT = process.env.PORT || 3001
const app = express()

// middleware JSON parsing
app.use(express.json())
app.use(cors())

// middleware - API routes

// Auth Routes
app.use("/api/v1/auth", routes.auth)

// Users Routes -> will this actually exist in the final?
app.use("/api/v1/users", routes.user)

// Profile Routes
app.use("/api/v1/profile", routes.profile)

// Genre Routes
app.use("/api/v1/genres", routes.genre)

// Artist Routes
app.use("/api/v1/artists", routes.artist)

// Song Routes
app.use("/api/v1/songs", routes.song)

// Search Route
app.use("/api/v1/search", routes.search)

// connection
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

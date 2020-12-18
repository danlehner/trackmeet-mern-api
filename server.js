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

// Users Routers
app.use("/api/v1/users", routes.user)

// Search Route
app.use("/api/v1/search", routes.search)

// connection
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

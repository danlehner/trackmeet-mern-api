// external exports 
const express = require("express"); 
const cors = require("cors"); 

// internal imports

const PORT = process.env.PORT || 3001; 
const app = express(); 

// middleware JSON parsing
app.use(express.json()); 
app.use(cors()); 

// middleware - API routes

// Auth Routes

// Users Routers

// connection 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
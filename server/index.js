const express = require("express")
const server = express()

const cartRoute = require("./routes/Cart")
const userRoutes = require("./routes/User")
const profileRoutes = require("./routes/Profile")
const paymentRoutes = require("./routes/Payment")
const courseRoutes = require("./routes/Course")
const contactUsRoute = require("./routes/contactUs")

const database = require("./config/database")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const { cloudinaryConnect } = require("./config/cloudinary")
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv")

dotenv.config()
const PORT = process.env.PORT

//database.connect
database.connect()

//middlewares
server.use(express.json())
server.use(cookieParser())
server.use(
  cors({
    origin: "*", // Allows all origins in production
    credentials: true
  })
);

server.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp"
  })
)

//cloudinary connect
cloudinaryConnect()

// routes
server.use("/api/v1", userRoutes)
server.use("/api/v1", profileRoutes)
server.use("/api/v1", paymentRoutes)
server.use("/api/v1", cartRoute)
server.use("/api/v1", courseRoutes)
server.use("/api/v1", contactUsRoute)

//stich to routes
// require("./routes/User")(server)
// require("./routes/Cart")(server)
// require("./routes/Course")(server)
// require("./routes/Profile")(server)
// require("./routes/Payment")(server)
// require("./routes/contactUs")(server)

//default route
server.use("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running"
  })
})

// Export your Express app for Vercel
module.exports = server;

// Make server listen conditionally (only in development)
if (process.env.NODE_ENV !== 'production') {
  server.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
}
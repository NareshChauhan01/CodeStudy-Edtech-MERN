const express = require("express")
const app = express()

const cartRoute = require("./routes/Cart")
const userRoutes = require("./routes/User")
const profileRoutes = require("./routes/Profile")
const paymentRoutes = require("./routes/Payments")
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
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    // origin: "*", // Allows all origins in production
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp"
  })
)

//cloudinary connect
cloudinaryConnect()

// routes
app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/profile", profileRoutes)
app.use("/api/v1/payment", paymentRoutes)
app.use("/api/v1/cart", cartRoute)
app.use("/api/v1/course", courseRoutes)
app.use("/api/v1/contact", contactUsRoute)

//stich to routes
// require("./routes/User")(server)
// require("./routes/Cart")(server)
// require("./routes/Course")(server)
// require("./routes/Profile")(server)
// require("./routes/Payment")(server)
// require("./routes/contactUs")(server)

//default route
app.use("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running..."
  })
})

app.listen(PORT, () => {
  console.log(`App is running ${PORT}`)
})

// Export your Express app for Vercel
// module.exports = app;

// Make server listen conditionally (only in development)
// if (process.env.NODE_ENV !== 'production') {
//   app.listen(PORT, () => {
//     console.log(`Server is running at ${PORT}`);
//   });
// }
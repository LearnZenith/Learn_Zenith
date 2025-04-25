// Importing necessary modules and packages
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables early

// Import routes
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");

// Database and Cloudinary
const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

// Middleware
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// Set up port
const PORT = process.env.PORT ;

// Connect to PostgreSQL (Supabase)
database.connect();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors({
	origin: "*", // Allow all origins
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true,
  }));
  
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

// Connect to Cloudinary
cloudinaryConnect();

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Default route
app.get("/", (req, res) => {
	res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

// Start the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});

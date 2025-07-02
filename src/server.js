const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const readingRoutes = require("./routes/reading.routes");
const userRoutes = require("./routes/user.routes");
const contactRoutes = require("./routes/contact.routes");
const borewell = require("./routes/borewellCustomer.routes");
const sensorRoutes = require("./routes/sensor.routes");
const plansRoutes = require("./routes/plans.routers");
const sensorReadingRoutes = require("./routes/sensorReading.routes");

const errorHandler = require("./middleware/error.middleware");

const app = express();

// Configure helmet to allow images
// app.use(
//   helmet({
//     crossOriginResourcePolicy: { policy: "cross-origin" },
//   })
// );
const whitelist = [
  "https://admin.bluetracktechnologies.com",
  "https://www.bluetracktechnologies.com",
  "http://localhost:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use("/images", express.static(path.join(__dirname, "../public/images")));

// Add a test route to verify static file serving
app.get("/test-image", (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Test Image</h1>
        <img src="/images/digital-water-level-recorder/image1.jpg" alt="Test Image" />
      </body>
    </html>
  `);
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/readings", readingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/borewell", borewell);
app.use("/api/sensors", sensorRoutes);
app.use("/api/plans", plansRoutes);
app.use("/api/sensor-readings", sensorReadingRoutes);

app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("✅ Backend is up and running!");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test image URL: http://localhost:${PORT}/test-image`);
});

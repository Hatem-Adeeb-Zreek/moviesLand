const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const path = require("path"); // heroku

const mongoose = require("mongoose");
const connect = mongoose
    .connect(process.env.MONGO_URI || config.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", require("./routes/users"));
app.use("/api/comment", require("./routes/comment"));
app.use("/api/like", require("./routes/like"));
app.use("/api/favorite", require("./routes/favorite"));

app.use("/uploads", express.static("uploads"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    // index.html for all page routes
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Running at ${port}`);
});

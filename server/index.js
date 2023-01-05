const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = 3000;

const bookRouter = require("./routes/book");
const catRouter = require("./routes/cat");

mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PW}@cluster0.jami5ge.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/book", bookRouter);
app.use("/cat", catRouter);
app.listen(PORT, () => console.log(`App is running on ${PORT}`));
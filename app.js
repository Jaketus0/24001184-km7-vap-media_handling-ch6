if (process.env.NODE_ENV !== 'production'){
    require ('dotenv').config();
}

const express = require('express');
const app = express();
const port = process.env.port || 3000;
const routes = require("./routes");

app.use(express.json());

app.use (express.urlencoded({ extended: true }));

app.use("/", routes)

app.get("/", (req, res) => {
    res.send("routes")
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
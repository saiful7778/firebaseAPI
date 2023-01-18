const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    res.json({
        speech: "there from api!"
    })
});

app.listen(port, () => {
    console.log(`Port is running os http://localhost:${port}`);
})
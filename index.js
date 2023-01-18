const express = require("express");
const cors = require("cors");
const dfff = require("dialogflow-fulfillment");
const request = require("request");
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        speech: "there from api!"
    })
});
app.post("/", (req, res) => {
    const agent = new dfff.WebhookClient({
        request: req,
        response: res
    });
    let getData = req.body.queryResult.parameters;
    if (getData.hemu == "0" || getData.temp == "0") {
        console.log("has");
    } else {
        for (let x in getData) {
            if (getData[x] !== "") {
                let patchData = {
                    [x]: +getData[x]
                }
                fetch("https://dtrhomeautomation-default-rtdb.asia-southeast1.firebasedatabase.app/allRelay.json", {
                    method: 'PATCH',
                    body: patchData,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then((response) => response.json())
                    .then((json) => console.log(json)).catch((error) => {console.log(error);})
            }
        }
    }
    function demo(agent) {
        agent.add("ok sir.")
    }
    let intentMap = new Map();
    intentMap.set("esp32iot", demo);
    agent.handleRequest(intentMap);

})

app.listen(port, () => {
    console.log(`Port is running os http://localhost:${port}`);
})
const express = require("express");
const cors = require("cors");
const dfff = require("dialogflow-fulfillment");
const request = require("request");
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());

const relayUrl = 'https://dtrhomeautomation-default-rtdb.asia-southeast1.firebasedatabase.app/allRelay.json';
const tempUrl = 'https://dtrhomeautomation-default-rtdb.asia-southeast1.firebasedatabase.app/env/temp.json';
const hemuUrl = 'https://dtrhomeautomation-default-rtdb.asia-southeast1.firebasedatabase.app/env/hemu.json';

app.get('/', (req, res) => {
    res.json({
        speech: "This is api!"
    })
});

function serverPatch(mainUrl, mainData){
    request.patch({ url: mainUrl, body: JSON.stringify(mainData) }, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            console.log("Body: "+body);
            console.log(res.statusCode);
        }
    })
}

app.post("/", (req, res) => {
    const agent = new dfff.WebhookClient({
        request: req,
        response: res
    });
    function demo(agent) {
        agent.add('ok sir');
    }
    let getData = req.body.queryResult.parameters;
    if (getData.hemu == "0" || getData.temp == "0") {

    } else {
        for (let x in getData) {
            if (getData[x] !== "") {
                let patchData = {
                    [x]: +getData[x]
                }
                serverPatch(relayUrl, patchData);
            }
        }
    }
    let intentMap = new Map();
    intentMap.set("esp32iot", demo);
    agent.handleRequest(intentMap);
})

app.listen(port, () => {
    console.log(`Port is running os http://localhost:${port}`);
})
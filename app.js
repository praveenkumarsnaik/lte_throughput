const express = require('express');
const app = express();

const getData = require("./code");
const port = 8000;
app.set('view engine', 'ejs');
app.use(express.static('./'))

app.get('/', async (req, res) => {
    try {
        let data = await getData();
        
        res.render('index.ejs', { data: JSON.stringify(data.throughput) ,
            data2:JSON.stringify(data.finalAvg),
            withoutMimoAvg :data.wotavg,
            withMimoAvg:data.wtavg });
        res.send();
    } catch (e) {
        res.send("error");
    }
})


app.listen(port, () => {
    console.log("listening on the port " + port)
})
const express = require('express');
const app = express();


const port = 8001;
app.set('view engine', 'ejs');

app.use(express.static('./assets'))

app.get('/', async (req, res) => {
    try {
       
        
        res.render('main_design.ejs', {});
        res.send();
    } catch (e) {
        res.send("error");
    }
})


app.listen(port, () => {
    console.log("listening on the port " + port)
})
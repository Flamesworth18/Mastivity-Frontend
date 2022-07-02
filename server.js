let express = require('express');

let app = express();

app.use(express.static(__dirname+'/dist/productivity-app'));

app.get('/*', (req, resp) => {
    resp.sendFile(__dirname+'/dist/productivity-app/index.html');
})

app.listen(process.env.PORT || 8080);
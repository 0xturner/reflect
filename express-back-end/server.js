const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;
const request = require('request');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config()
const natural = require('./natural');



const ENV = process.env.ENV || "development";
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(Express.json());
App.use(cors());

// Sample GET route
App.get('/api/daily_summary', (req, res) =>
    request.get("https://www.rescuetime.com/anapi/daily_summary_feed?key=B63YHZRaIA5BoSVfNUxwB5r1iOZm7uPcPVICwOrD", {},
        (error, response) => {
            res.send(response.body);
            // console.log(response);
        }));

App.post('/api/new-reflection', (req, res) => {
    console.log(req.body.data);
    console.log(natural.getSentimentRank(req.body.data.emoji_rank, req.body.data.answer_1, req.body.data.answer_2, req.body.data.answer_3))
    res.end("Success");
});

App.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
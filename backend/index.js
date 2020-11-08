const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express()
const port = 8080

// BOT CONFIG
// replace the value below with the Telegram token you receive from @BotFather
const token = '1296854473:AAGBIEYQqIprTH8ng03HQjELbOb7RgNC6xk';
const chat_id = '-1001323202888'; // replace with your chat_id

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// controller
app.post('/form', async (req, res) => {
    try {
        // Formating text
        const formData = req.body
        const text =  Object.keys(formData).reduce((fullText, key) => {
            return fullText + `*${key.split('_').join(' ')}*: ${formData[key]}\n`
        }, '')
        /////////////////
        console.log(text)
        await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(text)}&parse_mode=Markdown`)
        res.status(200).send() // on success
    } catch (err) {
        console.log(err)
        res.status(404).send(err) // on error
    }
})
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ShortUrl = require("./models/url");

const app = express();

//Middleware

app.set('view engine','ejs');
app.use(express.static('public'));
app.use( express.static(path.join(__dirname , 'public' )));
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect('mongodb://127.0.0.1:27017/url_shortener' , {
    useNewUrlParser : true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error : '+err))
 


app.get('/', async (req, res) => {
  const shortUrls =  await ShortUrl.find()
  res.render("home" , { shortUrls: shortUrls })
})

app.post('/shortUrls', async (req,res) => {
  await ShortUrl.create({URL : req.body.URL})
  
  res.redirect('/')
})

app.get('/:shortUrl', async(req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.URL)
})

app.listen(8001 , () => console.log('Server running at PORT: 8001'))

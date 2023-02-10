const express = require('express');
const app = express();

const router = express.Router();

const postedInput = [];

const news = {
	Title:"news1",
	postContent:"this is the News here vEpsilon (/ˈɛpsɪlɒn/,[1] UK also /ɛpˈsaɪlən/;[2] uppercase Ε,\
	 lowercase ε or lunate ϵ; Greek: έψιλον) is the fifth letter of the Greek alphabet, corresponding and",
}

const article = {
	Title:"article1",
	postContent:"this is the Article here , vEpsilon (/ˈɛpsɪlɒn/,[1] UK also /ɛpˈsaɪlən/;[2] uppercase Ε, lowercase ε or lunate ϵ; Greek: έψιλον)\
	 is the fifth letter of the Greek alphabet, corresponding and",
}

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static('web'))

const cors= require('cors');
app.use(cors());

const port = 3000;

const lsiten = () => {
	console.log(port);
}

const sendNews = (req,res) =>{
	res.send(news);
}

app.get("/news",sendNews);

const publishArticle = (req,res) =>{
	res.send(article);
}

app.get("/articles",publishArticle);


// recieve posted data and pushes it into array
const postInput = (req,res)=>{
	
	postedInput.push(req.body);

}

app.post("/input",postInput);

// send post recieved by clients

const postreview = (req,res) =>{

		res.send(postedInput);
}

app.get("/posts",postreview);

// listen to port
app.listen(port, lsiten);

// new link


const sendtogrammy = (req,res)=>{
	res.sendFile("web/new.html",{root:'.'});
}
app.get("/grammy",sendtogrammy);

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();


app.set('view engine','hbs');

app.use((req, res, next) => {
 let now = new Date().toString();
	const log = `${now}:${req.method}${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err){
			console.log('Unable to append to server.log.');
		}
	})
	next();
});


// app.use((req, res, next) => {
// 	res.render('maintenance.hbs',{
// 		pageTitle: 'Maintenance Page',
// 		content: 'Site is down for maintenance'		
// 	});
// });
//

app.use(express.static(__dirname+'/public'));
hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear',() => {
	return new Date().getFullYear()
	});
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

app.get('/style.css',(req, res) => {
	res.send('style.css');
	res.end();
})

app.get('/',(req,res) => {
	res.render('home.hbs',{
		pageTitle: 'Home Page',
		content: 'Welcome to the home page',	
		currentYear: new Date().getFullYear()
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs',{
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/projects',(req, res) => {
	res.render('projects.hbs',{
		pageTitle: 'Projects Page',
		currentYear: new Date().getFullYear()
		
	})
})



//error 
app.get('/error', (req,res) => {
	res.send({
		status: 'working',
		errorMessage: 'Unable to complete the request',
	});
});

app.listen(port,() => {
	console.log(`server is up on port ${port}`);
});

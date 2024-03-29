
const express = require("express");
const path = require('path');
const fileUpload = require('express-fileupload');
const app = express();	
const mongoose = require('mongoose');
const fs = require("fs");
const cors = require('cors');

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : path.join(__dirname,'tmp'),
}));

app.use(cors());

app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,'/index.html'));
});
app.get('/json', (req,res)=>{
	res.sendFile(path.join(__dirname, '/json/uploaded.json'));
})
app.post('/json', (req,res) =>  {

	let sampleFile;
	let uploadPath;
	
	if(!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No Files were uploaded.')
	}
	
	sampleFile = req.files.sampleFile;
	console.log(sampleFile.name);
	uploadPath = __dirname + '/json/' + sampleFile.name;


	sampleFile.mv(uploadPath, (err) => {
		if (err)
			return res.status(500).send(err);	
	});

	fs.rename('./json/' + sampleFile.name, './json/uploaded.json', ()=>{})
	res.sendFile(path.join(__dirname,"/index.html"));	
});

app.listen(3000, () => {})
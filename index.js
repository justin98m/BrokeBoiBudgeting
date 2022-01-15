//working of preventing submission of negative dollar amount
//On Add something Page
const dotenv = require('dotenv')
dotenv.config()
//Routing system
const alert = require('alert')
const express = require('express')
//middle ware man
const nunjucks = require('nunjucks')
const app = express()
//reads in post data
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
//tell express where static files are
app.use(express.static(__dirname + '/public'))
const port = 8080
const date = require('./scripts/convertDate.js')
const value = require('./scripts/validate.js')
const start = require('./scripts/connect.js')
const consolidate = require('./scripts/consolidateFundIds')
const request = require('./scripts/getFunds.js')
const upload = require('./scripts/uploadData.js')
//turn req.body form data into readable and extractable information
//tell nunjucks where to find njk/html files
nunjucks.configure('./public/views', {
	autoescape: true,
	express: app
})
app.get('/errorPage',(req,res) =>{
	/*how does one check ifundf the get exist or not?
	if(typeof req.query.error !== undefined)
		var err = req.query.console.error
	else
		err = "Why did you come Here?"
		*/
	res.render('error.html',data ={
		layout:'layout.html',
		cssDesktop: 'error.css',
		cssMobile: 'error.css'
	})
})

app.get('/',(req,res) => {

		let query = "select fundName, fundId from FUND "

		start.runsql.query(query,(err,result)=>{
			if(err){
				console.error("error: ", err)
				res.redirect('/errorPage')
			}
			else
				{
					res.render('home.html',	data = {
						layout:'layout.html',
						cssDesktop: 'homeDesktop.css',
						cssMobile: 'homeMobile.css',
						fund : result

					})
				}

		})

})

app.get('/expense',(req,res) =>{
	let query = "select * from EXPENSE"
	start.runsql.query(query,(err,result)=>{
		if(err){
			console.log("error",err)
			res.redirect('/errorPage')
			}
		else {
			expenseinformation = result
			fundIds = consolidate.FundIds(result)
			//will return all funds associate with an expens and their fundid
			query = "select fundName,fundId from FUND where fundid="+fundIds[0];
			for (var i = 1; i < fundIds.length; i++) {
				query += " or fundid=" + fundIds[i]
			}
			start.runsql.query(query,(err,result)=>{
				if(err){
					console.error("error",err);
					res.redirect('/errorPage')
				}
				else {
					console.log(result);
					fundkey = result
					res.render('expense.html',data = {
						layout: 'layout.html',
						cssDesktop: 'expenseDesktop.css',
						cssMobile: 'expenseMobile.css',
						fund: fundkey,
						expense: expenseinformation,
						title: 'Here Are Your Expenses',

					})

				}
			})
		}
	})
})
app.get('/income',(req,res) => {
	res.render('income.html',data ={
		layout: 'layout.html',
		cssDesktop: 'incomeDesktop.css',
		cssMobile: 'expenseMobile.css',
		title: 'Your Income Statements'
	})
})

app.get('/fund',(req,res) => {
	//get all fund data and send data to be associated with HTML elements
	let query = "select * from FUND"
	start.runsql.query(query,(err,result)=>{
		if(err){
			console.error("error: ", result)
			res.redirect('/errorPage')
		}
		else{
			console.log(result)
			res.render('fund.html',data = {
				layout: 'layout.html',
				cssDesktop: 'fundDesktop.css',
				cssMobile:'fundMobile.css',
				title: 'Funds',
				fund: result
			})
		}
	})

})
//ugly function that reads in all the data needed associate with a fund from sql
app.get('/viewFund',(req,res)=>{

	let fundId = req.query.id
	let query = "select expenseName, expenseCost, expenseDate"
	query += " from EXPENSE where fundId = " + fundId

			start.runsql.query(query,(err,expenseResult)=>{
				if(err){
					console.error("error: ", expenseResult)
					res.redirect('/errorPage')
				}
				else{
					console.log("expense query: ", expenseResult)
					//ask server for fund information again to avoid passing info through get request
					query = "select fundName, capitol from FUND where fundId =" + fundId

					start.runsql.query(query,(err,fundResult)=>{
						if(err)
							console.error("error: ", fundResult)
						else{
							console.log("fund query: ",fundResult)
							res.render('viewFund.html', data ={
								layout: 'layout.html',
								expense: expenseResult,
								fund: fundResult,
								cssDesktop: 'viewFundDesktop.css',
								cssMobile:  'viewFundMobile.css'
								})
							}
						})
					}
				})
})
app.get('/addIncome',(req,res)=>{
	let error = req.query.badValue
	let message = false
	switch (error) {
		case 'dollar':
			message = "I repeat, YOU CANT ENTER THAT AS A DOLLAR AMOUNT"
			break;
		case 'name':
			message = "Thats not a valid Name"
			break;
	}
	request.getFunds(start,(result)=>{
		if(result){
			res.render('addIncome.html',data ={
				layout: 'layout.html',
				cssDesktop: 'addIncomeDesktop.css',
				cssMobile: 'addIncomeMobile.css',
				fund: result,
				title: 'Create A New Income Statement'
			})
			if(message){alert(message)}
		}
		else{res.redirect('/errorPage')}
	})
})

app.get('/addSomething',(req,res) =>{
	let error = req.query.badValue
	let message = false
	switch (error) {
		case 'dollar':
			message = "I repeat, YOU CANT ENTER THAT AS A DOLLAR AMOUNT"
			break;
		case 'name':
			message = "Thats not a valid Name"
			break;
	}

//requesting Funds
//render must be put in callback or the page will load before sql returns the data
let query = "select fundName, fundId from FUND "
start.runsql.query(query,(err,result)=>{
	if(err){
		console.error("error: ", result)
		res.redirect('/errorPage')
	}
	else{
		//console.log(result)

			res.render('addSomething.html',data = {
			layout: 'layout.html',
			cssDesktop: 'addSomethingDesktop.css',
			cssMobile: 'addSomethingMobile.css',
			fund: result,

			})
			if(message){ alert(message)}

		}
	})
})

app.post('/addFund',(req,res)=>{
	//fund sets date automatically since user does not need to signify a creation date
	today = new Date()
	today = [today.getMonth()+1,today.getDate(),today.getFullYear()]
	today = today.toString().replace(/,/g,'')

	let input = {
			fundName : req.body.fundName,
			capitol: req.body.capitol,
			date: today
	}
	let query = "insert into FUND (fundName,capitol,creationDate) values"+
	"('"+input.fundName+"',"+input.capitol+",'"+input.date+"') "

		start.runsql.query(query,(err,result)=>{
			if(err){
				console.error("error: ", result)
				res.redirect('/errorPage')
			}
			else
				res.redirect('addSomething')
			})

})

app.post('/addExpense',(req,res)=>{
	let input = {
		expenseName: req.body.expenseName,
		expenseCost: req.body.cost,
		date : date.convert(req.body.date),
		//the fundname is tranlated to an Id so the server can find the name elsewhere
		fundId : req.body.fundName
	}
	console.log("Date: ",input.date);
	date.convert(input.date)

	if(!value.validate('dollar',input.expenseCost)){
		res.redirect('/addSomething?badValue=dollar')
		return false;
	}
	else if(!value.validate('name',input.expenseName)){
		res.redirect('/addSomething?badValue=name')
		return false
	}
	let query = "insert into EXPENSE (expenseName,expenseCost,expenseDate,fundId)"
	query += " VALUES('"+input.expenseName+"',"+input.expenseCost+",'"+input.date+"'"
	query += ","+input.fundId+")"
	//console.log(query)

	start.runsql.query(query,(err,result)=>{
		if(err){
			console.error("\n\n\nerror: ", result,'\n\n\n')
			res.redirect('/errorPage')
		}
		else{
			console.log("\n\n\nNOT AN ERROR\n\n\n");
			console.log(result)
			res.redirect('/addSomething')
		}

	})
})
app.post('/addIncome',(req,res)=>{
	income ={
		name: req.body.incomeName,
		date: date.convert(req.body.date),
		capitol : req.body.incomeAmount
	}
	fund = req.body.fund
	//income =
	upload.income(income,fund)
	res.redirect('/')
})


app.listen(port,() => {
})

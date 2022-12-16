//Third Party Modules
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
const sessions = require('express-session')
const cookieParser = require('cookie-parser')
app.use(cookieParser())
//tell express where static files are
app.use(express.static(__dirname + '/public'))
const port = 8080
const date = require('./scripts/convertDate.js')
const value = require('./scripts/validate.js')
const start = require('./scripts/connect.js')
const consolidate = require('./scripts/consolidateFundIds')
const upload = require('./scripts/uploadData.js')
const retrieve = require('./scripts/retrieveData.js')
const remove = require('./scripts/deleteData.js')
var session = false
//turn req.body form data into readable and extractable information
//tell nunjucks where to find njk/html files
nunjucks.configure('./public/views', {
	autoescape: true,
	express: app
})
const oneDay = 1000 * 60 * 60 * 24
app.use(sessions({
	secret: process.env.SECRET,
	saveUninitialized:true,
	cookie: {maxAge: oneDay},
	resave: false
}))
app.get('/login',(req,res)=>{
	res.render('login.html',data={
		cssDesktop: 'loginDesktop.css',
		cssMobile: 'loginMobile.css'
	})
})
//default page for all sql errors
app.get('/errorPage',(req,res) =>{
	res.render('error.html',data ={
		layout:'layout.html',
		cssDesktop: 'error.css',
		cssMobile: 'error.css'
	})
})
app.get('/',(req,res) => {
	/*session = req.session
	if(!session.userid)
		return res.redirect('/login')*/
	var totalCapitol = 0
	if(req.query.success == 'true')
		var expenseAdded = true
	else{
		var expenseAdded = false
	}
	retrieve.funds((err,funds)=>{
		if(err)
			console.log(err);
		for(i=0;i<funds.length;i++){
			totalCapitol += funds[i].capitol
		}
		retrieve.fundSelectBar((err,funds)=>{
			if(err)
				return res.redirect('/errorPage')
			res.render('home.html',	data = {
				layout:'layout.html',
				cssDesktop: 'homeDesktop.css',
				cssMobile: 'homeMobile.css',
				fund : funds,
				message : expenseAdded,
				Capitol: totalCapitol
			})
		})
	})
})
app.get('/expense',(req,res) =>{
	/*session = req.session
	if(!session.userid)
		return res.redirect('/login')*/
	retrieve.expenses((err,expenses)=>{
		if(err)
			return res.redirect('/errorPage')
		res.render('expense.html',data = {
			layout: 'layout.html',
			cssDesktop: 'expenseDesktop.css',
			cssMobile: 'expenseMobile.css',
			fund: expenses.fundKey,
			expense: expenses.category,
			title: 'Here Are Your Expenses',
		})
	})
})
app.get('/income',(req,res) => {
	/*session = req.session;
	if(!session.userid)
		return res.redirect('/login');*/
	retrieve.income().then((result) =>{
		if(result.err){
			return res.redirect('/errorPage');
		}
		res.render('income.html',data ={
			layout: 'layout.html',
			cssDesktop: 'incomeDesktop.css',
			cssMobile: 'incomeMobile.css',
			income: result.income
		})
	});

})
app.get('/viewIncome',(req,res) =>{
	/*session = req.session
	if(!session.userid)
		return res.redirect('/login')*/
	let incomeId = req.query.id
	retrieve.thisIncome(incomeId,(err,income)=>{
		if(err)
			res.redirect('/errorPage')
		res.render('viewIncome.html',data={
			layout:'layout.html',
			cssDesktop: 'viewIncomeDesktop.css',
			cssMobile: 'viewIncomeMobile.css',
			fundIncome : income.category[0],
			income: income.category[1][0],
			fund : income.fundKey
		})
	})
})
app.get('/fund',(req,res) => {
	/*session = req.session
	if(!session.userid)
		return res.redirect('/login')*/
	if(req.query.success == "true")
		var fundAdded = true
	else {
		var fundAdded = false
	}
	retrieve.funds((err,funds)=>{
		if(err)
			return res.redirect('/errorPage')
		res.render('fund.html',data = {
			layout: 'layout.html',
			cssDesktop: 'fundDesktop.css',
			cssMobile:'fundMobile.css',
			title: 'Funds',
			fund: funds,
			message : fundAdded
		})
	})
})
app.get('/viewFund',(req,res)=>{
	/*session = req.session
	if(!session.userid)
		return res.redirect('/login')*/
	let fundId = req.query.id
	retrieve.fundIncomes(fundId,(err,income)=>{
		if(err)
			return res.redirect('/errorPage')
		retrieve.thisFund(fundId,income,(err,fund)=>{
			if(err)
				return res.redirect('/errorPage')
			//income holds incomeid and capitol for this fund
			//fund.income holds the date and name
			//for loop will sync the data into one Dictionary
			for (var i = 0; i < income.length; i++) {
				for (var c = 0; c < fund.income.length; c++) {
					if(fund.income[c].incomeId == income[i].incomeId){
						income[i].incomeName = fund.income[c].incomeName
						income[i].incomeDate = fund.income[c].incomeDate
						break;
					}
				}
			}
			res.render('viewFund.html', data ={
			layout: 'layout.html',
			expense: fund.expense,
			income: income,
			fund: fund.details[0],
			cssDesktop: 'viewFundDesktop.css',
			cssMobile:  'viewFundMobile.css'
			})
		})
	})
})
app.get('/addIncome',(req,res)=>{
	/*session = req.session
	if(!session.userid)
		return res.redirect('/login')*/
	retrieve.fundSelectBar((err,result)=>{
		if(err)
			return res.redirect('/errorPage')
		res.render('addIncome.html',data ={
			layout: 'layout.html',
			cssDesktop: 'addIncomeDesktop.css',
			cssMobile: 'addIncomeMobile.css',
			fund: result,
			title: 'Create A New Income Statement'
		})
	})
})
//I only want the content accessible to me hence the MASTERPASS
app.post('/login',(req,res)=>{
	/*var pass = req.body.pass
	if (pass == process.env.MASTERPASS){
		session = req.session
		session.userid = process.env.USERID
		res.redirect('/')
	}
	else{
		console.log(pass );
		console.log(session);

		res.redirect('/login')
	}*/
	res.redirect('/')
})
app.post('/addFund',(req,res)=>{
	//fund sets date automatically since user does not need to signify a creation date
	today = new Date()
	today = [today.getMonth()+1,today.getDate(),today.getFullYear()]
	today = today.toString().replace(/,/g,'')

	let input = {
			fundName : req.body.fundName,
			date: today
	}
	upload.fund(input,(err,success)=>{
		if(err)
			return res.redirect('/errorPage')
		res.redirect('/fund?success=true')
	})
})
app.post('/addExpense',(req,res)=>{
	let input = {
		expenseName: req.body.expenseName,
		expenseCost: req.body.cost,
		date : date.convert(req.body.date),
		//the name is the ID as the server can ask the db for the name of a fundId
		fundId : req.body.fundName
	}
	date.convert(input.date)
	upload.expense(input,(err,success)=>{
		if(err)
			return res.redirect('/errorPage')
		upload.adjustFundCapitol(input.fundId,-1*input.expenseCost,(err)=>{
			if(err)
				return res.redirect('/errorPage')
			res.redirect('/?success=true')
		})
	})
})
app.post('/addIncome',(req,res)=>{
	income ={
		name: req.body.incomeName,
		date: date.convert(req.body.date),
		capitol : req.body.incomeAmount
	}
	fund = req.body.fund
	upload.income(income,fund,(err,success)=>{
		if(err)
			return res.redirect('/errorPage')
		for (var i = 0; i < fund.length; i++) {
			upload.adjustFundCapitol(fund[i].id,fund[i].capitol,(err)=>{
				if(err){
					return res.redirect('/errorPage')
				}
			})
		}
		res.redirect('/viewIncome?id='+success.incomeId)
	})
})
app.get('/deleteFund',(req,res)=>{
	/*session = req.session
	if(!session.userid)
		return res.redirect('/login')*/
	var fundId = req.query.id
	remove.funds(fundId,(err)=>{
		if(err)
			return res.redirect('/errorPage')
		return res.redirect('/fund')
	})
})
app.get('/deleteExpense',(req,res)=>{
	/*session = req.session
	if(!session.userid)
		return res.redirect('/login')*/
	var expenseId = req.query.id
	var expenseAmount = req.query.amount
	retrieve.thisExpense(expenseId,(err,fund)=>{
		if(err)
			res.redirect('/errorPage')
		upload.adjustFundCapitol(fund[0].fundId,expenseAmount,(err)=>{
			if(err)
				return res.redirect('/errorPage')

			remove.expense(expenseId,(err)=>{
				if(err)
					return res.redirect('/errorPage')
				res.redirect('/expense')
			})
		})
	})
})
app.get('/deleteIncome',(req,res)=>{
/*	session = req.session
	if(!session.userid)
		return res.redirect('/login')*/
	var incomeId = req.query.id
	remove.income(incomeId,(err)=>{
		if(err)
			res.redirect('/errorPage')
		res.redirect('/income')
	})

})
app.get('/logout',(req,res)=>{
	req.session.destroy();
	res.redirect('/login')
})
app.listen(port,() => {
})

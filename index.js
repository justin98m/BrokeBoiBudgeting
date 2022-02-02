//Third Party Modules
const dotenv = require('dotenv')
dotenv.config()
const alert = require('alert')
const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
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
//turn req.body form data into readable and extractable information
//tell nunjucks where to find njk/html files
nunjucks.configure('./public/views', {
	autoescape: true,
	express: app
})
app.get('/errorPage',(req,res) =>{
	res.render('error.html',data ={
		layout:'layout.html',
		cssDesktop: 'error.css',
		cssMobile: 'error.css'
	})
})

app.get('/',(req,res) => {
	var totalCapitol = 0
	if(req.query.success == 'true')
		var expenseAdded = true
	else{var expenseAdded = false}
	retrieve.funds((funds)=>{
		if(!funds){
			res.redirect('/errorPage')
		}
		else{
			for(i=0;i<funds.length;i++){
				totalCapitol += funds[i].capitol
			}
			retrieve.fundSelectBar((funds)=>{
				if(!funds){
					res.redirect('/errorPage')
				}
				else{
					res.render('home.html',	data = {
						layout:'layout.html',
						cssDesktop: 'homeDesktop.css',
						cssMobile: 'homeMobile.css',
						fund : funds,
						message : expenseAdded,
						Capitol: totalCapitol
					})
				}
			})
		}
	})
})
app.get('/expense',(req,res) =>{
	retrieve.expenses((expenses)=>{
		if(!expenses){
			res.redirect('/errorPage')
		}
		else{
			res.render('expense.html',data = {
				layout: 'layout.html',
				cssDesktop: 'expenseDesktop.css',
				cssMobile: 'expenseMobile.css',
				fund: expenses.fundKey,
				expense: expenses.category,
				title: 'Here Are Your Expenses',
			})
		}
	})
})
app.get('/income',(req,res) => {
	retrieve.income((income)=>{
		res.render('income.html',data ={
			layout: 'layout.html',
			cssDesktop: 'incomeDesktop.css',
			cssMobile: 'expenseMobile.css',
			title: 'Your Income Statements',
			income: income
		})
	})
})
app.get('/viewIncome',(req,res) =>{
	let incomeId = req.query.id
	retrieve.thisIncome(incomeId,(income)=>{
		if(!income){res.redirect('/errorPage')}
		else{
			console.log(income.category[1]);
			res.render('viewIncome.html',data={
				layout:'layout.html',
				cssDesktop: 'viewIncomeDesktop.css',
				cssMobile: 'viewIncomeMobile.css',
				fundIncome : income.category[0],
				income: income.category[1][0],
				fund : income.fundKey
			})
		}
	})
})

app.get('/fund',(req,res) => {
	if(req.query.success == "true")
		var fundAdded = true
	else {
		var fundAdded = false
	}
	retrieve.funds((funds)=>{
		if(!funds){
			res.redirect('/errorPage')
		}
		else{
			res.render('fund.html',data = {
				layout: 'layout.html',
				cssDesktop: 'fundDesktop.css',
				cssMobile:'fundMobile.css',
				title: 'Funds',
				fund: funds,
				message : fundAdded
			})
		}
	})
})
//ugly function that reads in all the data needed associate with a fund from sql
app.get('/viewFund',(req,res)=>{

	let fundId = req.query.id
	retrieve.fundIncomes(fundId,(income)=>{
		if(!income){
			res.redirect('/errorPage')
		}
		else{
			retrieve.thisFund(fundId,income,(fund)=>{
				console.log(fund.details[0]);
				res.render('viewFund.html', data ={
				layout: 'layout.html',
				expense: fund.expense,
				income: fund.income,
				fund: fund.details[0],
				cssDesktop: 'viewFundDesktop.css',
				cssMobile:  'viewFundMobile.css'
				})
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
	retrieve.fundSelectBar((result)=>{
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
app.get('/addFund',(req,res)=>{
	res.render('addFund.html',data = {
		layout: 'layout.html',
		cssDesktop: 'addFundDesktop.css',
		cssMobile: 'addFundMobile.css',
		title: 'Add A Fund Here'
	})
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
	upload.fund(input,(success)=>{
		if(!success){res.redirect('/errorPage')}
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
	console.log("Date: ",input.date);
	date.convert(input.date)

	upload.expense(input,(success)=>{
		if(!success){res.redirect('/errorPage')}
		else{
			upload.adjustFundCapitol(input.fundId,-1*input.expenseCost,(successB)=>{
				if(!successB){
					res.redirect('/errorPage')
				}
				else{
					res.redirect('/?success=true')
				}
			})

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
	upload.income(income,fund,(success)=>{
		if(!success){res.redirect('/errorPage')}
		else {
			for (var i = 0; i < fund.length; i++) {
				upload.adjustFundCapitol(fund[i].id,fund[i].capitol,(success1)=>{
					if(!success1){
						//aka Break
						//yes this is lazy , do i care atm ? no
						i = fund.length
						console.log("Error");
					}
				})
			}
			res.redirect('/viewIncome?id='+success.incomeId)
		}
	})
})
app.get('/deleteFund',(req,res)=>{
	var fundId = req.query.id
	remove.funds(fundId,(success)=>{
		if(!success)
			res.redirect('/errorPage')
		else{
			res.redirect('/fund')
		}
	})
})
app.get('/deleteExpense',(req,res)=>{
	var expenseId = req.query.id
	var expenseAmount = req.query.amount
	retrieve.thisExpense(expenseId,(fund)=>{
		if(!fund){
			res.redirect('/errorPage')
		}
		else{
			upload.adjustFundCapitol(fund[0].fundId,expenseAmount,(success)=>{
				if(!success){
					res.redirect('/errorPage')
				}
				else{
					remove.expense(expenseId,(success1)=>{
						if(!success1){
							res.redirect('/errorPage')
						}
						else{
							res.redirect('/expense')
						}
					})
				}
			})
		}
	})

})
app.get('/deleteIncome',(req,res)=>{
	var incomeId = req.query.id
	remove.income(incomeId,(success)=>{
		if(!success){
			res.redirect('/errorPage')
		}
		else{
			res.redirect('/income')
		}
	})
})


app.listen(port,() => {
})

const express = require ('express')
const stripe = require('stripe') ('sk_test_RqbhC66okqs3Rs8e8BSQObbv00Ss4e8gEa')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')

const app = express()

//Handlebars Middleware
app.engine('handlebars',exphbs({defaultLayout : 'main'}))
app.set('view engine','handlebars')

// Body parser Middleware
app.use(bodyParser.json())

//Returns middleware that only parses urlencoded bodies and only 
//looks at requests where the Content-Type header matches the type option
//The extended option allows to choose between parsing the URL-encoded data with
//the querystring library (when false) or the qs library (when true)
app.use(bodyParser.urlencoded({extended : false}))

// set static folder
app.use(express.static(`${__dirname}/public`))

//index route
app.get('/', (req,res) => {
    res.render('index') 
})

app.get('/config', async (req, res) => {  
    res.send({
        publicKey: process.env.STRIPE_PUBLISHABLE_KEY
    }); 
  })
 

app.post('/create-checkout-session', async (req, res) => {
    const domainURL = 'http://localhost:3000';
  
    // Create new Checkout Session for the order
    // Other optional params include:
    // [billing_address_collection] - to display billing address details on the page
    // [customer] - if you have an existing Stripe Customer ID
    // [customer_email] - lets you prefill the email input in the Checkout page
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
        success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domainURL}/canceled.html`,
        });
  
    res.send({
        sessionId: session.id
    });
  });

const port = process.env.PORT || 3000

app.listen(port , ()=> {
    console.log(`server started on port : ${port}`)
})
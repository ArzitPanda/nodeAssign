const express =require('express')
const nodemailer =require('nodemailer')

require('dotenv').config()


const app = express()



app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static('public'))

const transporter = nodemailer.createTransport({
    host:'smtp.mailgun.org',
    port: 587,
    secure: false,

    auth: {
       user:process.env.MAIL_USERNAME,
       pass:process.env.MAIL_PASSWORD

    }
})









app.get('/',(req, res) => {
    
  transporter.sendMail({
        from: 'postmaster@arzitpanda.me',
        to: 'arzit43.143@gmail.com',
        subject: 'Hello',
        text: 'Hello world',
        html: '<div><h1>Hello world</h1><a href="http://arzitpanda.me">click</a></div>',
       
        

    }, (err, info) => {
        if(err) {
            console.log(err)
        } else {
            console.log(info)
        }
    }
    )
    res.send('Hello check yopur mail')   




}
)



app.use((req,res,next)=>{
        res.render('404',{pageTitle:"arz16"})


})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
}
)


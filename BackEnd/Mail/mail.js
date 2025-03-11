const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"ragulradhakrishnan59@gmail.com",
        pass:"Welcome2TA"
    }
})

const mailOptions = {
    from:"ragulradhakrishnan59@gmail.com",
     
}
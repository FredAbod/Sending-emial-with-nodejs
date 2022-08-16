require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const nodemailer = require('nodemailer');


const app = express();
const server = http.Server(app);
const port = 478

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

app.get("/", function(req, res) {
     res.sendFile(path.join(__dirname, "static/index.html"));
})

app.post("/send_email", (req, res) => {
    const from = req.body.from
    const to = req.body.to
    const subject = req.body.subject
    const message = req.body.message

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email Sent to " + info.accepted)
        }
        res.redirect("/")
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
console.clear();
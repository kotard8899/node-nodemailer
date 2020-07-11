const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const csrfProtection = csrf({ cookie: true });
// var parseForm = bodyParser.urlencoded({ extended: false });

/* GET home page. */
router.get('/', csrfProtection, function(req, res, next) {
    res.render('index', { 
        csrfToken: req.csrfToken(),
        errors: req.flash('errors')
    });
});

router.get('/success', (req, res) => {
    res.render('success')
})

router.post('/post', csrfProtection, [
    body('name').isLength({ min: 2 }).withMessage('姓名必填'),
    body('phone').isLength({ min: 5 }).withMessage('電話必填'),
    body('email').isEmail().withMessage('信箱格式不正確'),
], (req, res) => {
    let transporter = nodemailer.createTransport({
    service: 'Gmail',
        auth: {
            user: process.env.gmailUser,
            pass: process.env.gmailPass,
        },
    });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsMsg = errors.array().map((value) => {
            return `<h4 style="color:tomato;font-size:16px;margin-top:-12px;">${value.msg}</h4>`
        });
        req.flash('errors', errorsMsg);
        res.redirect('/#map')
        return
    }
    let mailOptions = {
        from: '"六角西餐廳"<service@hexschoool.com>',
        to: 'kotard8899@gmail.com',
        subject: `${req.body.name}訂了位`,
        text: `
        電話：${req.body.phone}，
        信箱：${req.body.email}，
        人數：${req.body.number}，
        是否吃素：${req.body.vegan}，
        `,
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            return console.log(err)
        }
        res.redirect('/success');
    });
});

module.exports = router;

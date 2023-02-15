import sgMail from "@sendgrid/mail";
const url = process.env.url
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function accountVerificationMail(req, res) {
    console.log(req.verify_code)
    console.log(req.mail)
    const message = {
        
        to: req.mail,
        from: "parchemos3@gmail.com",
        subject: "Confirm your email address",
        text: "Please click the confirmation link",

        html: `<p>Welcome to nebula, please enter the following link to verify your account  <a href="${url}/verify/${req.verify_code}">Go to nebula!</a></p>`,
      };
    try {
        sgMail.send(message);
    } catch (err) {
        return res.status(err.code).send(err.message);
    }
}

export default accountVerificationMail
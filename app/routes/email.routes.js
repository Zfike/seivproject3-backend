module.exports = (app) => {
    const express = require('express')
    const router = express.Router()
    const emailSender = require('../services/emailSender.js')

    //Generic (can be used to test the email service)
    router.post('/standard', emailSender.sendEmail)

    //Confirmation email
    router.post('/confirm', async (req, res) => {
        try {
            const emailDetails = {
                to: req.body.to,
            }

            const result = await emailSender.confirmationEmail(emailDetails)
            res.status(200).send(result)
        } catch (error) {
            console.error(error)
            res.status(500).send("error sending confirmation email")
        }
    })

    //Accommodation approval email
    router.post('/approve', async (req, res) => {
        try {
            const emailDetails = {
                from: req.body.from,
                to: req.body.to,
            }

            const result = await emailSender.approvalEmail(emailDetails)
            res.status(200).send(result)
        } catch (error) {
            console.error(error)
            res.status(500).send("error sending approval email")
        }
    })

        //Accommodation denial email
        router.post('/deny', async (req, res) => {
            try {
                const emailDetails = {
                    from: req.body.from,
                    to: req.body.to,
                }
    
                const result = await emailSender.denialEmail(emailDetails)
                res.status(200).send(result)
            } catch (error) {
                console.error(error)
                res.status(500).send("error sending denial email")
            }
        })

    app.use("/accommodations-t1/sendEmail", router)
}

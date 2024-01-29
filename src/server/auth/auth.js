const jwt = require('jsonwebtoken')
require('dotenv').config();
const { PUBPIC } = process.env
exports.auth =(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, PUBPIC)
        console.log({ status: 'ok', decoded })
        next()
      }
      catch(err) {
        res.json({ status: 'error',message: err.message })
        console.log({ status: 'error',message: err.message })
      }
}
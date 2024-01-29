const express = require('express');
const router = express.Router();
const { queryMariadb } = require('../DB/data')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const { USERLOGIN, PUBPIC } = process.env
module.exports = router

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({ error: 'ข้อมูลไม่ครบถ้วน' });
    }
    const user = await queryMariadb(USERLOGIN, [email]);
    if (user.length == 0) { return res.json({ message: 'ผู้ใช้งานไม่ถูกต้อง' }) }
    if (password == user[0].password) {
      const token = jwt.sign({ email: user[0].users }, PUBPIC, { expiresIn: '8h' })
      return res.json({ status: 'ok', message: 'เข้าสูระบบสำเร็จ', token })
    }
    else {
      return res.json({ message: 'รหัสผ่านไม่ถูกต้อง' })
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'ไม่สามารถดำเนินการได้' });
  }
});

router.post('/authen', (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, PUBPIC)
    res.json({ status: 'ok', decoded })
  }
  catch(err) {
    res.json({ status: 'error',message: err.message })
  }
})


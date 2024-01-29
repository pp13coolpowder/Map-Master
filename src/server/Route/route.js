const express = require('express');
const router = express.Router();
const { queryMariadb } = require('../DB/data')
const {auth}= require('../auth/auth')
require('dotenv').config();
const { GETCEAS, POSTCEAS,PUTCEAS,DELETECEAS,GETPOLYGON ,GETHOSTAMBON} = process.env
module.exports = router

router.get('/get',async(req, res)=>{
  try {
    const polygon = await queryMariadb(GETPOLYGON)
    polygon.forEach(item => {
      item.coordinates = JSON.parse(item.coordinates);
    })
    res.send(polygon);
  }
  catch (error) { console.log(error), res.send(error) }
})

router.get("/ceas",auth, async (req, res) => {
  try {
    const ceas = await queryMariadb(GETCEAS)
    res.send(ceas);
  }
  catch (error) { console.log(error), res.send(error) }
});

router.post("/ceas",auth, async (req, res) => {
  try {
    const { name, detail, address, color, hn, ar,yakin, yacheed} = req.body
    if (!name || !detail || !address || !color || !hn || !ar) {
      return (
        res.send('Not all fields are filled out'),
        console.log('Not all fields are filled out')
        );
    }
    const values =[name, detail, address, color, hn, ar ,yakin, yacheed]
    queryMariadb(POSTCEAS,values)
    console.log('POST OK');
    res.json('POST OK');
  }
  catch (error) { console.log(error), res.send(error) }
});

router.put("/ceas/:id",auth, async (req, res) => {
  try {
    const id = req.params.id;
    const { name, detail, address, color, hn, ar ,yakin, yacheed} = req.body
    if (!name || !detail || !address || !color || !hn || !ar) {
      return (
        res.send('Not all fields are filled out'),
        console.log('Not all fields are filled out')
        );
    }
    const values =[name, detail, address, color, hn, ar,yakin, yacheed,id]
    queryMariadb(PUTCEAS,values)
    console.log('PUT OK');
    res.json('PUT OK');
  }
  catch (error) { console.log(error), res.send(error) }
});

router.delete("/ceas/:id",auth, async (req, res) => {
  try {
    const id = req.params.id;
    queryMariadb(DELETECEAS,[id])
    console.log('DELETE OK');
    res.json('DELETE OK');
  }
  catch (error) { console.log(error), res.send(error) }
});

router.get("/polygon",auth, async (req, res) => {
  try {
    const polygon = await queryMariadb(GETPOLYGON)
    polygon.forEach(item => {
      item.coordinates = JSON.parse(item.coordinates);
    })
    res.send(polygon);
  }
  catch (error) { console.log(error), res.send(error) }
});

router.get("/hostambon", async (req, res) => {
  try {
    const ceas = await queryMariadb(GETHOSTAMBON)
    res.send(ceas);
  }
  catch (error) { console.log(error), res.send(error) }
});
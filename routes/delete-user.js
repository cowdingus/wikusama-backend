const express = require('express');
const app = express();
const { Biodata } = require('../models');
const { User } = require('../models');

app.delete('/:id',auth,(req,res) => {
    let param = {id: req.params.id}
    let param2 = {user_id: req.params.id}
    User.findByPk(req.params.id)
    .then(result => {
        if(!result) {
            return res.json("user tidak ditemukan")
        }
        User.destroy({where : param})
        .then(() => {
            Biodata.destroy({where : param2})
            .then(() => {
                res.json("Berhasil menghapus akun")
            })
            .catch(error => {
                res.json(error)
            })
        })
        .catch(error => {
            res.json(error)
        })
    })
    .catch(error => {
        res.json(error)
    })
    
    
})

module.exports = app
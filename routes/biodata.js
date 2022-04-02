const express = require('express');
const app = express();

const { Biodata } = require('../models')
const { User } = require('../models')
const { Kota } = require('../models')
const { Provinsi } = require('../models')
const auth = require('../auth')

app.post('/', auth, async (req, res) => {
    let data = {
        nama_lengkap: req.body.nama_lengkap,
        user_id: req.body.user_id,
        angkatan: req.body.angkatan,
        jurusan: req.body.jurusan,
        tahun_lulus: req.body.tahun_lulus,
        kota_asal: req.body.kota_asal,
        provinsi_asal: req.body.provinsi_asal,
        kota_domisili: req.body.kota_domisili,
        provinsi_domisili: req.body.provinsi_domisili
    }
    Biodata.create(data)
        .then(respons => {
            res.json(respons)
        })
})

app.get('/', auth, async (req, res) => {
    Biodata.findAll({
        include: [
            {
                model: User,
                attributes: ['username','email','role','foto_profile']
            },
            {
                model: Kota,
                required: true,
                as: "kotaAsal",
            },
            {
                model: Kota,
                required: true,
                as: "kotaDomisili",
            },
            {
                model: Provinsi,
                required: true,
                as: "provinsiAsal",
            },
            {
                model: Provinsi,
                required: true,
                as: "provinsiDomisili",
            }
        ]
    })
        .then(result => {
            res.json(result)
        })
})

app.get('/:id', auth, async (req, res) => {
    let user_id = req.params.id
    Biodata.findOne({
        where: {
            user_id: user_id
        },
        include: [
            {
                model: User,
            },
            {
                model: Kota,
                required: true,
                as: "kotaAsal",
            },
            {
                model: Kota,
                required: true,
                as: "kotaDomisili",
            },
            {
                model: Provinsi,
                required: true,
                as: "provinsiAsal",
            },
            {
                model: Provinsi,
                required: true,
                as: "provinsiDomisili",
            }
        ]
    })
        .then(result => {
            res.json(result)
        })
})


module.exports = app
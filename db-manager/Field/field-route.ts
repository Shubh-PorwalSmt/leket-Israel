import {Prisma} from "@prisma/client";

const express = require('express');
const {createField} = require('field-controller');
const fieldRouter = express.Router();
fieldRouter.route('/create').post()

module.exports = fieldRouter
fieldRouter
    .route('/create')
    .post(createField);

async function createFieldMiddleWare(req, res) {
    Prisma.validator()({

    })
}




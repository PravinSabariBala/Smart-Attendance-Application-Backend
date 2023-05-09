const express=require('express');
const Router=express.Router();
// const mysql = require('mysql2');
const userlogin = require('../services/userlogin');


Router.post('/login',userlogin)

module.exports=Router
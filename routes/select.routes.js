const Router = require('express');
const router=new Router();
const selectController=require('../controller/select.controller');

router.get('/select',selectController.select);

module.exports=router;
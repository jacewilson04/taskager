const router= require('express').Router();
router.get('/',(req,res)=>{
    res.render('createTask');
});
module.exports=router;
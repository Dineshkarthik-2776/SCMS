const express = require("express");
const router=express.Router();
const employeeController=require("../controllers/employeecontroller");

router.get("/empd",employeeController.view);

router.get("/newemployee",employeeController.newemployee);
router.post("/newemployee",employeeController.save);

router.get("/editemp/:id",employeeController.editemp);
router.post("/editemp/:id",employeeController.edit);

router.get("/deleteemp/:id",employeeController.deleteemp);

router.get("/view/:id",employeeController.viewprofile);

router.get("/department",employeeController.deptdetails);
router.get("/departmentview/:id",employeeController.deptdetails);
router.get("/add-department",employeeController.add_dept);
router.post("/savedept",employeeController.save_add_dept);


router.get("/achievements/:id",employeeController.viewachievements);

router.get("/project",employeeController.pview);
router.get("/assign_emp/:id",employeeController.assign_emp);
router.get("/assigned/:eid/:pid",employeeController.assigned);

module.exports=router;
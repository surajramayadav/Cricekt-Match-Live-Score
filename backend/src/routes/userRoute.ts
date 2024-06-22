
    import express from "express";
    import {
        adduser,
        viewuserById,
        viewuser,
        deleteuser,
        updateuser,
      } from "../controllers/userController";
    
    const router = express.Router();
    

    router.route("/add").post(adduser);
    router.route("/view/:id").get(viewuserById);
    router.route("/view/").get(viewuser);
    router.route("/update/:id").put(updateuser);
    router.route("/delete/:id").delete(deleteuser);
    
    module.exports = router;
    
const router = require('express').Router();
const multerUpload = require("../libs/multer");
const UserControllers = require("../controllers/userController");

router.post("/users/add-user", UserControllers.addUser);

router.post("/users/add-image", multerUpload.single("image"), UserControllers.addImage)

router.get("/users/get-all-images", UserControllers.getAllImages)

router.get("/users/getData/:id", UserControllers.getImagesById)

router.delete("/users/delete/:id", UserControllers.hardDeleteImageById)

router.delete("/users/soft-delete/:id", UserControllers.softDeleteImageById)

router.put("/users/restore/:id", UserControllers.restoreImageById)

// router.patch("/users/update/:id", UserControllers.updateData)

router.patch("/users/updatedata/:id", multerUpload.single("image"), UserControllers.updateImageById)

module.exports = router;
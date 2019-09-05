const cloudinary = require('cloudinary').v2;
const router = require("express").Router();
const fs = require("fs");


router.post("/upload", async(req, res) => {
  try {
    if (!req.files) {
      res.status(400);

      return res.send({ status: "error", error: "no file uploaded" });
    }

    const imageFile = req.files.image;
    const result = await cloudinary.uploader.upload(imageFile.tempFilePath, { tags: "rn-bootcamp-09-2019" });

    fs.unlink(imageFile.tempFilePath, () => {});

    //send response
    res.send({
      status: "success",
      imageUrl: result.url,
    });

  } catch (err) {
    console.log(err, "error");
    res.status(400);
    res.send(err);
  }
});

module.exports = router;

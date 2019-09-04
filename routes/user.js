const router = require("express").Router();

const User = require("../models/user");


router.get("/:id", (req, res) => {
  User.findOne({ _id: req.params.id }, "email createdAt displayName").exec().then(user => {
    res.send({ status: "success", user });
  })
});

router.put("/", async(req, res) => {
  try {
    const targetId = req.body.id;

    const result = await User.updateOne({ _id: targetId }, req.body);
    res.send({ status: "updated", id: targetId });
  }
  catch (err) {
    res.status(400);
    res.send({ status: "error", error: err });
  }
});

router.patch("/", async(req, res) => {
  try {
    const targetId = req.body.id;

    const result = await User.updateOne({ _id: targetId }, req.body);
    res.send({ status: "updated", id: targetId });
  }
  catch (err) {
    res.status(400);
    res.send({ status: "error", error: err });
  }
});

// Registration
router.post("/register", (req, res) => {
  User.create(req.body)
    .then(result => {
      res.send({ status: "created", id: result._id });
    })
    .catch(err => {
      res.status(400);
      res.send({ status: "error", error: err });
    })
});

// Authentification
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("on login", req.body);

  User.findOne({ email, password })
    .then(result => {
      if (result) {
        res.send({ status: "successful", id: result._id });
      }
      else {
        res.status(400);
        res.send({ status: "error", message: "user not found" });
      }
    })
    .catch(err => {
      res.status(400);
      res.send({ status: "error", error: err });
    })
});


module.exports = router;

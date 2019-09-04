const router = require("express").Router();

const Event = require("../models/event");


router.get("/:id", async (req, res) => {
  const user = await Event.findOne({ _id: req.params.id }).exec();

  if (user) return res.send({ status: "success", user });

  res.status(400);
  res.send({ status: "error", error: "not-found" });
});

// Registration
router.post("/", async (req, res) => {
  try {
    const result = await Event.create(req.body);
    res.send({ status: "created", id: result._id });
  }
  catch (err) {
    res.status(400);
    res.send({ status: "error", error: err });
  }

});

router.put("/", async(req, res) => {
  try {
    const targetId = req.body._id;

    const result = await Event.updateOne({ _id: targetId }, req.body);
    res.send({ status: "updated", id: targetId });
  }
  catch (err) {
    res.status(400);
    res.send({ status: "error", error: err });
  }
});

router.patch("/", async(req, res) => {
  try {
    const targetId = req.body._id;

    const result = await Event.updateOne({ _id: targetId }, req.body);
    res.send({ status: "updated", id: targetId });
  }
  catch (err) {
    res.status(400);
    res.send({ status: "error", error: err });
  }
});


module.exports = router;

const router = require("express").Router();

const Event = require("../models/event");

router.get("/", async (req, res) => {
  const allEvents = await Event.find().exec();

  if (allEvents) return res.send({ status: "success", allEvents });

  res.status(400);
  res.send({ status: "error", error: "not-found" });
});

router.get("/:id", async (req, res) => {
  const event = await Event.findOne({ _id: req.params.id }).exec();

  if (event) return res.send({ status: "success", event });

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
    const targetId = req.body.id;
    const currentUserId = req.body.userId;

    const targetEvent = await Event.findOne({ _id: targetId }).exec();
    if (targetEvent.ownerId !== currentUserId) {
      res.status(401);
      return res.send({ status: "error", error: "you are not allowed to do that"})
    }

    const result = await Event.updateOne({ _id: targetId }, req.body.event);
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
    const currentUserId = req.body.userId;

    const targetEvent = await Event.findOne({ _id: targetId }).exec();
    if (targetEvent.ownerId !== currentUserId) {
      res.status(401);
      return res.send({ status: "error", error: "you are not allowed to do that"})
    }

    const result = await Event.updateOne({ _id: targetId }, req.body.event);
    res.send({ status: "updated", id: targetId });
  }
  catch (err) {
    res.status(400);
    res.send({ status: "error", error: err });
  }
});

router.delete("/", async(req, res) => {
  try {
    const targetId = req.body.id;
    const currentUserId = req.body.userId;

    const targetEvent = await Event.findOne({ _id: targetId }).exec();
    if (targetEvent.ownerId !== currentUserId) {
      res.status(401);
      return res.send({ status: "error", error: "you are not allowed to do that"})
    }

    await Event.deleteOne({ _id: targetId });
    res.send({ status: "deleted", id: targetId });
  }
  catch (err) {
    res.status(400);
    res.send({ status: "error", error: err });
  }
});


module.exports = router;

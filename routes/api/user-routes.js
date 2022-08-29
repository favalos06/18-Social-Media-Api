const router = require("express").Router();
const { User } = require("../../models");

//TODO - ROUTE THAT GETS ALL THE USERS, include friends?
router.get("/", async (req, res) => {
  try {
    let users = await User.find({});
    //.populate('reactions')
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO - ROUTE THAT CREATES A NEW USER
router.post("/", async (req, res) => {
  try {
    let newUser = await User.create(req.body);
    console.log(newUser);
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO - ROUTE THAT GETS A SINGLE USER BASED ON USER ID
router.get("/:userId", async (req, res) => {
  try {
    // console.log(req)
    User.findById(req.params.userId, function (err, user) {
      if (!err) {
        console.log(user);
        res.status(200).json(user);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO - ROUTE THAT UPDATES A SINGLE USER
router.put("/:userId", async (req, res) => {
  try {
    const filter = { _id: req.params.userId };
    const update = req.body;
    let user = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO - ROUTE THAT DELETES A SINGLE USER BASED ON USER ID
router.delete("/:userId", async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.userId });
    res.status(200).json({ status: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO - ROUTE THAT ADDS A FRIEND TO A USER
router.put("/:userId/friends/:friendId", async (req, res) => {
  try {
    console.log(req.body, req.params.userId);

    let updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $push: { friends: req.params.friendId },
      }
    );
    console.log(updatedUser);
    res.status(200).json("Successfully Added Friend");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO - ROUTE THAT DELETES A FRIEND FROM A USER'S FRIENDS, DONT DELETE THE FRIEND AS A USER THOUGH!
router.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    console.log(req.body, req.params.userId);

    let updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $pullAll: {
          friends: [{ _id: req.params.friendId }],
        },
      }
    );
    console.log(updatedUser);
    res.status(200).json("successful delete");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

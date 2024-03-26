const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/middleware');
const { User } = require('../models');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/my-account', protect, async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

/* POST users listing. */
router.post('/register', async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ first_name: first_name, last_name: last_name, email: email, password: hashedPassword });
    const token = jwt.sign(
      {
        id: user.id,
        email: user?.email
      },
      process.env.SECRET_TOKEN,
      { expiresIn: "1d" }
    );
    res.status(201).json({ token });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (user && isPasswordValid) {
      const token = jwt.sign(
        {
          id: user?.id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          phone: user?.phone,
        },
        process.env.SECRET_TOKEN,
        { expiresIn: "1d" }
      );

      res.status(200).json({ token });
    } else {
      throw Error("Incorrect email or password");
    }
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});

/* PUT users listing. */
router.put("/edit/:userId", protect, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, profile, email, phone, about } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, profile, email, phone, about },
      { new: true }
    );
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/* PATCH users listing. */
router.patch("/change-password", protect, async (req, res, next) => {
  try {
    const { oldPassword, newPassword, repeatNewPassword } = req.body;
    const repsonse = await User.changePassword(
      req.user,
      oldPassword,
      newPassword,
      repeatNewPassword
    );
    res.status(200).json(repsonse);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/* PATCH users listing. */
router.delete("/:userId", protect, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const repsonse = await User.findByIdAndDelete(userId);
    res.status(200).json(repsonse);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});

module.exports = router;

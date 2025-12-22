const User = require("../models/UserModel");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

//helper function to hash password with PBKDF2 (SHA-512)
const hashPassword = (password) =>{
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`
}

//helper function to verify password
const verifyPassword = (password, storedValue) =>{
  const [salt, storedValue] = storedValue.split(":");
  const hashToVerify = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');

  //timingSafeEqual Prevents timing attacks

  return crypto.timingSafeEqual(Buffer.from(storedHash), Buffer.from(hashToVerify));

}

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User Already Exists" });

    const hashedPassword = hashPassword(password);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "user registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Signup Failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not Found" });

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: "Login Failed" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

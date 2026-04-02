require("dotenv").config();
const mongoose = require("mongoose");

const User = require("../src/models/user.model");

async function main() {
  const uri =
    process.env.MONGODB_URI ||
    "mongodb+srv://bluetrackinfo:w4fbjp0spba2DbYg@cluster0.cyevubq.mongodb.net/BlueTrack?retryWrites=true&w=majority";

  const email = (process.argv[2] || "").trim();
  if (!email) {
    throw new Error('Usage: node scripts/db-check-user.js "email@example.com"');
  }

  await mongoose.connect(uri);

  const exact = await User.findOne({ email });
  const lower = await User.findOne({ email: email.toLowerCase() });
  const regex = await User.findOne({
    email: new RegExp(`^${email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i"),
  });
  const like = await User.find({
    email: new RegExp(email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
  }).select("email status createdAt");

  console.log(
    JSON.stringify(
      {
        input: email,
        exact: !!exact,
        lower: !!lower,
        regex: !!regex,
        storedExact: exact?.email,
        storedLower: lower?.email,
        storedRegex: regex?.email,
        like: like.map((u) => ({
          email: u.email,
          status: u.status,
          createdAt: u.createdAt,
        })),
      },
      null,
      2
    )
  );

  await mongoose.disconnect();
}

main().catch(async (err) => {
  try {
    await mongoose.disconnect();
  } catch {}
  console.error(err);
  process.exit(1);
});

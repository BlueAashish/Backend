const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      // required: true,
      trim: true,
    },
    lastName: {
      type: String,
      // required: true,
      trim: true,
    },
    password:{
      type:String
    },
    phone: {
      type: String,
      // required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\d{10,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    companyName: {
      type: String,
      // required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    city: {
      type: String,
      // required: true,
      trim: true,
    },
    pincode: {
      type: String,
      // required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\d{5,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid pincode!`,
      },
    },
    state: {
      type: String,
      // required: true,
      trim: true,
    },
    address: {
      type: String,
      // required: true,
      trim: true,
    },
    userFlowLimit: {
      type: Number,
      // required: true,
      min: 0,
    },
    role: {
      type: String,
      enum: ["admin", "client"],
      default: "client",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    activeDevices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    subscription: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);

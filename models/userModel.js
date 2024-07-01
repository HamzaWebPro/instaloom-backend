const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const userModel = new Schema(
  {
    firstName: {
      type: String,
      require: true,
      trim: true,
      text: true,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
      text: true,
    },
    userName: {
      type: String,
      require: true,
      trim: true,
      text: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    birthMonth: {
      type: Number,
      require: true,
      trim: true,
    },
    birthDate: {
      type: Number,
      require: true,
      trim: true,
    },
    birthYear: {
      type: Number,
      require: true,
      trim: true,
    },
    gender: {
      type: String,
      require: true,
    },
    varified: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: ObjectId,
        ref: "userModel",
      },
    ],
    followers: [
      {
        type: ObjectId,
        ref: "userModel",
      },
    ],
    following: [
      {
        type: ObjectId,
        ref: "userModel",
      },
    ],
    friendRequest: [
      {
        type: ObjectId,
        ref: "userModel",
      },
    ],
    search: [
      {
        user: {
          type: ObjectId,
          ref: "userModel",
          require: true,
          text: true,
        },
        createdAt: {
          type: Date,
          require: true,
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      jobType: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      workPlace: {
        type: String,
      },
      college: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      homeTown: {
        type: String,
      },
      relationStatus: {
        type: String,
        enum: [
          "Single",
          "In a Relationship",
          "It's Complicated",
          "Married",
          "Divorced",
        ],
      },
      instagram: {
        type: String,
      },
      savePost: [
        {
          post: {
            type: ObjectId,
            ref: "post",
          },
          savedAt: {
            type: Date,
            require: true,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("User",userModel)
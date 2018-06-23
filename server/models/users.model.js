const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const {
  isEmail
} = require('validator')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new schema({
  name: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email address is required'],
    unique: true,
    validate: [isEmail, 'Invalid Email'],
  },
  password: {
    type: String,
    require: [true, 'password address is required'],
    match: [/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/, 'Password should contain 8 character and atleast one capital letter, one number and one special character']
  },
  role: {
    type: String,
    default: 'user'
  },
  photo_profile: {
    type: String,
    default: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg'
  },
  statuses: [{
    type: schema.Types.ObjectId, ref: 'Status',
  }],
  likes: [{
    type: schema.Types.ObjectId, ref: 'Status',
  }],
  comments: [{
    type: schema.Types.ObjectId, ref: 'Comment',
  }]
}, {
  timestamps: true
});

userSchema.pre('save', function (next) {
  var user = this
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' })

const User = mongoose.model('User', userSchema);

module.exports = User;

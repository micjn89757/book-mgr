const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const LogSchema = new mongoose.Schema({
  user: {
    account: String,
    id: String,
  },

  request: {
    method: String,
    url: String,
    status: Number,
  },

  startTime: Number,
  endTime: Number,

  show: Boolean,

  meta: getMeta(),
});

LogSchema.pre('save', preSave);

mongoose.model('Log', LogSchema);

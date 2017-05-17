var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');



mongolass.plugin('addCreatedAt', {
  afterFind: function (results) {
    results.forEach(function (item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
    });
    return results;
  },
  afterFindOne: function (result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
    }
    return result;
  }
});
mongolass.connect(config.mongodb);
exports.User = mongolass.model('User', {
  name: { type: 'string' },
  password: { type: 'string' },
  avatar: { type: 'string' },
  gender: { type: 'string', enum: ['m', 'f', 'x'] },
  bio: { type: 'string' }
});
exports.User.index({ name: 1 }, { unique: true }).exec();

exports.Post = mongolass.model('Post', {
  author: { type: Mongolass.Types.ObjectId },
  title: { type: 'string' },
  content: { type: 'string' },
  pv: { type: 'number' },
  chart: { type: 'string' }
});
exports.Post.index({ author: 1, _id: -1 }).exec();

exports.Canz = mongolass.model('Canz', {
  author: { type: Mongolass.Types.ObjectId },
  cz: { type: 'string' },
  cl: { type: 'string' },
  bl: { type: 'string' },
  cd: { type: 'string' },
  cl1: { type: 'string' },
  bl1: { type: 'string' },
  cd1: { type: 'string' },
  cl2: { type: 'string' },
  bl2: { type: 'string' },
  cd2: { type: 'string' },
  cl3: { type: 'string' },
  bl3: { type: 'string' },
  cd3: { type: 'string' }
});
exports.Canz.index({ author: 1, _id: -1 }).exec();

var marked = require('marked');
var Comment = require('../lib/mongo').Comment;

// 将 comment 的 content 从 markdown 转换成 html
Comment.plugin('contentToHtml', {
  afterFind: function (comments) {
    return comments.map(function (comment) {
      comment.content = marked(comment.content);
      return comment;
    });
  }
});

module.exports = {
  // 创建一个用户交流
  create: function create(comment) {
    return Comment.create(comment).exec();
  },

  // 通过用户 id 和交流 id 删除一个交流
  delCommentById: function delCommentById(commentId, author) {
    return Comment.remove({ author: author, _id: commentId }).exec();
  },

  // 通过信息 id 获取该信息下所有交流，按交流创建时间升序
  getComments: function getComments(postId) {
    return Comment
      .find({ postId: postId })
      .populate({ path: 'author', model: 'User' })
      .sort({ _id: 1 })
      .addCreatedAt()
      .contentToHtml()
      .exec();
  },

  // 通过信息 id 获取该信息下交流数
  getCommentsCount: function getCommentsCount(postId) {
    return Comment.count({ postId: postId }).exec();
  }
};
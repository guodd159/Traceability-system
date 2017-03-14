

var marked = require('marked');

var Canz = require('../lib/mongo').Canz;



Canz.plugin('canzToHtml', {
    afterFind: function (canzs) {
        return canzs.map(function (canz) {
            canz.cl = marked(canz.cl);
            canz.bl = marked(canz.bl);
            canz.cd = marked(canz.cd);
            return canz;
        });
    },
    afterFindOne: function (canz) {
        if (canz) {
            canz.cl = marked(canz.cl);
            canz.bl = marked(canz.bl);
            canz.cd = marked(canz.cd);
        }
        return canz;
    }
});

module.exports = {

    create: function create(canz) {
        return Canz.create(canz).exec();
    },
    search: function search(czId) {
        //var postId  = new RegExp(postId, "i");
        if(czId) {
            return Canz
                .findOne({cz: {$regex: czId}})
                // .populate({path: 'author', model: 'User'})
                .addCreatedAt()
                .canzToHtml()
                .exec();
        }
    },
    getCanzById: function getCanzById(canzId) {
        return Canz
            .findOne({ _id: canzId })
            // .populate({ model: 'Canz' })
            .addCreatedAt()
            .canzToHtml()
            .exec();
    },
    getCanzs: function getCanzs(author, page) {
        var query = {};
        if (author) {
            query.author = author;
        }
        return Canz
            .find(query, {skip: (page-1)*3, limit: 3})
            .populate({ path: 'author', model: 'User' })
            .sort({ _id: -1 })
            .addCreatedAt()
            .canzToHtml()
            .exec();
    },
    total: function total(author) {
        var query = {};
        if (author) {
            query.author = author;
        }
        return Canz
            .count(query)
            .exec();
    }

};



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
    getCanzById: function getCanzById(canzId) {
        return Canz
            .findOne({ _id: canzId })
            // .populate({ model: 'Canz' })
            .addCreatedAt()
            .canzToHtml()
            .exec();
    }
};

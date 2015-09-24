"use strict";
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Tag = new Schema({
    name: String,
    rel: Schema.Types.ObjectId,
    type: {
        type: String,
        enum: ['model', 'brand', 'subCategory', 'category']
    },
    parents: {
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        },
        subCategory: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        },
        brand: {
            type: Schema.Types.ObjectId,
            ref: 'Brand'
        }
    }
});

Tag.statics.new = function (type, instance) {
    var tag = new this();

    tag.name = type === 'model' ? [instance.brand.name, instance.name].join(' ') : instance.name;
    tag.type = type;
    tag.rel = instance._id;

    if (type === 'subCategory' || type === 'category') {
        tag.parents.category = instance.parent;
    } else {
        tag.parents.category = instance.category;
    }

    if (instance.subCategory) {
        tag.parents.subCategory = instance.subCategory;
    }

    if (instance.brand) {
        tag.parents.brand = instance.brand._id;
    }
    return tag;
};

module.exports = mongoose.model('Tag', Tag);
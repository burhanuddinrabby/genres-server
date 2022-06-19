const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: String,
    slug: String,
    categories: String,
    content: String,
});

module.exports = mongoose.model('Blog', blogSchema);
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const urlSchema = new mongoose.Schema({
    url: {type: String, required: true}
});

urlSchema.plugin(AutoIncrement, {inc_field: 'urlId'});

module.exports = mongoose.model('Url', urlSchema);

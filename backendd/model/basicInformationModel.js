var mongoose = require('mongoose');
// Setup schema
var basicInformationSchema = mongoose.Schema({
    basicDetail: {
        name: String,
        key: String,
        status: Boolean
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    elements: {
        type: Array,
        required: false
    }
});
// Export Contact model
var BasicInformation = module.exports = mongoose.model('basicInformation', basicInformationSchema);
module.exports.get = function (callback, limit) {
    BasicInformation.find(callback).limit(limit);
}

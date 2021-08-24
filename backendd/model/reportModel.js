var mongoose = require('mongoose');
// Setup schema
var reportSchema = mongoose.Schema({
    imageUrl: {
        type: String
    },
    employee_name: {
        type: String,
        required: true
    },
    employee_id: {
        type: String,
        required: true
    },
    department: String
});

// Export Contact model
var Report = module.exports = mongoose.model('report', reportSchema);
module.exports.get = function (callback, limit) {
    Report.find(callback).limit(limit);
}

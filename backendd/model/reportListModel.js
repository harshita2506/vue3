var mongoose = require('mongoose');
// Setup schema
var reportListSchema = mongoose.Schema({
    report_name: {
        type: String
    },
    start_date: {
        type: String
    },
    end_date: {
        type: String
    }
});

// Export Contact model
var Report = module.exports = mongoose.model('reportList', reportListSchema);
module.exports.get = function (callback, limit) {
    Report.find(callback).limit(limit);
}

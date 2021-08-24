var mongoose = require('mongoose');
// Setup schema
var leaveStatus = mongoose.Schema({

    name: String,
}, {
    collection: 'leave_status'

});
// Export Contact model
var leavestatus = module.exports = mongoose.model('Leavestatus', leaveStatus);
module.exports.get = function (callback, limit) {
    leavestatus.find(callback).limit(limit);
}
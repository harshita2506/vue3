const mongoose = require('mongoose');

const employeeleaves =  mongoose.Schema({
    total_leaves: {type:Number},
    used_leaves:{type:Number}
}, {
    collection: 'leaves'
});
// Export Contact model
//var Report = module.exports = mongoose.model('report', reportSchema);

var employeeLeaves=module.exports  = mongoose.model('EmployeeLeaves', employeeleaves);
module.exports.get = function (callback, limit) {
    employeeLeaves.find(callback).limit(limit);
}
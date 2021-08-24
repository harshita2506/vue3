employeeLeaves = require('../model/leaves.modal');
leaveStatus = require('../model/leave.status.modal.js');
// Handle index actions
exports.index = function (req, res) {
    employeeLeaves.get(function (err, employeeleaves) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json(employeeleaves);
    });
};
exports.indexx = function (req, res) {
    leaveStatus.get(function (err, leavestatus) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json(leavestatus);
    });
};

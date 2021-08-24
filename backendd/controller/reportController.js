Report = require('../model/reportModel');
ReportList = require('../model/reportListModel');
BasicInformation = require('../model/basicInformationModel');

// Handle index actions
exports.index = function (req, res) {
    Report.get(function (err, reports) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Reports retrieved successfully",
            data: reports
        });
    });
};
exports.indexx = function (req, res) {
    ReportList.get(function (err, reportList) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "ReportList retrieved successfully",
            data: reportList
        });
    });
};
exports.index1 = function (req, res) {
    BasicInformation.get(function (err, basicInformation) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "BasicInformation retrieved successfully",
            data: basicInformation
        });
    });
};

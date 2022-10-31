'use strict'

const { arrayify } = require("seneca-entity/lib/common");

//Pluguin to manage patient records
//TO DO - manage exeptions - Delete all records
var plugin = function(options) {
    var seneca = this;
    //Modify a patient record
    seneca.add("area:patientRecords,action:modify_record", function(msg, done){
        console.log("-->modify_record: " + msg.args.query.patientid);
        var patientRecords = this.make("patientRecords");
        patientRecords.list$({ id: msg.args.query.id }, function (err, result) {
            console.log("-->-->: patientRecord.list$ id:" + msg.args.query.id);
            console.log("-->-->: patientRecord.data$");
            console.log("-->-->: result[0]: " + result[0].patientid);
            // TODO: if not found, return error
            var record = result[0]; // first element
            record.data$(
                {
                    patientid: msg.args.query.patientid
                }
            );
            console.log("-->-->: record.save$");
            record.save$(function (err, result) {
                console.log("-->-->-->: record.data$, product: " + record);
                done(err, result.data$(false));
            });
        }); 
    });

    //List a unique record
    seneca.add("area:patientRecords,action:list_record", function(msg, done){
        console.log("-->list_record: " + msg.args.query.id);
        var patientRecords = this.make("patientRecords");
        patientRecords.list$({ id:msg.args.query.id }, done);
    });

    //List all patient records
    seneca.add("area:patientRecords,action:list_records", function(msg, done){
        console.log("-->list_records");
        var patientRecords = this.make("patientRecords");
        patientRecords.list$({}, done);
    });

    //Create a new patient record
    seneca.add("area:patientRecords,action:create_record", function(msg, done) {
        console.log("-->create_record, patientid: "+ msg.args.query.patientid );
       
        var patientRecords = this.make("patientRecords");
        patientRecords.patientid = msg.args.query.patientid;
        
        patientRecords.save$(function(err, product) {
            done(err, patientRecords.data$(false));
        })
    });

    //Delete a patient record
    seneca.add("area: patientRecords, action: delete_record", function(msg, done) {
        console.log("-->delete_record, patientid: " + msg.args.query.patientid );
        var patientRecords = this.make("patientRecords");
        patientRecords.remove$(msg.args.query.id, function(err) {
            done(err, null);
        });
    });
}
module.exports = plugin;
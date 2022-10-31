'use strict'

const { arrayify } = require("seneca-entity/lib/common");

//Pluguin to manage resident records
//TO DO - manage exeptions - Delete all records
var plugin = function(options) {
    var seneca = this;
    //Modify a resident record
    seneca.add("area:residentRecords,action:modify_record", function(msg, done){
        console.log("-->modify_record: " + msg.args.query.residentsin);
        var residentRecords = this.make("residentRecords");
        residentRecords.list$({ id: msg.args.query.id }, function (err, result) {
            console.log("-->-->: residentRecord.list$ sin:" + msg.args.query.id);
            console.log("-->-->: residentRecord.data$");
            console.log("-->-->: result[0]: " + result[0].residentsin);
            // TODO: if not found, return error
            var record = result[0]; // first element
            record.data$(
                {
                    residentsin: msg.args.query.residentsin
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
    seneca.add("area:residentRecords,action:list_record", function(msg, done){
        console.log("-->list_record: " + msg.args.query.id);
        var residentRecords = this.make("residentRecords");
        residentRecords.list$({ id:msg.args.query.id }, done);
    });

    //List all resident records
    seneca.add("area:residentRecords,action:list_records", function(msg, done){
        console.log("-->list_records");
        var residentRecords = this.make("residentRecords");
        residentRecords.list$({}, done);
    });

    //Create a new resident record
    seneca.add("area:residentRecords,action:create_record", function(msg, done) {
        console.log("-->create_record, residentsin: "+ msg.args.query.residentsin );
       
        var residentRecords = this.make("residentRecords");
        residentRecords.residentsin = msg.args.query.residentsin;
        
        residentRecords.save$(function(err, product) {
            done(err, residentRecords.data$(false));
        })
    });

    //Delete a resident record
    seneca.add("area: residentRecords, action: delete_record", function(msg, done) {
        console.log("-->delete_record, residentid: " + msg.args.query.id );
        var residentRecords = this.make("residentRecords");
        residentRecords.remove$(msg.args.query.id, function(err) {
            done(err, null);
        });
    });
}
module.exports = plugin;
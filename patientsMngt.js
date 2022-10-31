'use strict'

//Pluguin to manage patients
//TO DO - manage exeptions
const { arrayify } = require("seneca-entity/lib/common");

var plugin = function(options) {
    var seneca = this;
    //Patient modification
    seneca.add("area:patients,action:modify_patient", function(msg, done){
        console.log("-->modify_patient: " + msg.args.query.completename);
        var patients = this.make("patients");
        patients.list$({ id: msg.args.query.id }, function (err, result) {
            console.log("-->-->: patient.list$ id:" + msg.args.query.id);
            console.log("-->-->: patient.data$");
            console.log("-->-->: result[0]: " + result[0].completename);
            // TODO: if not found, return error
            var patient = result[0]; // first element
            patient.data$(
                {
                    completename: msg.args.query.completename,                    
                }
            );
            console.log("-->-->: patient.save$");
            patient.save$(function (err, result) {
                console.log("-->-->-->: patient.data$, product: " + patient);
                done(err, result.data$(false));
            });
        }); 
    });

    //List a unique patient
    seneca.add("area:patients,action:list_patient", function(msg, done){
        console.log("-->list_patient: " + msg.args.query.id);
        var patients = this.make("patients");
        patients.list$({ id:msg.args.query.id }, done);
    });

    //List all patients
    seneca.add("area:patients,action:list_patients", function(msg, done){
        console.log("-->list_patients");
        var patients = this.make("patients");
        patients.list$({}, done);
    });

    //Create a new patient
    seneca.add("area:patients,action:create_patient", function(msg, done) {
        console.log("-->create_paiebt, patientname: "+ msg.args.query.completename );
       
        var patients = this.make("patients");
        patients.completename = msg.args.query.completename;
        patients.age = msg.args.query.age;
        patients.address = msg.args.query.address;        

        patients.save$(function(err, product) {
            done(err, patients.data$(false));
        })
    });

    //Delete existing patient
    seneca.add("area: patients, action: delete_patient", function(msg, done) {
        console.log("-->delete_paient, patientid: " + msg.args.query.id );
        var patients = this.make("patients");
        patients.remove$(msg.args.query.id, function(err) {
            done(err, null);
        });
    });
}
module.exports = plugin;
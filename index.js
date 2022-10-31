'use strict'

/*
@Autors
Name: Oscar Miralles
Student ID: 301250756
Name: Carlos Hernandez
Student ID: 301290263
*/

//Program requeriments
var seneca = require('seneca')()
const entities = require('seneca-entity');
const mongo_store = require('seneca-mongo-store');
const web = require("seneca-web");


//Pluguins declarations
var express = require('express');
  var app = express();
  var config = {
    routes:[{
        prefix : '/users',
        pin: "area:users,action:*",
        map:{
            login: {GET: true},
            list_user: {GET: true},
            list_users: {GET: true},
            create_user: {GET: false, POST: true},
            delete_user: {GEt: false, DELETE:true}
        }
    },
    {
        prefix : '/residents',
        pin: "area:residents,action:*",
        map:{
            create_resident: {GET: false, POST: true},
            list_resident: {GET: true},
            list_residents: {GET: true},
            modify_resident: {GET: false, PUT: true},
            delete_resident: {GET: false, DELETE:true}
        }
    },
    {
        prefix : '/residentRecords',
        pin: "area:residentRecords,action:*",
        map:{
            create_record: {GET: false, POST: true},
            list_record: {GET: true},
            list_records: {GET: true},
            modify_record: {GET: false, PUT: true},
            delete_record: {GET: false, DELETE: true}
        }
    }],
    adapter: require('seneca-web-adapter-express'),
    options: {parseBody: false},
    context: app
};

app.use( require("body-parser").json() );

//Import pluguins and create service
seneca
  .use(entities)
  .use('./loginMngt.js')
  .use('./residentsMngt.js')
  .use('./residentRecordsMngt.js')
  .use(web, config)
  .use(mongo_store, {
    uri: 'mongodb://127.0.0.1:27017/clinicDB'
  })
  .ready(() => {
    var server = seneca.export('web/context')()

    server.listen('3000', () => {
      console.log('server started on: 3000')
    })
    console.log("Server listening on: //localhost:"+3000);
    console.log("--- Actions -----------");
    console.log("http://localhost:3000/users/login?user=username&password=password");
    console.log("http://localhost:3000/users/list_user?id=userid");
    console.log("http://localhost:3000/users/list_users");
    console.log("http://localhost:3000/users/create_user?user=username&password=password&profile=profile");
    console.log("http://localhost:3000/users/delete_user?id=userid");
    console.log("http://localhost:3000/residents/list_residents");
    console.log("http://localhost:3000/residents/create_resident?sin=sinnumber&completename=complitename&age=age&address=address&servicetype=servicetype&day=day&hour=hour");
    console.log("http://localhost:3000/residents/modify_resident?sin=sinnumber&completename=complitename&age=age&address=address&servicetype=servicetype&day=day&hour=hour");
    console.log("http://localhost:3000/residents/list_resident?sin=sinnumber");
    console.log("http://localhost:3000/residents/delete_resident?sin=sinnumber");
  })
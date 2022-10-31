'use strict'

const { arrayify } = require("seneca-entity/lib/common");

//Pluguin to manage app users
//TO DO - manage exeptions - Modify user profile.
var plugin = function(options) {
    var seneca = this;
    //Login management
    seneca.add("area:users,action:login", function(msg, done){
        console.log("-->login_user: " + msg.args.query.user + " password : " + msg.args.query.password);        
        var users = this.make("users");
        users.list$({ user:msg.args.query.user, password:msg.args.query.password }, done);
    });

    //List a app user
    seneca.add("area:users,action:list_user", function(msg, done){
        console.log("-->list_user: " + msg.args.query.id);
        var users = this.make("users");
        users.list$({ id:msg.args.query.id }, done);
    });

    //list all users
    seneca.add("area:users,action:list_users", function(msg, done){
        console.log("-->list_users");
        var users = this.make("users");
        users.list$({}, done);
    });

    //Create a new user
    seneca.add("area:users,action:create_user", function(msg, done) {
        console.log("-->create_user, username: "+ msg.args.query.user );
       
        var users = this.make("users");
        users.user = msg.args.query.user;
        users.password = msg.args.query.password;
        users.profile = msg.args.query.profile;        

        users.save$(function(err, product) {
            done(err, users.data$(false));
        })
    });

    //Delete a user
    seneca.add("area: users, action: delete_user", function(msg, done) {
        console.log("-->delete_user, username: " + msg.args.query.id );
        var users = this.make("users");
        users.remove$(msg.args.query.id, function(err) {
            done(err, null);
        });
    });
}
module.exports = plugin;
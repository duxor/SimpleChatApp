import { Template }     from 'meteor/templating';
import { Session }      from 'meteor/session';
import { Users }        from '../imports/api/users.js';
import { Messages }     from '../imports/api/messages.js';

import './main.html';


Template.body.events({
    'click .logout'(event){
        event.preventDefault();
        Session.set('username',null);
    }
});
Template.login.events({
    'click button.login'(event, instance) {
        event.preventDefault();
        var username    = instance.find('[name=username]').value;
        var password    = instance.find('[name=password]').value;
        var user        = Users.find({username: username}).fetch();
        var pass        = Users.find({username: username, password: password}).fetch();

        if(!user.length){
            Users.insert({
                username: username,
                password: password
            });
        }else{
            if(pass.length){
                //Auth

            }else{
                //pass error
                alert('Password is incorect!');
                return;
            }
        }
        //Login
        Session.set('username',username);
    },
});
Template.messages.helpers({
    messages(){
        return Messages.find({},{sort: {createdAt: -1}});
    },
    /*poruke: [
     { text: 'This is task 1' },
     { text: 'This is task 2' },
     { text: 'This is task 3' },
     ],*/
});
Handlebars.registerHelper('session', function(name) {
    return Session.get(name);
});
Template.messages.events({
    'submit .message_input'(event){
        event.preventDefault();

        const target    = event.target;
        const text      = target.text.value;
        Messages.insert({
            "text": Session.get("username")+": "+text,
            "owner":Session.get("username"),
            createdAt: new Date()
        });
        target.text.value = "";
    },
    'click .delete'(){
        if( this.owner == Session.get("username") || Session.get("role") == "admin" )
            Messages.remove(this._id);
        else alert("You can remove only own messages!");
    }
});
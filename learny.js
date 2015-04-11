  Words = new Mongo.Collection("words");

  if (Meteor.isClient) {
    // This code only runs on the client
    Template.body.helpers({
      words: function() {
        return Words.find({});
      }
    });


    Template.body.events({
      "submit .new-word": function(event) {
        // This function is called when the new task form is submitted

        var text = event.target.text.value;

        Words.insert({
          text: text,
          createdAt: new Date() // current time
        });

        // Clear form
        event.target.text.value = "";

        // Prevent default form submit
        return false;
      }
    });

  }
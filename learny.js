  GermanWords = new Mongo.Collection("germanWords"
    //, {
    //transform: function(doc) {
    //doc.enWords.forEach(function(englishWord) {

    //doc.enWordsRef = doc.enWordsRef || [];
    //var enWord = EnglishWords.findOne(englishWord);
    // doc.enWordsRef.push(EnglishWords.findOne(englishWord));
    //});
    //}
    //}
  )

  EnglishWords = new Mongo.Collection("englishWords");

  console.log(EnglishWords.findOne(new Meteor.Collection.ObjectID("552a9d30cec62b0594da6d03")));

  if (Meteor.isClient) {
    // This code only runs on the client
    Template.body.helpers({
        words: function() {
          return GermanWords.find({});
        }

      }

    );

    Template.englishWordsTpl.helpers({
      englishWords: function() {
        var englishWords = [];
        this.enWords.forEach(function(enWord){
          englishWords.push(EnglishWords.findOne(enWord));
        });
        return englishWords;
      }

    });



    Template.body.events({
      "submit .new-word": function(event) {
        // This function is called when the new task form is submitted

        var text = event.target.text.value;

        GermanWords.insert({
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
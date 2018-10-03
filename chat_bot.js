//loading json file
var data = require('./fake_news.json');

var input = require('readline-sync');
// Load Naive Bayes Text Classifier
var Classifier = require( 'wink-naive-bayes-text-classifier' );
// Instantiate
var nbc = Classifier();
// Load NLP utilities
var nlp = require( 'wink-nlp-utils' );
// Configure preparation tasks
nbc.definePrepTasks( [
  // Simple tokenizer
  nlp.string.tokenize0,
  // Common Stop Words Remover
  nlp.tokens.removeWords,
  // Stemmer to obtain base word
  nlp.tokens.stem
] );
// Configure behavior
nbc.defineConfig( { considerOnlyPresence: true, smoothingFactor: 1 } );
console.log("Intializing to predict fake news");

for (key in data)
{
	if(data[key].title!=null)
	{
		nbc.learn(data[key].title,data[key].type);
	}

	if(data[key].text!=null)
	{
		nbc.learn(data[key].text,data[key].type);
	}
}

console.log("Data training completed")// Consolidate all the training!!
nbc.consolidate();
// Start predicting...
console.log("data consolidation completed");
var news_extract = input.question("enter news to predict its status");
var reply = nbc.predict(news_extract);
console.log(reply);




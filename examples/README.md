Node.js Examples
============

These examples are scripts that can be run independently to demonstrate the Rosette API functionality.

You can run your desired `_endpoint_.js` file to see it in action.
For example, run `node categories.js --key <your_key>` if you want to see the categories
functionality demonstrated.

If you would like to run against an alternate url, you can use the optional --url <alt_url> argument.

To run all of the examples, use the command line:
`find -maxdepth 1 -name "*.js" -exec node {} --key api_key --url alt_url \;`
or execute:
`run_all.sh`

All files require you to input your Rosette API User Key after `--key` to run.
For example: `node ping.js --key 1234567890`  

Each example, when run, prints its output to the console.

| File Name                     | What it does                                          | 
| -------------                 |-------------                                        | 
| base64_input.js                  | Gets the entities from a piece of base64 encoded text | 
| categories.js                    | Gets the category of a document at a URL              | 
| entities.js                      | Gets the entities from a piece of text                | 
| entities_linked.js               | Gets the linked (to Wikipedia) entities from a piece of text |
| info.js                          | Gets information about Rosette API                    | 
| language.js                      | Gets the language of a piece of text                  | 
| matched-name.js                  | Gets the similarity score of two names                | 
| morphology_complete.js               | Gets the complete morphological analysis of a piece of text| 
| morphology_compound-components.js    | Gets the de-compounded words from a piece of text     | 
| morphology_han-readings.js           | Gets the Chinese words from a piece of text           | 
| morphology_lemmas.js                 | Gets the lemmas of words from a piece of text         | 
| morphology_parts-of-speech.js        | Gets the part-of-speech tags for words in a piece of text | 
| ping.js                          | Pings the Rosette API to check for reachability       | 
| sentences.js                     | Gets the sentences from a piece of text               |
| sentiment.js                     | Gets the sentiment of a local file                    | 
| tokens.js                        | Gets the tokens (words) from a piece of text          | 
| translated-name.js               | Translates a name from one language to another        |

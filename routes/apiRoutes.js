// import file handling library
var fs = require("fs");

// Handle REST API Calls 
module.exports = function (app) {
    // Handle GET on /api/notes
    app.get("/api/notes", function (req, res) {
        // Read the JSON file
        fs.readFile("./db/db.json", "utf8", function (error, data) {
            if (error) {
                return console.log('*** ERROR on GET of /api/notes/ .. got .. ' + error);
            }
            // Send back the ammended JSON object
            return res.json(JSON.parse(data));
            //return res.json(data);
        });
    });

    // Handle POST on /api/notes
    app.post("/api/notes", function (req, res) {
        const newNote = req.body;
        fs.readFile("./db/db.json", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            // scan into note array
            const note_array = JSON.parse(data);

            // If this is the first note in teh array, set the ID to '1'
            // Otherwise simply make it 'length + 1'
            if (note_array.length) { // if length is 0 this will return false
                newNote.id = note_array.length + 1;
            } else {
                newNote.id = 1;
            }

            // Push new element onto end of array
            note_array.push(newNote);

            // Write contents of array to file
            fs.writeFile("./db/db.json", JSON.stringify(note_array), function (error) {
                if (error) {
                    return console.log('*** ERROR on POST of /api/notes/ .. got .. ' + error);
                }
                // Send back the ammended JSON object
                res.json(newNote);
            });
        });
    });

    // Handle DELETE on /api/notes/:id
    app.delete("/api/notes/:id", function (req, res) {

        // Obtain the ID from URL parameter
        const id = parseInt(req.params.id);
        // Read teh file 
        fs.readFile("./db/db.json", "utf8", function (error, data) {
            if (error) {
                return console.log('*** ERROR on reading file ./db/db.json .. got .. ' + error);
            }

            // Scan the file into JSON Object
            const note_array = JSON.parse(data);

            // Locate the Object with teh matching 'id'
            const note = note_array.find((element) => element.id === id);

            // Did we find a note with this ID in the array?
            if (note) {
                // Use the splice function to remote '1' element at position 'n' of array
                note_array.splice(note_array.indexOf(note), 1);
            } else {
                // The selected note ID was not found, display error
                return console.log(`*** ERROR on /api/noted/:id, Note with ID of ${id} does not exist `);
            }

            // Write the ammended JSON data to the file, effectively replacing the file just read
            fs.writeFile("./db/db.json", JSON.stringify(note_array), function (error) {
                if (error) {
                    return console.log('*** ERROR on DELETE of /api/notes/:id .. got .. ' + error);
                }
                // Send back the ammended JSON object
                res.json(note_array);
            });
        });
    });
}
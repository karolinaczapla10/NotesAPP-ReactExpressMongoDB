const Note = require('../../db/models/note');

class NoteActions {

  async saveNote(req, res) {
    const title = req.body.title;
    const body = req.body.body;
    const username = req.body.username
    let note;

    try {
      await new Note({ title:title, body:body, username:username }).save();
    } catch (err) {
      console.log(err);
      return res.status(422).json({ message: err.message });
      
    }

    res.status(201).json(note);
  }

  // pobieranie notatek
  async getAllNotes(req, res) {
    const doc = await Note.find({});

    res.status(200).json(doc);
  }

  // pobieranie notatki
  async getNote(req, res) {
    const id = req.params.id;
    const note = await Note.findOne({ _id: id });

    res.status(200).json(note);
  }


  
  // aktualizowanie notatki
  async updateNote(req, res) {
    const id = req.params.id;
    const title = req.body.title;
    const body = req.body.body;

    const note = await Note.findOne({ _id: id });
    note.title = title;
    note.body = body;
    await note.save();

    res.status(201).json(note);
  }

  // usuwanie notatki
  async deleteNote(req, res) {
    const id = req.params.id;
    await Note.deleteOne({ _id: id });

    res.sendStatus(204);
  }
/*
async getNotesByUsername(req, res) {
  const {username} = req.body
  console.log("username: ")
  console.log(username)
  try {
    const notes = await Note.find({ username : username});
    res.status(201).json(notes);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}
*/
async getNotesByUsername(req, res) {
  const { username } = req.body;
  try {
    const notes = await Note.find({ username: username });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

}



module.exports = new NoteActions();
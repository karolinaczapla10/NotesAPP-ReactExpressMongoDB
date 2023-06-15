const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");

const notesActions = require('../actions/api/noteActions');
const UserActions = require('../actions/api/userActions');

//API endpoint
//pobieranie notatek
router.get('/notes', notesActions.getAllNotes)
//pobieranie wybranej notatki
router.get('/notes/:id', notesActions.getNote)
//zapisywanie notatek
router.post('/notes', notesActions.saveNote)
//edycja  notatek
router.put('/notes/:id', notesActions.updateNote)
//usuwanie notatek
router.delete('/notes/:id', notesActions.deleteNote)

router.post("/notes/username",notesActions.getNotesByUsername)


router.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const salt = await bcrypt.genSalt(Number(10))
      const hashPassword = await bcrypt.hash(password, salt)
      console.log(hashPassword);
      await UserActions.registerUser(username, hashPassword);
      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      if (error.message === 'User already exists') {
        res.status(400).json({ error: 'User already exists' });
      } else {
        res.status(500).json({ error: 'An error occurred' });
      }
    }
  });

// Dodaj ścieżkę POST dla logowania użytkownika
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserActions.loginUser(username, password);
    if(user)
      res.status(200).json({ message: 'User logged successfully', username: username});
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});




module.exports = router;
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const reminderController = require('./controllers/reminder_controller');

const app = express();
const port = 8000;

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.urlencoded({extended: false}));

// case 1: user goest to <localhost:8000/  -> Homepage or Landing page
app.get('/', reminderController.hello);

// case 2: user goes to localhost:8000/reminder  -> show a list of reminders
app.get('/reminder', reminderController.list);

// case 3: user goes to localhost:8000/reminder/new  -> show a CREATE REMINDER PAGE
app.get('/reminder/new', reminderController.new);

// case 4: user sends reminder data to us (creates a reminder)
app.post('/reminder', reminderController.create);

// case 5: user wants to see an individual reminder
app.get('/reminder/:id', reminderController.listOne);

// case 6: user want to edit an existing reminder
app.get('/reminder/:id/edit', reminderController.edit);

// case 7: user sends updates reminder to us (edits a reminder)
app.put('/reminder/:id/edit', reminderController.update); 

// case 8: user deletes a reminder
app.get('/reminder/:id/delete', reminderController.delete);

// case 9: user cancels the edit
app.get('/reminder/:id/cancel', reminderController.cancel);

app.listen(port, () => console.log(`Server is running on port ${port}`));

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.static(__dirname));

app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'projects.html'));
});

app.get('/bookmarklets', (req, res) => {
  res.sendFile(path.join(__dirname, 'bookmarklets.html'));
});

app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, 'settings.html'));
});

app.get('/support', (req, res) => {
  res.sendFile(path.join(__dirname, 'support.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/transfer', (req, res) => {
  res.sendFile(path.join(__dirname, 'transfer.html'));
});

app.get('/suggest', (req, res) => {
  res.sendFile(path.join(__dirname, 'suggest.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/ad', (req, res) => {
  res.sendFile(path.join(__dirname, 'ad.html'));
});

app.get('/blank', (req, res) => {
  res.sendFile(path.join(__dirname, 'blank.html'));
});
app.get('/backgrounds', (req, res) => {
  res.sendFile(path.join(__dirname, 'backgrounds.html'));
});

app.listen(port, () => {
  console.log(`Selenite is running on port ${port}`);
});

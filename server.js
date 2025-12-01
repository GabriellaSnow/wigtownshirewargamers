const express = require('express');
const app = express();
const port = 3000;

// Serve everything in the "public" folder
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Static site available at http://localhost:${port}`);
});

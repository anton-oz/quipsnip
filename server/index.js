const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3001;

/* 
*** Uncomment when finished with front end PWA setup ***

    app.use(express.static("../client/dist"));
    
*/

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  res.status(500).json({ error: "still gotta set up graphql with mongodb" });
});

app.listen(PORT, () => {
  console.log(`server running @ http://localhost:${PORT}`);
});

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const root = require("./resolve");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/graphql");
});

const { buildSchema } = require("graphql");

const schema = buildSchema(
  `
    type user{
    id:ID,
    name:String,
    email:String
    }

    type Query{
    logIn(email:String!,password:String!):user
    }

    type Mutation{
        signUp(name:String!,email:String!,password:String!):String
    }
    `
);

module.exports = schema;

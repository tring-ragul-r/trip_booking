const { buildSchema } = require("graphql");

const schema = buildSchema(
  `
    type user{
    id:ID,
    name:String,
    email:String
    }
    type package{
    id:Int,
    location:String,
    image:String
    }

    type Query{
    signIn(email:String!,password:String!):user
    bestPackage:[package]
    visaFree:[package]
    internationalTrip:[package]
    }
    

    type Mutation{
        signUp(name:String!,email:String!,password:String!):String
    }
    `
);

module.exports = schema;

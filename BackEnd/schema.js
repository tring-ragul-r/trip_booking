const { buildSchema } = require("graphql");

const schema = buildSchema(
  `
    type user{
    id:ID,
    name:String,
    email:String
    }
    type card{
    id:Int,
    location:String,
    image:String
    }
    type packageLocation{
    location:String,
    cover_img:String,
    quote:String
    }
    type package{
    package_img:String,
    title:String,
    days:String,
    description:String,
    price:Float,
    location:String
    }

    type Query{
    signIn(email:String!,password:String!):user
    bestPackage:[card]
    visaFree:[card]
    internationalTrip:[card]
    packageByLocation(location:String!):packageLocation
    packageByLocationId(location:String!):[package]
    }
    

    type Mutation{
        signUp(name:String!,email:String!,password:String!):String
    }
    `
);

module.exports = schema;

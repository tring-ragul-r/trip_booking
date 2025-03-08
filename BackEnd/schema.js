const { buildSchema } = require("graphql");
const {userSchema} = require('./schema/user')
const cardSchema = require('./schema/card')
const packageLocationSchema = require('./schema/packageLocation')
const package = require('./schema/package')
// console.log('userSchema',userSchema)
// console.log(cardSchema)
// console.log(packageLocationSchema);


const schema = buildSchema(
  `

    ${userSchema}
    
    ${cardSchema}
    
    ${packageLocationSchema}

    ${package}

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

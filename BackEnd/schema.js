const { buildSchema } = require("graphql");
const {userSchema} = require('./schema/user')
const cardSchema = require('./schema/card')
const packageLocationSchema = require('./schema/packageLocation')
const package = require('./schema/package')
const bookingSchema = require('./schema/booking')



const schema = buildSchema(
  `

   type user{
    ${userSchema}
    }
    type card{
    ${cardSchema}
    }   
    type packageLocation{
    ${packageLocationSchema}
    }
    type package{
    ${package}
    }
    type Booking {
  ${bookingSchema}
}
    

    type Query{
    signIn(email:String!,password:String!):user
    bestPackage:[card]
    visaFree:[card]
    internationalTrip:[card]
    packageByLocation(location:String!):packageLocation
    packageByLocationId(location:String!):[package]
    getBookingByUser(userId: Int!): [Booking]
    }
    

    type Mutation{
        signUp(name:String!,email:String!,password:String!):String
        insertBooking(packageid:Int!,booking_date:String!,count:Int!,total_price:Int!,userid:Int!):String
    }
    `
);

module.exports = schema;

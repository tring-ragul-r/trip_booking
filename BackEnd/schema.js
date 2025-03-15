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
      getUserDataById(id:Int!):user
      bestPackage:[card]
      visaFree:[card]
      internationalTrip:[card]
      packageByLocation(location:String!):packageLocation
      packageByLocationId(location:String!):[package]
      allPackages:[package]
      getBookingByUser(userId: Int!): [Booking]
      getPackagesByMaxPrice:[package]
    }
    

    type Mutation{
        signUp(name:String!,email:String!,password:String!,phonenumber:String!):String
        insertBooking(packageid:Int!,booking_date:String!,count:Int!,total_price:Int!,userid:Int!,email:String!):String
        deletePackageByPackageId(packageid:Int!):String
    }
    `
);

module.exports = schema;

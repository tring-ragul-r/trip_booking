const connection = require("./dbConnect.js");
const bcrypt = require('bcrypt');


const root = {
    signUp: async ({ name, email, password }) => {
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const res = await connection.query(
            "INSERT INTO userdata (name, email, password) VALUES ($1, $2, $3) RETURNING id",
            [name, email, hashedPassword]
          );
          if (res.rowCount > 0) {
            return "User signed up successfully!";
          } else {
            throw new Error("Failed to sign up user");
          }
        } catch (err) {
          console.error("Error in signUp resolver:", err.message);
          throw new Error(err.message);
        }
      },
      
  };
  module.exports = root;
  
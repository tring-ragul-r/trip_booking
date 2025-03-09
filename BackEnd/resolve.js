const connection = require("./dbConnect.js");
const bcrypt = require("bcrypt");

const root = {
  signUp: async ({ name, email, password }) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const res = await connection.query(
        "INSERT INTO userdata (name, email, password) VALUES ($1, $2, $3) RETURNING id",
        [name, email, hashedPassword]
      );
      console.log(res.rows);

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
  signIn: async ({ email, password }) => {
    try {
      const result = await connection.query(
        "select id,name,email,password from userdata where email = $1",
        [email]
      );
      if (result.rows.length === 0) {
        throw new Error("user not found");
      }
      const data = result.rows[0];
      const match = await bcrypt.compare(password, data.password);
      if (!match) {
        throw new Error("Invalid password");
      }
      return data;
    } catch (err) {
      console.error(err.message);
      throw new Error(err.message || "Login failed");
    }
  },
  bestPackage: async () => {
    try {
      const response = await connection.query(
        "select id,location,image from best_package"
      );
      if (response.rows.length == 0) {
        throw new Error("Not found");
      }
      return response.rows;
    } catch (err) {}
  },
  visaFree: async () => {
    try {
      const response = await connection.query(
        "select id,location,image from visa_free"
      );
      if (response.rows.length == 0) {
        throw new Error("Not found");
      }
      return response.rows;
    } catch (err) {}
  },
  internationalTrip: async () => {
    try {
      const response = await connection.query(
        "select id,location,image from international_trip"
      );
      if (response.rows.length == 0) {
        throw new Error("Not found");
      }
      return response.rows;
    } catch (err) {}
  },
  packageByLocation: async ({ location }) => {
    try {
      const response = await connection.query(
        "select location,cover_img,quote from location_table where location=$1",
        [location]
      );
      if (response.rows.length == 0) {
        throw new Error("Not found");
      }
      return response.rows[0];
    } catch (err) {}
  },
  packageByLocationId: async ({location}) => {
    try {
      const response = await connection.query(
        "select packageid,package_img,title,days,description,price,location from packages where location=$1",
        [location]
      );
      if (response.rows.length == 0) {
        throw new Error("Not found");
      }
      return response.rows;
    } catch (err) {}
  },
  insertBooking: async ({ packageid, booking_date, count, total_price, userid }) => {
    try {
      const query = `
        INSERT INTO bookPackage(packageId, booking_date, count, total_price, userId)
        VALUES ($1, $2, $3, $4, $5)
      `;
      const values = [packageid, booking_date, count, total_price, userid];
      const result = await connection.query(query, values);
      if (result.rowCount > 0) {
        return "Booking inserted successfully!";
      } else {
        throw new Error("Booking insertion failed");
      }
    } catch (err) {
      console.error("Error in insertBooking resolver:", err.message);
      throw new Error(err.message);
    }
  },
  getBookingByUser: async ({ userId }) => {
    try {
      const query = `
        SELECT 
          bp.packageid, 
          bp.booking_date, 
          bp.count, 
          bp.total_price, 
          bp.userid,
          p.package_img, 
          p.title, 
          p.days, 
          p.description, 
          p.price, 
          p.location
        FROM bookPackage bp
        JOIN packages p ON bp.packageid = p.packageid
        WHERE bp.userid = $1
      `;
      const result = await connection.query(query, [userId]);
      console.log(result.rows)
      return result.rows;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw new Error("Could not fetch bookings");
    }
  },

};
module.exports = root;

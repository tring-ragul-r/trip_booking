const connection = require("./dbConnect.js");
const bcrypt = require("bcrypt");
const sendBookingEmail = require("./Mail/mail.js");

const root = {
  signUp: async ({ name, email, password, phonenumber }) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const res = await connection.query(
        "INSERT INTO userdata (name, email, password,phonenumber) VALUES ($1, $2, $3, $4) RETURNING id",
        [name, email, hashedPassword, phonenumber]
      );

      if (res.rowCount > 0) {
        return "User signed up successfully!";
      } else {
        return "userAlreadyExits";
      }
    } catch (err) {
      return "userAlreadyExits";
    }
  },
  signIn: async ({ email, password }) => {
    try {
      const result = await connection.query(
        "SELECT id, name, email, password FROM userdata WHERE email = $1",
        [email]
      );

      if (result.rows.length === 0) {
        throw new Error("user not found");
      }

      const user = result.rows[0];
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new Error("Invalid password");
      }
      return user;
    } catch (err) {
      throw new Error(err.message || "Login failed");
    }
  },
  getUserDataById: async ({ id }) => {
    try {
      const result = await connection.query(
        "SELECT name, email, phonenumber FROM userdata WHERE id = $1",
        [id]
      );
      if (result.rows.length === 0) {
        throw new Error("user not found");
      }
      const user = result.rows[0];
      return user;
    } catch (err) {}
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
  packageByLocationId: async ({ location }) => {
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
  allPackages: async () => {
    try {
      const response = await connection.query(
        "select packageid,package_img,title,days,description,price,location from packages"
      );
      if (response.rows.length == 0) {
        throw new Error("Packages Not found");
      }
      return response.rows;
    } catch (err) {}
  },
  insertBooking: async ({
    packageid,
    booking_date,
    count,
    total_price,
    userid,
    email,
  }) => {
    try {
      const query = `
        INSERT INTO bookPackage(packageId, booking_date, count, total_price, userId)
        VALUES ($1, $2, $3, $4, $5)
      `;
      const values = [packageid, booking_date, count, total_price, userid];
      const result = await connection.query(query, values);
      if (result.rowCount > 0) {
        console.log(email);
        await sendBookingEmail(email, booking_date, count, total_price);

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
        select 
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
        from bookPackage bp
        join packages p ON bp.packageid = p.packageid
        where bp.userid = $1
      `;
      const result = await connection.query(query, [userId]);
      if (result.rowCount > 0) {
        return result.rows;
      } else {
        throw new Error("User Booking is not Found");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw new Error("Could not fetch bookings");
    }
  },
  getPackagesByMaxPrice: async () => {
    try {
      const query = `
      SELECT p.* FROM packages p WHERE p.price = (SELECT MAX(p2.price) FROM packages p2 WHERE p2.location = p.location);
      `;
      const result = await connection.query(query);
      if (result.rowCount > 0) {
        return result.rows;
      } else {
        return new Error("packages not Found !");
      }
    } catch (err) {}
  },
  deletePackageByPackageId: async ({ packageid }) => {
    try {
      const result = await connection.query(
        " delete from bookpackage where packageid = $1",
        [packageid]
      );
      if (result.rowCount > 0) {
        return "Booking deleted successfully!";
      } else {
        return "No booking found with the given package ID.";
      }
    } catch (err) {}
  },
  updateProfileById : async ({email,phonenumber,id})=>{
    try {
      const result = await connection.query(
        "UPDATE userdata SET email = $1, phonenumber = $2 WHERE id = $3",
        [email, phonenumber, id]
      );
      if (result.rowCount > 0) {
        return "Profile updated successfully";
      } else {
        return "Email already exist";
      }
    }catch(err){
      console.error("Error updating profile:", err.message);
    throw new Error("Failed to update profile.");
    }
  },
};
module.exports = root;

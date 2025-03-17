const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: "ragulradhakrishnan59@gmail.com",
    pass: "ftwt vfpr pakv yxqz",
  },
});
const sendBookingEmail = async (email,booking_date,count,total_price) => {
  const emailDetails = {
    from: "ragulradhakrishnan59@gmail.com",
    to: email,
    subject: 'Package Booked Successfully',
    html: `
      <div padding: 20px; text-align: center;">
        <h2 style="color: #007bff;">package Booked by TringTrip </h2>
        <div style="margin-top: 20px; font-size: 14px; color: #000;">
        <p><b>Travel Date: </b>${booking_date}</p>
        <p><b>No. of person: </b>${count}</p>
        <p><b>Total Price: </b>${total_price}</p>
        
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(emailDetails);
  } catch (error) {
  }
};

module.exports = sendBookingEmail;
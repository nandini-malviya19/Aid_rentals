const nodemailer = require('nodemailer')


const sendMail = async (req, res) => {
  console.log(req.body.data.phoneNumber);
  // res.send(req.body.data);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
  try {

    const htmlContent = `
  <h1>Item Details you asked for:</h1>
  <p><strong>Name:</strong> ${req.body.data.name}</p>
  <p><strong>Address:</strong> ${req.body.data.address}</p>
  <p><strong>Email:</strong> ${req.body.data.email}</p>
  <p><strong>Phone Number:</strong> ${req.body.data.phoneNumber}</p>

`;

    const info = await transporter.sendMail({
      from: "sahayta@sr.edu.in",
      to: "20bcs060@ietdavv.edu.in",
      subject: "Mail check",
      text: "no reply",
      html: htmlContent
    });


    // const info = await transporter.sendMail({
    //   from: "sahayta@sr.edu.in",
    //   to: "20bcs060@ietdavv.edu.in",
    //   subject: "Mail check",
    //   text: "no reply",
    //   html: req.body.data.phoneNumber
    // });
    return info;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send email');
  }
}

module.exports = sendMail
import nodemailer from "nodemailer";

export const sendMail = async (eventName, user_name, user_email) => {
  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "event.buddy.in@gmail.com",
      pass: "iijaedtofktlcasu",
    },
  });

  let details = {
    from: { name: "Event Buddy", address: "event.buddy.in@gmail.com" },
    to: user_email,
    subject: " 🌟 Exciting News! Your Event Registration is Confirmed! 🌟.",
    text: `Dear ${user_name},

Congratulations! 🎉 You're officially registered for the spectacular ${eventName}! Get ready for an unforgettable experience .!
    
Thanks & Regards,
EventBuddy Team`,
  };

  console.log(details);
  try {
    const res = await mailTransporter.sendMail(details);
    console.log("cool");
  } catch (error) {
    console.log("not cool", error);
  }
};

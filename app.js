const nodeMailer = require('nodemailer');
const readline = require('readline');
// Function to send an email
async function sendEmail(recipient, subject, htmlBody) {
    // Create a Nodemailer transporter
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "kemelov567@gmail.com", // Replace with your Gmail email address
            pass: "" // Replace with your Gmail password or app-specific password
        }
    });

    // Define email options
    const mailOptions = {
        from: "OpenJavaScript <kemelov567@gmail.com>",
        to: recipient,
        subject: subject,
        html: htmlBody
    };

    try {
        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.messageId);
    } catch (error) {
        console.error("Error occurred while sending email:", error);
    }
}

// Test sending an email
function promptUser(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

// Main function to gather email details and send the email
async function main() {
    const recipient = await promptUser("Enter recipient's email address: ");
    const subject = await promptUser("Enter email subject: ");
    const message = await promptUser("Enter email message: ");

    // Call the sendEmail function
    await sendEmail(recipient, subject, message);
}

// Call the main function to start the email sending process
main();

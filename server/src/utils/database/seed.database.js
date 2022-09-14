require("dotenv").config("../../../.env");
const { exec } = require("child_process");

// ==========================================================

console.log("process", process.env.DB_NAME, process.env.DB_PASSWORD);

const command = `mysql -u ${process.env.DB_USER}  --password=${process.env.DB_PASSWORD} ${process.env.DB_NAME} < ./src/utils/database/testData.sql `;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});

// ==========================================================

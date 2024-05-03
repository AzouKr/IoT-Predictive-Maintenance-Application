const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("app.db");
const bcrypt = require("bcrypt");
const logger = require("./logger");

// these function call them on the main server file (index.js) they will Initialize the database
function InitializeDB() {
  db.serialize(() => {
    db.get(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
      (err, row) => {
        if (err) {
          // Handle error
          console.error("Error checking for table:", err.message);
          return;
        }

        if (!row) {
          db.run(
            `
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            password TEXT,
            role TEXT,
            age Number,
            phone TEXT,
            email TEXT,
            city TEXT
          )
        `,
            (err) => {
              if (err) {
                // Handle error
                console.error("Error creating table:", err.message);
                return;
              }
              const users = [
                {
                  name: "KERIM Abdelmouiz",
                  password: "kerimazou",
                  role: "admin",
                  age: 23,
                  phone: "+213774736674",
                  email: "abdelmouizkerim@gmail.com",
                  city: "El Bayadh",
                },
              ];

              for (let index = 0; index < users.length; index++) {
                bcrypt.hash(users[index].password, 10, (err, hash) => {
                  if (err) {
                    // Handle error
                    console.error("Error hashing password:", err.message);
                    return;
                  }

                  // Inserting the admin user
                  const insertUser = db.prepare(`
              INSERT INTO users (name,
                password,
                role,
                age,
                phone,
                email,
                city)
              VALUES (?, ?, ?, ?, ?, ?, ?)
            `);

                  insertUser.run(
                    users[index].name,
                    hash,
                    users[index].role,
                    users[index].age,
                    users[index].phone,
                    users[index].email,
                    users[index].city
                  );

                  insertUser.finalize();
                });
              }
            }
          );
          db.run(
            `
          CREATE TABLE IF NOT EXISTS dataset (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT
          )
        `
          );
        }
      }
    );
  });
}

// Function to register a user
function registerUser(name, password, role, age, phone, email, city) {
  return new Promise(function (resolve, reject) {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        logger.error("Error hashing password:", err.message);
        reject({ bool: false, error: err.message });
        return;
      }
      db.run(
        "INSERT INTO users (name, password, role, age, phone, email, city) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, password, role, age, phone, email, city],
        function (err) {
          if (err) {
            logger.error("Error registering user:", err.message);
            reject({ bool: false, error: err });
            return;
          }
          logger.info("User registered successfully");
          resolve({ bool: true, message: "User registered successfully" });
        }
      );
    });
  });
}

// Function to login
function loginUser(email, password) {
  return new Promise(function (resolve, reject) {
    db.get("SELECT * FROM users WHERE email = ?", [email], function (err, row) {
      if (err) {
        logger.error("Error finding user:", err.message);
        reject({ auth: false, error: err.message });
        return;
      }

      if (!row) {
        logger.info("User not found");
        reject({ auth: false, error: "User not found" });
        return;
      }

      bcrypt.compare(password, row.password, function (err, result) {
        if (err) {
          logger.error("Error comparing passwords:", err.message);
          reject({ auth: false, error: err.message });
          return;
        }

        if (result) {
          logger.info("Login successful");
          resolve({ auth: true, data: row });
        } else {
          logger.info("Incorrect password");
          reject({ auth: false, error: "Incorrect password" });
          return;
        }
      });
    });
  });
}

// Function to display all users
function fetchAllUsers() {
  return new Promise(function (resolve, reject) {
    db.all(
      "SELECT id, name,role,age,phone,email,city FROM users",
      function (error, rows) {
        if (error) {
          logger.error("Error while fetching users");
          reject({ bool: false, error: error.message });
          return;
        } else {
          // console.log(rows);
          logger.info("Successfully fetching users");
          resolve({ bool: true, data: rows });
        }
      }
    );
  });
}

function fetchUserById(id) {
  return new Promise(function (resolve, reject) {
    db.all(
      `SELECT name,role,password,age,phone,email,city FROM users WHERE id = ${id}`,
      function (error, rows) {
        if (error) {
          logger.error("Error while fetching users");
          reject({ bool: false, error: error.message });
          return;
        } else {
          // console.log(rows);
          logger.info("Successfully fetching users");
          resolve({ bool: true, data: rows });
        }
      }
    );
  });
}

// Function to modify a user
function modifyUser(userId, name, password, role, age, phone, email, city) {
  return new Promise(function (resolve, reject) {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        logger.error("Error hashing password:", err.message);
        reject({ bool: false, error: err.message });
        return;
      }
      db.run(
        "UPDATE users SET name = ?, password = ?, role = ?, email = ?, age = ?, city = ?, phone = ? WHERE id = ?",
        [name, hash, role, email, age, city, phone, userId],
        function (err) {
          if (err) {
            logger.error("Error modifying user:", err.message);
            reject({ bool: false, error: err.message });
            return;
          }
          logger.info("User modified successfully");
          resolve({ bool: true, message: "User modified successfully" });
        }
      );
    });
  });
}

// Function to delete a user
function deleteUser(userId) {
  return new Promise(function (resolve, reject) {
    db.run("DELETE FROM users WHERE id = ?", userId, function (err) {
      if (err) {
        logger.error("Error deleting user:", err.message);
        reject({ bool: false, error: err.message });
        return;
      }
      logger.info("User deleted successfully");
      resolve({ bool: true, message: "User deleted successfully" });
    });
  });
}

function saveDataset(name) {
  return new Promise(function (resolve, reject) {
    db.run("INSERT INTO dataset (name) VALUES (?)", [name], function (err) {
      if (err) {
        logger.error("Error saving dataset:", err.message);
        resolve({ bool: false, error: err });
        return;
      }
      logger.info("Dataset saved successfully");
      resolve({ bool: true, message: "Dataset saved successfully" });
    });
  });
}

// Exporting multiple functions
module.exports = {
  InitializeDB,
  registerUser,
  loginUser,
  fetchAllUsers,
  modifyUser,
  deleteUser,
  fetchUserById,
  saveDataset,
};

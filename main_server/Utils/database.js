const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("app.db");
const bcrypt = require("bcrypt");
const logger = require("./logger");
const fs = require("fs");

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
              age INTEGER,
              phone TEXT,
              email TEXT,
              city TEXT,
              availability INTEGER DEFAULT 0 CHECK (availability IN (0, 1)),
              team TEXT DEFAULT 'none',
              active INTEGER DEFAULT 0 CHECK (active IN (0, 1))
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
                  city: "Ouargla",
                  availability: 0,
                  team: "None",
                },
                {
                  name: "KERIM Yahia",
                  password: "kerimyahia1996",
                  role: "analyste",
                  age: 28,
                  phone: "+491624770984",
                  email: "kerimyahia@gmail.com",
                  city: "El Bayadh",
                  availability: 0,
                  team: "None",
                },
                {
                  name: "ARAAR ZINEB",
                  password: "zinebaraar1999",
                  role: "supervisor",
                  age: 25,
                  phone: "+213698282788",
                  email: "zeineb.ara@gmail.com",
                  city: "Montreal",
                  availability: 0,
                  team: "Team 1",
                },
                {
                  name: "KERIM Aridj",
                  password: "kerimaridj",
                  role: "supervisor",
                  age: 19,
                  phone: "+213059345345",
                  email: "aridjkerim@gmail.com",
                  city: "Ouargla",
                  availability: 0,
                  team: "Team 3",
                },
                {
                  name: "HADJ BRAHIM Yasmine",
                  password: "yasmin2003",
                  role: "supervisor",
                  age: 20,
                  phone: "+213754967833",
                  email: "yasmine@gmail.com",
                  city: "Alger",
                  availability: 0,
                  team: "Team 2",
                },
                {
                  name: "HADJ BRAHIM Nour El Houda",
                  password: "houda2001",
                  role: "technicien",
                  age: 22,
                  phone: "+213541485040",
                  email: "hbnourelhouda@gmail.com",
                  city: "Alger",
                  availability: 1,
                  team: "Team 2",
                },
                {
                  name: "AMARA Mohamed",
                  password: "mohamed2020",
                  role: "technicien",
                  age: 28,
                  phone: "+213541485041",
                  email: "amaramed@gmail.com",
                  city: "Oran",
                  availability: 1,
                  team: "Team 2",
                },
                {
                  name: "BENALI Samira",
                  password: "samira2019",
                  role: "technicien",
                  age: 26,
                  phone: "+213541485042",
                  email: "benalisamira@gmail.com",
                  city: "Constantine",
                  availability: 1,
                  team: "Team 2",
                },
                {
                  name: "KACI Rachid",
                  password: "rachid2018",
                  role: "technicien",
                  age: 30,
                  phone: "+213541485043",
                  email: "kacirachid@gmail.com",
                  city: "Annaba",
                  availability: 1,
                  team: "Team 1",
                },
                {
                  name: "SAHLI Fatiha",
                  password: "fatiha2017",
                  role: "technicien",
                  age: 24,
                  phone: "+213541485044",
                  email: "sahlifatiha@gmail.com",
                  city: "Blida",
                  availability: 1,
                  team: "Team 1",
                },
                {
                  name: "MEGHARI Amine",
                  password: "amine2016",
                  role: "technicien",
                  age: 27,
                  phone: "+213541485045",
                  email: "meghariamine@gmail.com",
                  city: "Sétif",
                  availability: 1,
                  team: "Team 1",
                },
                {
                  name: "BOUAZZA Yasmina",
                  password: "yasmina2015",
                  role: "technicien",
                  age: 25,
                  phone: "+213541485046",
                  email: "bouazzayasmina@gmail.com",
                  city: "Tlemcen",
                  availability: 1,
                  team: "Team 3",
                },
                {
                  name: "ZIANI Karim",
                  password: "karim2014",
                  role: "technicien",
                  age: 29,
                  phone: "+213541485047",
                  email: "zianik@gmail.com",
                  city: "Béjaïa",
                  availability: 1,
                  team: "Team 3",
                },
                {
                  name: "BOUCHERIT Ahmed",
                  password: "ahmed2023",
                  role: "technicien",
                  age: 27,
                  phone: "+213541485048",
                  email: "boucheritahmed@gmail.com",
                  city: "Oran",
                  availability: 1,
                  team: "Team 3",
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
                city, team, availability)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);

                  insertUser.run(
                    users[index].name,
                    hash,
                    users[index].role,
                    users[index].age,
                    users[index].phone,
                    users[index].email,
                    users[index].city,
                    users[index].team,
                    users[index].availability
                  );

                  insertUser.finalize();
                });
              }
            }
          );
          // ********************** TEAM TABLE ********************************
          db.run(
            `
          CREATE TABLE IF NOT EXISTS team (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            prod_line INTEGER,
            supervisor TEXT
          )
        `,
            (err) => {
              if (err) {
                // Handle error
                console.error("Error creating table:", err.message);
                return;
              }
              const insertTeam = db.prepare(`
              INSERT INTO team (name, prod_line, supervisor)
              VALUES (?, ?, ?)
            `);
              insertTeam.run("Team 1", "Line 1", "zeineb.ara@gmail.com");
              insertTeam.run("Team 2", "Line 2", "yasmine@gmail.com");
              insertTeam.run("Team 3", "Line 3", "aridjkerim@gmail.com");
              insertTeam.finalize();
            }
          );

          db.run(
            `
          CREATE TABLE IF NOT EXISTS machinealerts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            machine TEXT,
            cause TEXT,
            degree TEXT,
            status TEXT DEFAULT 'waiting' CHECK (status IN ('waiting', 'process', 'done')),
            supervisor TEXT,
            employee TEXT DEFAULT 'none',
            date DATETIME DEFAULT CURRENT_TIMESTAMP,
            rapport TEXT DEFAULT 'none'
          )
        `,
            (err) => {
              if (err) {
                // Handle error
                console.error("Error creating table:", err.message);
                return;
              }
              const data = fs.readFileSync("./alerts.txt", "utf8");
              const lines = data.split("\n");
              const insertAlert = db.prepare(`
          INSERT INTO machinealerts (machine, cause, degree, status, supervisor, employee, date, rapport)
          VALUES (?, ?, ?,?, ?, ?, ?, ?)
        `);
              // Execute each insertAlert statement
              lines.forEach((line) => {
                values = line.substring(1, line.length - 1);
                const parts = values.trim().split('","');
                if (parts.length === 8) {
                  insertAlert.run(
                    parts[0],
                    parts[1],
                    parts[2],
                    parts[3],
                    parts[4],
                    parts[5],
                    parts[6],
                    parts[7]
                  );
                }
              });

              insertAlert.finalize();
            }
          );
          db.run(
            `
          CREATE TABLE IF NOT EXISTS useralerts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT CHECK (type IN ('TEAM', 'TASK', 'PASSWORD')),
            desc TEXT,
            user TEXT,
            date DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `
          );
          db.run(
            `
          CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            user TEXT,
            date TEXT
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
        [name, hash, role, age, phone, email, city],
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

      if (row.active !== 0) {
        logger.info("User is inactive");
        reject({ auth: false, error: "User is inactive" });
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

function updatePassword(email, newPassword) {
  return new Promise(function (resolve, reject) {
    bcrypt.hash(newPassword, 10, function (err, hash) {
      if (err) {
        logger.error("Error hashing new password:", err.message);
        reject({ bool: false, error: err.message });
        return;
      }
      db.run(
        "UPDATE users SET password = ? WHERE email = ?",
        [hash, email],
        function (err) {
          if (err) {
            logger.error("Error updating password:", err.message);
            reject({ bool: false, error: err });
            return;
          }
          logger.info("Password updated successfully for user ID:", email);
          resolve({ bool: true, message: "Password updated successfully" });
        }
      );
    });
  });
}

// Function to display all users
function fetchAllUsers() {
  return new Promise(function (resolve, reject) {
    db.all(
      "SELECT id, name,role,age,phone,email,city,team,active FROM users",
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

// Function to desactivate a user
function desactivateUser(email) {
  console.log(email);
  return new Promise(function (resolve, reject) {
    db.run("UPDATE users SET active = 1 WHERE id = ?", email, function (err) {
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

// Function to activate a user
function activateUser(userId) {
  return new Promise(function (resolve, reject) {
    db.run("UPDATE users SET active = 0 WHERE id = ?", userId, function (err) {
      if (err) {
        logger.error("Error activating user:", err.message);
        reject({ bool: false, error: err.message });
        return;
      }
      logger.info("User activated successfully");
      resolve({ bool: true, message: "User deleted successfully" });
    });
  });
}

// Function to create a team
function createTeam(name, prodLine, email) {
  return new Promise(function (resolve, reject) {
    db.run(
      "INSERT INTO team (name, prod_line, supervisor) VALUES (?, ?, ?)",
      [name, prodLine, email],
      function (err) {
        if (err) {
          logger.error("Error inserting team:", err.message);
          reject({ bool: false, error: err.message });
          return;
        }
        logger.info("Team inserted successfully");
        resolve({ bool: true, message: "Team inserted successfully" });
      }
    );
  });
}

// Function to add team member
function addTeamMember(teamName, userEmail) {
  return new Promise(function (resolve, reject) {
    db.run(
      "UPDATE users SET team = ?, availability = 1  WHERE email = ?",
      [teamName, userEmail],
      function (err) {
        if (err) {
          logger.error("Error adding team member:", err.message);
          reject({ bool: false, error: err.message });
          return;
        }
        logger.info("Team member added successfully");
        resolve({ bool: true, message: "Team member added successfully" });
      }
    );
  });
}

// Function to display all available users
function fetchTeams() {
  return new Promise(function (resolve, reject) {
    db.all("SELECT * FROM team", function (error, rows) {
      if (error) {
        logger.error("Error while fetching teams");
        reject({ bool: false, error: error.message });
        return;
      } else {
        // console.log(rows);
        logger.info("Successfully fetching teams");
        resolve({ bool: true, data: rows });
      }
    });
  });
}

// Function to fetch team by supervisor
function fetchTeamBySupervisor(supervisor) {
  return new Promise(function (resolve, reject) {
    db.all(
      "SELECT * FROM team WHERE supervisor = ?",
      [supervisor],
      function (error, rows) {
        if (error) {
          logger.error("Error while fetching team");
          reject({ bool: false, error: error.message });
          return;
        } else {
          // console.log(rows);
          // logger.info("Successfully fetching team");
          resolve({ bool: true, data: rows[0] });
        }
      }
    );
  });
}

// Function to display all users in a team
function fetchTeamUsers(team) {
  return new Promise(function (resolve, reject) {
    db.all(
      "SELECT id, name, email FROM users WHERE team = ? AND role != 'supervisor'",
      [team],
      function (error, rows) {
        if (error) {
          logger.error("Error while fetching team users: " + error.message);
          reject({ bool: false, error: error.message });
          return;
        } else {
          // console.log(rows);
          // logger.info("Successfully fetching team users");
          resolve({ bool: true, data: rows });
        }
      }
    );
  });
}

// Function to display all team list
function fetchTeamsList(teams) {
  return Promise.all(
    teams.map((team) => {
      return new Promise((resolve, reject) => {
        db.all(
          "SELECT id, name, email, role FROM users WHERE team = ?",
          [team],
          function (error, rows) {
            if (error) {
              logger.error(
                "Error while fetching team users for team " +
                  team +
                  ": " +
                  error.message
              );
              reject({ bool: false, error: error.message });
            } else {
              // logger.info("Successfully fetching team users for team " + team);
              resolve({ team, users: rows });
            }
          }
        );
      });
    })
  )
    .then((results) => ({ bool: true, data: results }))
    .catch((error) => ({ bool: false, error: error.message }));
}

// Function to delete team member
function deleteTeamMember(userEmail) {
  return new Promise(function (resolve, reject) {
    db.run(
      "UPDATE users SET team = 'none', availability = 0  WHERE email = ?",
      userEmail,
      function (err) {
        if (err) {
          logger.error("Error deleting team member:", err.message);
          reject({ bool: false, error: err.message });
          return;
        }
        logger.info("Team member deleted successfully");
        resolve({ bool: true, message: "Team member deleted successfully" });
      }
    );
  });
}

// Function to display all available users
function fetchAvailableUsers() {
  return new Promise(function (resolve, reject) {
    db.all(
      "SELECT name, email FROM users WHERE role = 'technicien' AND availability = 0 AND active = 0",
      function (error, rows) {
        if (error) {
          logger.error("Error while fetching available users");
          reject({ bool: false, error: error.message });
          return;
        } else {
          // console.log(rows);
          logger.info("Successfully fetching available users");
          resolve({ bool: true, data: rows });
        }
      }
    );
  });
}

// Function to create a machine alert
function createMachineAlert(machine, cause, degree, email) {
  return new Promise(function (resolve, reject) {
    db.run(
      "INSERT INTO machinealerts (machine, cause, degree, supervisor) VALUES (?, ?, ?, ?)",
      [machine, cause, degree, email],
      function (err) {
        if (err) {
          logger.error("Error inserting machine alert:", err.message);
          reject({ bool: false, error: err.message });
          return;
        }
        logger.info("Machine alert inserted successfully");
        resolve({ bool: true, message: "Machine alert inserted successfully" });
      }
    );
  });
}

// Fetch all machine alerts
function fetchMachineAlerts(role, email) {
  return new Promise(function (resolve, reject) {
    if (role === "supervisor") {
      db.all("SELECT * FROM machinealerts", function (error, rows) {
        if (error) {
          logger.error("Error while fetching machinealerts");
          reject({ bool: false, error: error.message });
          return;
        } else {
          // console.log(rows);
          // logger.info("Successfully fetching machinealerts");
          resolve({ bool: true, data: rows });
        }
      });
    } else {
      db.all(
        "SELECT * FROM machinealerts WHERE employee = ?",
        [email],
        function (error, rows) {
          if (error) {
            logger.error("Error while fetching machinealerts");
            reject({ bool: false, error: error.message });
            return;
          } else {
            // console.log(rows);
            // logger.info("Successfully fetching machinealerts");
            resolve({ bool: true, data: rows });
          }
        }
      );
    }
  });
}

// Fetch all machine alerts by id
function fetchMachineAlertsById(id) {
  return new Promise(function (resolve, reject) {
    db.all(
      "SELECT * FROM machinealerts WHERE machine = ?",
      [id],
      function (error, rows) {
        if (error) {
          logger.error("Error while fetching machinealerts");
          reject({ bool: false, error: error.message });
          return;
        } else {
          // console.log(rows);
          // logger.info("Successfully fetching machinealerts");
          resolve({ bool: true, data: rows.reverse() });
        }
      }
    );
  });
}

// Fetch all machine alerts
function fetchMachineAlertsByUser(email) {
  return new Promise(function (resolve, reject) {
    db.all(
      "SELECT * FROM machinealerts WHERE employee = ?",
      [email],
      function (error, rows) {
        if (error) {
          logger.error("Error while fetching machinealerts");
          reject({ bool: false, error: error.message });
          return;
        } else {
          // console.log(rows);
          logger.info("Successfully fetching machinealerts");
          resolve({ bool: true, data: rows });
        }
      }
    );
  });
}

// Update machine alert status
function updateMachineAlerts(machine, rapport) {
  return new Promise(function (resolve, reject) {
    db.all(
      "UPDATE machinealerts SET status = 'done', rapport = ? WHERE id = ?",
      [rapport, machine],
      function (error, rows) {
        if (error) {
          logger.error("Error while updating machinealerts");
          reject({ bool: false, error: error.message });
          return;
        } else {
          // console.log(rows);
          logger.info("Successfully updating machinealerts");
          resolve({ bool: true, data: rows });
        }
      }
    );
  });
}

// Assign machine alert to an employee
function assignMachineAlerts(employee, machine) {
  return new Promise(function (resolve, reject) {
    db.all(
      "UPDATE machinealerts SET status = 'process', employee = ? WHERE id = ?",
      [employee, machine],
      function (error, rows) {
        if (error) {
          logger.error("Error while assigning machinealerts");
          reject({ bool: false, error: error.message });
          return;
        } else {
          // console.log(rows);
          logger.info("Successfully assigning machinealerts");
          resolve({ bool: true, data: rows });
        }
      }
    );
  });
}

// Fetch the supervisor of that prodLine
function fetchSupervisor(prodLine) {
  return new Promise(function (resolve, reject) {
    db.all(
      "SELECT supervisor FROM team WHERE prod_line = ?",
      prodLine,
      function (error, rows) {
        if (error) {
          logger.error("Error while fetching supervisor users");
          reject({ bool: false, error: error.message });
          return;
        } else {
          // console.log(rows);
          logger.info("Successfully fetching supervisor");
          resolve({ bool: true, data: rows });
        }
      }
    );
  });
}

// Function to create a machine alert
function createUserAlert(type, desc, user) {
  return new Promise(function (resolve, reject) {
    db.run(
      "INSERT INTO useralerts (type, desc, user) VALUES (?, ?, ?)",
      [type, desc, user],
      function (err) {
        if (err) {
          logger.error("Error inserting user alert:", err.message);
          reject({ bool: false, error: err.message });
          return;
        }
        logger.info("User alert inserted successfully");
        resolve({ bool: true, message: "Machine alert inserted successfully" });
      }
    );
  });
}

// Fetch all machine alerts
function fetchUserAlerts(user) {
  return new Promise(function (resolve, reject) {
    db.all(
      "SELECT * FROM useralerts WHERE user = ?",
      [user],
      function (error, rows) {
        if (error) {
          logger.error("Error while fetching machinealerts");
          reject({ bool: false, error: error.message });
          return;
        } else {
          resolve({ bool: true, data: rows });
        }
      }
    );
  });
}

// Function to add event
function addEvent(title, user, date) {
  return new Promise(function (resolve, reject) {
    db.run(
      "INSERT INTO events (title, user, date) VALUES (?, ?, ?)",
      [title, user, date],
      function (err) {
        if (err) {
          logger.error("Error inserting event:", err.message);
          reject({ bool: false, error: err.message });
          return;
        }
        logger.info("Event inserted successfully");
        resolve({ bool: true, message: "Event inserted successfully" });
      }
    );
  });
}

// Function to add event
function fetchEvents(user) {
  return new Promise(function (resolve, reject) {
    db.all(
      "SELECT * FROM events WHERE user = ?",
      [user],
      function (error, rows) {
        if (error) {
          logger.error("Error while fetching events");
          reject({ bool: false, error: error.message });
          return;
        } else {
          // console.log(rows);
          logger.info("Successfully fetching events");
          resolve({ bool: true, data: rows });
        }
      }
    );
  });
}

// Function to delete event
function deleteEvent(id) {
  return new Promise(function (resolve, reject) {
    db.run("DELETE FROM events WHERE id = ?", [id], function (err) {
      if (err) {
        logger.error("Error deleting event:", err.message);
        reject({ bool: false, error: err.message });
        return;
      }
      logger.info("Event deleted successfully");
      resolve({ bool: true, message: "Event deleted successfully" });
    });
  });
}

// Exporting multiple functions
module.exports = {
  InitializeDB,
  registerUser,
  loginUser,
  updatePassword,
  fetchAllUsers,
  modifyUser,
  desactivateUser,
  fetchUserById,
  activateUser,
  createTeam,
  fetchTeams,
  fetchTeamBySupervisor,
  fetchTeamUsers,
  fetchTeamsList,
  addTeamMember,
  deleteTeamMember,
  fetchAvailableUsers,
  createMachineAlert,
  fetchSupervisor,
  fetchMachineAlerts,
  fetchMachineAlertsById,
  fetchMachineAlertsByUser,
  updateMachineAlerts,
  assignMachineAlerts,
  createUserAlert,
  fetchUserAlerts,
  addEvent,
  fetchEvents,
  deleteEvent,
};

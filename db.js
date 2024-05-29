const { QuickDB , MySQLDriver } = require("quick.db");

async function getTable(tableName) {
  try {
    const mysqlDriver = new MySQLDriver({
      host: "",
      user: "",
      password: "",
      database: "",
    });

    await mysqlDriver.connect(); // connect to the database **this is important**

    const db = new QuickDB({ driver: mysqlDriver });

    // Return the table object
    return db.table(tableName);
  } catch (error) {
    console.error("Error getting table:", error);
    throw error;
  }
}


module.exports = { getTable };

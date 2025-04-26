import express from 'express';
import cors from 'cors';
import initSqlJs from 'sql.js';

const app = express();
const port = process.env.PORT || 8080;


// Initialize database
let db;

// Create and populate database
const initializeDatabase = async () => {
  const SQL = await initSqlJs();
  db = new SQL.Database();
  
  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER,
      email TEXT,
      address TEXT
    )
  `);

  // Check if table is empty
  const result = db.exec('SELECT COUNT(*) as count FROM users');
  const count = result[0].values[0][0];

  if (count === 0) {
    // Insert sample data
    const sampleUsers = [
      ['John Doe', 30, 'john@example.com', '123 Main St, City'],
      ['Jane Smith', 25, 'jane@example.com', '456 Oak Ave, Town'],
      ['Bob Johnson', 35, 'bob@example.com', '789 Pine Rd, Village']
    ];
    
    const stmt = db.prepare('INSERT INTO users (name, age, email, address) VALUES (?, ?, ?, ?)');
    sampleUsers.forEach(user => stmt.run(user));
    stmt.free();
  }
};

// Initialize database before starting server
initializeDatabase().then(() => {
  // Configure CORS for development
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
    optionsSuccessStatus: 200
  }));
  
  app.use(express.json());

  // GET all users
  app.get('/api/users', (req, res) => {
    try {
      const result = db.exec('SELECT * FROM users');
      if (!result || result.length === 0) {
        return res.json([]);
      }
      const users = result[0].values.map(row => ({
        id: row[0],
        name: row[1],
        age: row[2],
        email: row[3],
        address: row[4]
      }));
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  // GET user by ID
  app.get('/api/users/:id', (req, res) => {
    try {
      const result = db.exec('SELECT * FROM users WHERE id = ?', [req.params.id]);
      if (!result || result.length === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      const row = result[0].values[0];
      const user = {
        id: row[0],
        name: row[1],
        age: row[2],
        email: row[3],
        address: row[4]
      };
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
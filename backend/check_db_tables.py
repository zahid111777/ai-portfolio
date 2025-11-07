import sqlite3

conn = sqlite3.connect('portfolio.db')
cursor = conn.cursor()
cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = [row[0] for row in cursor.fetchall()]
print("Tables in database:", tables)

if 'users' in tables:
    cursor.execute("SELECT id, username FROM users")
    users = cursor.fetchall()
    print("Existing users:", users)

conn.close()

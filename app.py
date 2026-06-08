from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Connect to MySQL with error handling
try:
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",
        database="skillswap_db"
    )
    cursor = db.cursor(dictionary=True)
    print("✅ Successfully connected to MySQL!")
except mysql.connector.Error as err:
    print(f"❌ MySQL Connection Error: {err}")
    cursor = None

@app.route('/api/skills', methods=['GET'])
def get_skills():
    if cursor is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor.execute("SELECT * FROM skills")
    skills = cursor.fetchall()
    return jsonify(skills)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)

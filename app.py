from flask import Flask, jsonify
import random
import string
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
#Funcioón para generar las cadenas aleatorias
def generate_random_string(length):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

#Función para la generación de emails.
def generate_random_email():
    domains = ["example.com", "test.com", "demo.com", "sample.org", "example.net"]
    domain = random.choice(domains)
    return generate_random_string(5) + "@" + domain

def generate_random_password():
    length = random.randint(6, 9)
    return generate_random_string(length)

@app.route('/generate-users/<int:num_users>', methods=['GET'])
def generate_users(num_users):
    users = []
    for _ in range(num_users):
        user_data = {
            "name": generate_random_string(10),
            "email": generate_random_email(),
            "password": generate_random_password()
        }
        users.append(user_data)
    return jsonify(users)

if __name__ == '__main__':
    app.run(debug=True)
import os
import logging
from flask import Flask, render_template, send_from_directory
from flask_cors import CORS
from werkzeug.middleware.proxy_fix import ProxyFix

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Create the app
app = Flask(__name__, static_folder='static', template_folder='static')
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key-change-in-production")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# Enable CORS for React development
CORS(app, origins=['http://localhost:3000', 'http://localhost:5000'])

# Import and register API routes
from api_routes import api_bp
app.register_blueprint(api_bp, url_prefix='/api')

@app.route('/')
def index():
    """Serve the main React application"""
    return send_from_directory('static', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    """Serve static files"""
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

#!/usr/bin/env python3
"""
Simple startup script for the portfolio application.
Runs the Flask backend server.
"""

import os
import subprocess
import sys
import time
import logging

def main():
    """Run the Flask application"""
    try:
        print("🚀 Starting Portfolio Application...")
        print("=" * 50)
        
        # Set environment variables if not already set
        if not os.environ.get("SESSION_SECRET"):
            os.environ["SESSION_SECRET"] = "dev-secret-key-change-in-production"
            
        # Start Flask application
        print("📡 Starting Flask backend on http://localhost:5000")
        print("🎨 Frontend will be served from /static/")
        print("-" * 50)
        
        # Import and run the Flask app
        from app import app
        app.run(host='0.0.0.0', port=5000, debug=True)
        
    except KeyboardInterrupt:
        print("\n\n🛑 Application stopped by user")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ Error starting application: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()

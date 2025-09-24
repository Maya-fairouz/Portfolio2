import logging
from flask import Blueprint, jsonify, request
from datetime import datetime
import uuid
from models import MOCK_PROJECTS, MOCK_SKILLS, ContactSubmission
from firebase_mock import FirebaseMock

# Create blueprint for API routes
api_bp = Blueprint('api', __name__)

# Initialize mock Firebase
firebase_mock = FirebaseMock()

@api_bp.route('/projects', methods=['GET'])
def get_projects():
    """Get all projects or featured projects only"""
    try:
        featured_only = request.args.get('featured', 'false').lower() == 'true'
        
        if featured_only:
            projects = [p for p in MOCK_PROJECTS if p.featured]
        else:
            projects = MOCK_PROJECTS
            
        # Convert dataclass objects to dictionaries
        projects_dict = []
        for project in projects:
            projects_dict.append({
                'id': project.id,
                'title': project.title,
                'description': project.description,
                'technologies': project.technologies,
                'image_url': project.image_url,
                'project_url': project.project_url,
                'github_url': project.github_url,
                'featured': project.featured
            })
            
        return jsonify({
            'success': True,
            'data': projects_dict
        })
    except Exception as e:
        logging.error(f"Error fetching projects: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch projects'
        }), 500

@api_bp.route('/projects/<project_id>', methods=['GET'])
def get_project(project_id):
    """Get a specific project by ID"""
    try:
        project = next((p for p in MOCK_PROJECTS if p.id == project_id), None)
        
        if not project:
            return jsonify({
                'success': False,
                'error': 'Project not found'
            }), 404
            
        project_dict = {
            'id': project.id,
            'title': project.title,
            'description': project.description,
            'technologies': project.technologies,
            'image_url': project.image_url,
            'project_url': project.project_url,
            'github_url': project.github_url,
            'featured': project.featured
        }
        
        return jsonify({
            'success': True,
            'data': project_dict
        })
    except Exception as e:
        logging.error(f"Error fetching project {project_id}: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch project'
        }), 500

@api_bp.route('/skills', methods=['GET'])
def get_skills():
    """Get all skills organized by category"""
    try:
        return jsonify({
            'success': True,
            'data': MOCK_SKILLS
        })
    except Exception as e:
        logging.error(f"Error fetching skills: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch skills'
        }), 500

@api_bp.route('/contact', methods=['POST'])
def submit_contact():
    """Handle contact form submissions"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }), 400
        
        # Create contact submission
        submission = ContactSubmission(
            id=str(uuid.uuid4()),
            name=data['name'],
            email=data['email'],
            message=data['message'],
            timestamp=datetime.now(),
            status='new'
        )
        
        # Save to mock Firebase
        saved_submission = firebase_mock.save_contact_submission(submission)
        
        if saved_submission:
            logging.info(f"Contact submission saved: {submission.id}")
            return jsonify({
                'success': True,
                'message': 'Thank you for your message! I\'ll get back to you soon.',
                'data': {
                    'id': submission.id,
                    'timestamp': submission.timestamp.isoformat()
                }
            })
        else:
            return jsonify({
                'success': False,
                'error': 'Failed to save contact submission'
            }), 500
            
    except Exception as e:
        logging.error(f"Error handling contact submission: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'An error occurred while processing your message'
        }), 500

@api_bp.route('/health', methods=['GET'])
def health_check():
    """Simple health check endpoint"""
    return jsonify({
        'success': True,
        'message': 'API is healthy',
        'timestamp': datetime.now().isoformat()
    })

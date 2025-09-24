import logging
from datetime import datetime
from typing import Dict, List, Optional
from models import ContactSubmission

class FirebaseMock:
    """
    Mock Firebase integration for development.
    Replace this with actual Firebase SDK when ready to deploy.
    """
    
    def __init__(self):
        self.contact_submissions: Dict[str, ContactSubmission] = {}
        self.project_analytics: Dict[str, int] = {}
        logging.info("Initialized Firebase Mock - replace with real Firebase in production")
    
    def save_contact_submission(self, submission: ContactSubmission) -> bool:
        """
        Mock method to save contact submission to Firebase.
        In production, this would use Firebase Firestore.
        """
        try:
            # Simulate Firebase save operation
            self.contact_submissions[submission.id] = submission
            
            # Log for debugging
            logging.info(f"Mock Firebase: Saved contact submission from {submission.email}")
            
            # In production, you would do something like:
            # doc_ref = db.collection('contact_submissions').document(submission.id)
            # doc_ref.set({
            #     'name': submission.name,
            #     'email': submission.email,
            #     'message': submission.message,
            #     'timestamp': submission.timestamp,
            #     'status': submission.status
            # })
            
            return True
        except Exception as e:
            logging.error(f"Mock Firebase error: {str(e)}")
            return False
    
    def get_contact_submissions(self, limit: int = 50) -> List[ContactSubmission]:
        """
        Mock method to retrieve contact submissions.
        In production, this would query Firebase Firestore.
        """
        try:
            submissions = list(self.contact_submissions.values())
            # Sort by timestamp, newest first
            submissions.sort(key=lambda x: x.timestamp, reverse=True)
            return submissions[:limit]
        except Exception as e:
            logging.error(f"Mock Firebase error retrieving submissions: {str(e)}")
            return []
    
    def track_project_view(self, project_id: str) -> bool:
        """
        Mock method to track project views for analytics.
        In production, this would use Firebase Analytics.
        """
        try:
            if project_id in self.project_analytics:
                self.project_analytics[project_id] += 1
            else:
                self.project_analytics[project_id] = 1
            
            logging.debug(f"Mock Analytics: Project {project_id} viewed {self.project_analytics[project_id]} times")
            return True
        except Exception as e:
            logging.error(f"Mock Firebase analytics error: {str(e)}")
            return False
    
    def get_project_analytics(self) -> Dict[str, int]:
        """Get project view analytics"""
        return self.project_analytics.copy()

# Configuration for real Firebase (to be filled in production)
FIREBASE_CONFIG = {
    "apiKey": "your-api-key",
    "authDomain": "your-project.firebaseapp.com",
    "projectId": "your-project-id",
    "storageBucket": "your-project.appspot.com",
    "messagingSenderId": "123456789",
    "appId": "your-app-id"
}

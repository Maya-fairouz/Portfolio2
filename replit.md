# Overview

This is a personal portfolio website built as a full-stack web application. The project features a Flask backend serving a REST API and a modern frontend built with vanilla JavaScript, Tailwind CSS, and a component-based architecture. The portfolio showcases projects, skills, and provides a contact form for potential clients or employers to reach out.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Technology Stack**: Vanilla JavaScript with ES6 modules, Tailwind CSS for styling, HTML5
- **Component System**: Custom component-based architecture with separate JavaScript classes for each major section (Header, Hero, About, Projects, Contact)
- **Styling Approach**: Utility-first CSS using Tailwind with custom color scheme and animations
- **Static Assets**: All frontend files served from the `/static` directory by Flask
- **Icons**: Feather Icons for consistent iconography
- **Fonts**: Google Fonts (Inter and Poppins) for typography

## Backend Architecture
- **Framework**: Flask with Blueprint-based route organization
- **API Design**: RESTful API endpoints under `/api` prefix
- **Data Models**: Dataclass-based models for type safety and structure
- **Error Handling**: Comprehensive error handling with structured JSON responses
- **CORS**: Enabled for development with React/frontend frameworks
- **Deployment**: Configured with ProxyFix for production deployment

## Data Storage
- **Development**: Mock data stored in Python dataclasses and in-memory storage
- **Production Ready**: Firebase integration layer prepared (currently mocked)
- **Contact Submissions**: Structured data model with timestamp and status tracking
- **Projects**: Rich project data model with technologies, images, and links

## Authentication & Authorization
- **Current**: No authentication system implemented
- **Session Management**: Flask session configuration in place for future use
- **Security**: Environment-based secret key management

# External Dependencies

## Core Dependencies
- **Flask**: Python web framework for backend API
- **Flask-CORS**: Cross-origin resource sharing for frontend integration
- **Werkzeug**: WSGI utilities for production deployment

## Frontend Dependencies (CDN)
- **Tailwind CSS**: Utility-first CSS framework via CDN
- **Feather Icons**: Icon library via CDN
- **Google Fonts**: Inter and Poppins font families

## Planned Integrations
- **Firebase**: Mock implementation ready for Firestore database and authentication
- **Email Service**: Contact form submissions ready for email integration
- **Analytics**: Structure in place for project view tracking

## Development Tools
- **Logging**: Comprehensive logging system for debugging and monitoring
- **Environment Variables**: Configuration management for secrets and settings
- **Static File Serving**: Flask static file handling for production deployment
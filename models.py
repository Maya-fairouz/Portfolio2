from dataclasses import dataclass
from datetime import datetime
from typing import List, Optional

@dataclass
class Project:
    id: str
    title: str
    description: str
    technologies: List[str]
    image_url: str
    project_url: str
    github_url: Optional[str] = None
    featured: bool = False

@dataclass
class ContactSubmission:
    id: str
    name: str
    email: str
    message: str
    timestamp: datetime
    status: str = "new"

# Mock data for projects
MOCK_PROJECTS = [
    Project(
        id="1",
        title="E-Commerce Platform",
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
        technologies=["React", "Node.js", "MongoDB", "Stripe"],
        image_url="https://pixabay.com/get/g95456917e25aa35eee6b27d4ea3e5369f9c8cc5a18f813614aaea47341fc018c26ebeb383fb6f378f617152da2eb6f41d5ab03fe31f43d861fe9111a9f672643_1280.jpg",
        project_url="https://example.com",
        github_url="https://github.com/example/project1",
        featured=True
    )
]

# Mock skills data
MOCK_SKILLS = {
    "languages": ["JavaScript", "Python", "TypeScript", "Java", "SQL"],
    "frontend": ["React", "Vue.js", "HTML5", "CSS3", "TailwindCSS", "Bootstrap"],
    "backend": ["Node.js", "Express", "Flask", "Django", "REST APIs"],
    "databases": ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
    "tools": ["Git", "Docker", "AWS", "Figma", "Webpack", "Jest"],
    "is that u ?":["yes","you","piece","of","shit"    ]
}

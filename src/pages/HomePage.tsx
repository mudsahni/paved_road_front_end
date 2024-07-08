// src/pages/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Templates from '../components/Templates'

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleCardClick = (formType: 'artifact' | 'project') => {
        navigate(`/form/${formType}`);
    };

    return (
        <div className="home-page">
            <h1>Choose an option</h1>
            <div className="card-container">
                <Card
                    title="Artifact"
                    subtitle="Create a new artifact"
                    description="Click to add a new artifact to your project"
                    onClick={() => handleCardClick('artifact')}
                />
                <Card
                    title="Project"
                    subtitle="Create a new project"
                    description="Click to start a new project"
                    onClick={() => handleCardClick('project')}
                />
            </div>
            <Templates />
        </div>
    );
};

export default HomePage;
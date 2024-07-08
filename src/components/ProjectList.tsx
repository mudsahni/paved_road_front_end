import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Project } from './../types/Project';
import  ProjectCard2  from './ProjectCard2';

// You might want to create a separate file for this
const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
});

export const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await api.get<Project[]>('/service');
            setProjects(response.data);
            setIsLoading(false);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError('Error fetching projects: ' + err.message);
            } else {
                setError('An unexpected error occurred');
            }
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div className="text-center mt-8">Loading projects...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">{error}</div>;
    }


    return (
        <div className="container mx-auto grid max-w-7xl px-6 py-6">
            <h2 className="mb-10 text-2xl font-medium leading-7 text-gray-700 sm:truncate sm:text-3xl sm:tracking-tight">
               Projects
            </h2>
            {projects.length === 0 ? (
                <p className="text-center">No projects found.</p>
            ) : (
                <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
                        {projects.map((project) => (
                            <li key={project.id} className="overflow-hidden rounded-xl text-wrap border border-gray-200">
                                <ProjectCard2 key={project.id} project={project} isDeployed={false}/>
                            </li>
                        ))}
                    </ul>
                )}
        </div>
    );
};
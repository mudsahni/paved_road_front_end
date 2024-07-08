import React from 'react';
import { Project } from '../types/Project';

interface ProjectCardProps {
    project: Project;
    isDeployed: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, isDeployed = false }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 m-4 max-w-sm">
            <h2 className="text-xl font-bold mb-2">{project.name}</h2>
            <div className="mb-2">
          {/*      {project.tags.map((tag: string, index) => (*/}
          {/*          <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">*/}
          {/*  {tag}*/}
          {/*</span>*/}
          {/*      ))}*/}
            </div>
            <p className="text-gray-700 mb-2">
                <span className="font-semibold">Repository:</span> {project.repo}
            </p>
            <p className="text-gray-700 mb-2">
                <span className="font-semibold">Author:</span> {project.owner}
            </p>
            <p className="text-gray-700 mb-2">
                <span className="font-semibold">Template:</span> {project.template}
            </p>
            <p className="text-gray-700">
                <span className="font-semibold">Status:</span>{' '}
                {isDeployed ? (
                    <span className="text-green-500">Deployed</span>
                ) : (
                    <span className="text-red-500">Not Deployed</span>
                )}
            </p>
        </div>
    );
};
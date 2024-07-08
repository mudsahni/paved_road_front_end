import { PaperClipIcon } from '@heroicons/react/20/solid'
import React from "react";

type ProjectCard3Props = {
    name: string;
    description: string;
    owner: string;
    template: string;
    costCenter: string;
    repo: string;

}
const ProjectCard3: React.FC<ProjectCard3Props> = ({name, description, owner, template, costCenter, repo}) => {
    return (
        <div>
            <div className="px-4 sm:px-0">
                <div className="flex items-center justify-between">
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{description || "something"}</p>
                    <GithubButton repo={repo}/>
                </div>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Template</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{template}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Organization</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{owner}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Cost Center</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{costCenter}</dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

type GithubButtonProps = {
    repo: string;
}
const GithubButton: React.FC<GithubButtonProps> = ({repo}) => {
    return (
        <a href={repo} target="_blank"
           className="text-gray-500 hover:text-gray-900 max-h-[10px] max-w-[10px] pb-20">

            <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6 m-4">
                <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                />
            </svg>
        </a>

    )
}

export default ProjectCard3
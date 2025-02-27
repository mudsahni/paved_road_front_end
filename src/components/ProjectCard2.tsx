import {Project} from "../types/Project";
import {useNavigate} from "react-router-dom";
import {ArrowRightCircleIcon} from "@heroicons/react/24/outline";
import React from "react";

interface ProjectCardProps {
    project: Project;
    isDeployed: boolean;

}
function classNames(...classes: (string | undefined | null | false | 0)[]): string {
    return classes.filter(Boolean).join(' ');
}

const ProjectCard2: React.FC<ProjectCardProps> = (props: ProjectCardProps ) => {
    const navigate = useNavigate();

    const goToProject = (id: string) => {
        navigate(`/projects/${id}`);
    };

    return (
        <div>
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6 justify-between">
                {/*<img*/}
                {/*    src={client.imageUrl}*/}
                {/*    alt={client.name}*/}
                {/*    className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"*/}
                {/*/>*/}
                <div className="text-sm font-medium leading-6 text-gray-900">{props.project.name}</div>
                <ArrowRightCircleIcon onClick={() => goToProject(props.project.id)}
                                      className="h-6 w-6 text-indigo-600 group-hover:text-indigo-600 cursor-pointer"
                                      aria-hidden="true"/>
            </div>
            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Owner</dt>
                    <dd className="text-gray-700">
                        {props.project.owner}
                    </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Template</dt>
                    <dd className="text-gray-700">
                        {props.project.template}
                    </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Cost Center</dt>
                    <dd className="text-gray-700">
                        {props.project.costCenter}
                    </dd>
                </div>

            </dl>
            <a href={props.project.repo} target="_blank"
               className="text-gray-500 hover:text-gray-900 max-h-[10px] max-w-[10px]">

                <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6 m-4">
                    <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                    />
                </svg>
            </a>
        </div>
    )
}
export default ProjectCard2
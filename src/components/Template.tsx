import React from "react";
import {TemplateProps} from '../types/index'
import Tag from "./Tag";
import {ChartPieIcon, ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";


const Template: React.FC<TemplateProps> = ({name, health, href, tags, description, icon}) => {
    const navigate = useNavigate();

    const handleCardClick = (formType: 'artifact' | 'project') => {
        navigate(`/form/${formType}`);
    };

    return (
    <div key={name}
         onClick={() => handleCardClick('artifact')}
         className="group relative rounded-lg p-6 text-sm leading-6 hover:bg-gray-50 border border-slate-200 hover:border-white">
        <div className="flex justify-between">
            <div
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <ChartPieIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true"/>
            </div>
            {
                health == 'healthy' ? <span></span> :
                    <div
                        className="flex h-11 w-11 items-center justify-center rounded-lg">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-400" aria-hidden="true"/>
                    </div>
            }
        </div>
        <a href={href} className="mt-6 block font-semibold text-gray-900">
            {name}
            <span className="absolute inset-0"/>
        </a>
        <div>
        {
               tags.map((tag, index) => (<Tag text={tag} />))
            }
        </div>
        <p className="mt-1 text-gray-900">{description}</p>
    </div>
    )
}

export default Template;
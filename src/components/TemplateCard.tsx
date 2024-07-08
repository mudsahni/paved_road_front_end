import {
    AcademicCapIcon,
    CheckCircleIcon,
    CheckBadgeIcon,
    ClockIcon,
    ReceiptRefundIcon,
    UsersIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import Tag from "./Tag";
import React from "react";
import { useNavigate } from 'react-router-dom';
import {FlagIcon} from "@heroicons/react/16/solid";

function classNames(...classes: (string | undefined | null | false | 0)[]): string {
    return classes.filter(Boolean).join(' ');
}

interface TemplateCardProps {
   name: string;
   index: number;
   total: number;
   iconBackground?: string;
   iconForeground?: string ;
   href: string;
   description: string;
   tags: string[];
   configs: Record<string, string>;
   organization: string;
   id: string;
   repo: string;
   healthy: boolean;
}
const TemplateCard: React.FC<TemplateCardProps> = (props: TemplateCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/form/${props.name}`, {
            state: {
                configs: props.configs,
                name: props.name,
                repoOwner: props.organization,
                repoName: props.repo,
                templateId: props.id
            }
        });
    };

    const iconBackgroundColor = props.healthy ? 'bg-green-50' : 'bg-red-50'
    const iconForegroundColor = props.healthy ? 'text-green-500' : 'text-red-500'

    return (
        <div>
            <div
                key={props.name}
                className={classNames(
                    props.index === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                    props.index === 1 ? 'sm:rounded-tr-lg' : '',
                    props.index === props.total - 2 ? 'sm:rounded-bl-lg' : '',
                    props.index === props.total - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                    'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500',
                )}
            >
                <div>
            <span
                className={classNames(
                    iconBackgroundColor,
                    iconForegroundColor,
                    'inline-flex rounded-lg p-3 ring-4 ring-white',
                )}
            >
                {
                    props.healthy ? <CheckCircleIcon className="h-6 w-6" aria-hidden="true"/>
                        : <ExclamationTriangleIcon className="h-6 w-6" aria-hidden="true"/>

                }
            </span>
                </div>


                <div className="mt-8">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                        <a onClick={handleClick} className="focus:outline-none cursor-pointer">
                            {/* Extend touch target to entire panel */}
                            <span className="absolute inset-0" aria-hidden="true"/>
                            {props.name}
                        </a>
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                        {props.description}
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                        <div>
                        {
                            props.tags.map((tag, index) => (<Tag text={tag}/>))
                        }
                        </div>
                        <span className="inline-flex mx-4 rounded-lg p-3 ring-4 ring-white bg-red-50 text-red-300">
                    <FlagIcon className="h-6 w-6" aria-hidden="true"/>
                    </span>

                    </div>

                </div>

                <span
                    className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                    aria-hidden="true"
                >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                  d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"/>
            </svg>
          </span>

            </div>
        </div>
    )
}

export default TemplateCard
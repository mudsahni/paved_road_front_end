import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Template as TemplateType} from '../types/Template'
import {getTemplates} from "../api/getTemplates";
import TemplateCard from './TemplateCard'
import NewTemplateBox from "./NewTemplateBox";

export default function Templates() {
    const navigate = useNavigate();
    const [templates, setTemplates] = useState<TemplateType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            const data = await getTemplates();
            setTemplates(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch templates');
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleCardClick = (formType: 'artifact' | 'project') => {
        navigate(`/form/${formType}`);
    };

    return (
       <div>
           <h2 className="mx-auto grid max-w-7xl px-6 py-6 text-2xl font-medium leading-7 text-gray-700 sm:truncate sm:text-3xl sm:tracking-tight">
              Templates
           </h2>

           <p className="mx-auto grid max-w-7xl px-6 text-gray-700 text-sm">
               These are developer submitted and approved templates which can be used by other developers to build off of in a standardised way.</p>

           <div className="mx-auto grid max-w-7xl px-6 py-6">
               <NewTemplateBox />
           </div>
           {/*<div className="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-6 py-10 lg:px-8 xl:gap-x-8">*/}
           {/*    {templatesStatic.map((item) => (*/}
           {/*        <Template*/}
           {/*            name={item.name}*/}
           {/*            health={item.health}*/}
           {/*            href={item.href}*/}
           {/*            tags={item.tags}*/}
           {/*            description={item.description}*/}
           {/*            icon={item.icon}*/}
           {/*            key={item.name}*/}
           {/*        />*/}
           {/*    ))}*/}
           {/*</div>*/}
           <div
               className="mx-auto grid max-w-7xl my-10 divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
               {
                   templates.map((item, index) => (
                       <TemplateCard
                           name={item.name}
                            href={`https://www.github.com/${item.organization}/${item.repo}`}
                            index={index}
                            total={templates.length}
                            description={item.description}
                            tags={item.tags}
                            configs={item.configs}
                            organization={item.organization}
                            id={item.id}
                            repo={item.repo}
                            healthy={item.healthy}
                        />
                   ))
               }
           </div>
       </div>
    )
}
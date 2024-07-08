import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import GeneratingLoadingSVG from "./GeneratingLoadingSVG";

interface DynamicFormProps {
    fields: Record<string, string>;
    onSubmit: (formData: Record<string, string>) => void;
    isLoading: boolean;
    isGenerationComplete: boolean;
    serviceId: string;
}

const TemplateForm: React.FC<DynamicFormProps> = ({ fields, onSubmit, isLoading, isGenerationComplete, serviceId }) => {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const navigate = useNavigate();
    const [currentServiceId, setCurrentServiceId] = useState<string>(serviceId);

    useEffect(() => {
        console.log("Updated serviceId:", serviceId); // Debug log
        setCurrentServiceId(serviceId);
    }, [serviceId]);

    const goToProject = (id: string) => {
        console.log("Navigating to project with ID:", id); // Debug log
        navigate(`/projects/${id}`);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="bg-white-100 px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div key="name" className="flex flex-col">
                    <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">
                       name
                    </label>
                    <input
                        type="text"
                        id={"name"}
                        name={"name"}
                        value={formData["name"] || ''}
                        onChange={handleChange}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                {Object.entries(fields).map(([key, label]) => (
                    <div key={key} className="flex flex-col">
                        <label htmlFor={key} className="mb-1 text-sm font-medium text-gray-700">
                            {key.replaceAll("_", " ")}
                        </label>
                        <input
                            type="text"
                            id={key}
                            name={key}
                            value={formData[key] || ''}
                            onChange={handleChange}
                            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                ))}

                {
                    isGenerationComplete ?
                        (
                            <button
                                onClick={() => goToProject(currentServiceId)}
                                className="w-full px-4 py-2 text-white bg-indigo-700 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Go to project
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-indigo-700 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {isLoading ? (
                                    <GeneratingLoadingSVG value="Generating...."/>
                                ) : 'Generate Project'}
                            </button>
                        )
                }

            </form>
        </div>
    );
};

export default TemplateForm;
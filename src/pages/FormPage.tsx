// src/components/FormPage.tsx
import React, {useEffect, useRef, useState} from 'react';
import TemplateForm from '../components/TemplateForm';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import LogViewer from "../components/LogViewer";

interface LocationState {
    configs: Record<string, string>;
    name: string;
    repoOwner: string;
    repoName: string;
    templateId: string;
}

export type LogMessage = {
    timestamp: number;
    level: string;
    logger: string;
    message: string;
};

const FormPage: React.FC = () => {
    const location = useLocation();
    const { configs, name, repoOwner, repoName, templateId } = (location.state as LocationState) ||
    { configs: {}, name: 'Template', repoOwner: '', repoName: '', templateId: '' };
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [logs, setLogs] = useState<LogMessage[]>([]);
    const [eventSource, setEventSource] = useState<EventSource | null>(null);
    const [isGenerationComplete, setIsGenerationComplete] = useState(false);
    const [serviceId, setServiceId] = useState<string>('');

    useEffect(() => {
        const newEventSource = new EventSource('http://localhost:8080/sse/subscribe');
        setEventSource(newEventSource);
        newEventSource.onopen = () => {
            console.log('SSE connection opened');
        };

        newEventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
            if (newEventSource.readyState === EventSource.CLOSED) {
                console.log('SSE connection closed');
            }
        };

        return () => {
            newEventSource.close();
        };
    }, []);

    useEffect(() => {
        if (!eventSource) return;

        eventSource.onmessage = (event) => {
            const newMessage = event.data;
            console.log("Getting new message:", event.data);
            setLogs((prevMessages) => [...prevMessages, newMessage]);
        };

        eventSource.addEventListener('test', (event: MessageEvent) => {
            console.log('Received test event:', event.data);
        });

        eventSource.addEventListener('template-service', (event: MessageEvent) => {
            console.log('Received template-service event:', event.data);
            try {
                const logMessage = JSON.parse(event.data) as LogMessage;
                if (logMessage.message.includes("Project generation is complete.") || logMessage.message.includes("Generation from template failed.")) {
                    setIsLoading(false);
                    setIsGenerationComplete(true)
                }

                if (logMessage.message.includes("ProjectId:")) {
                    console.log("This is the message")
                    console.log(logMessage.message);
                    setServiceId(logMessage.message.split(":")[1].trim());
                }
                setLogs((prevLogs) => [...prevLogs, logMessage]);
            } catch (error) {
                console.error('Error parsing template-service message:', error);
            }
        });


        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
            eventSource.close();
        };
    }, [eventSource]);

    useEffect(() => {
        return () => {
            if (eventSource) {
                eventSource.close();
            }
        };
    }, [eventSource]);

    const handleSubmit = async (formData: Record<string, string>) => {
        setIsLoading(true);
        try {
            const requestBody = {
                repoOwner,
                repoName,
                newOwner: repoOwner, // Assuming the new owner is the same as the original owner
                newRepoName: formData.name || `${repoName}_new`, // Using artifact_id as new repo name, or appending '_new' if not provided
                config: formData, // Use all form data as the config
                templateId,
            };

            const response = await axios.post('http://localhost:8080/api/v1/generate', requestBody);
            console.log('API Response:', response.data);

            // Handle successful submission (e.g., show a success message, redirect)
            // alert(`Template generated successfully! Here is the service id = ${response.data.serviceId}`);
            //navigate('/'); // Redirect to home page or a success page
        } catch (error) {
            console.error('Error submitting form:', error);
            // alert('Failed to generate template. Please try again.');
        }
    };

    if (Object.keys(configs).length === 0) {
        return <div>No configuration found for this template.</div>;
    }

    return (
        <div className="mx-auto grid max-w-7xl px-6 py-6">
            <h1 className="text-2xl font-medium text-gray-700 mb-4">{name}</h1>
            <div className="flex justify-between">
                <div className="flex-1 pr-4">

                    <TemplateForm fields={configs} onSubmit={handleSubmit} isLoading={isLoading} isGenerationComplete={isGenerationComplete} serviceId={serviceId} />
                </div>
                <div className="flex-1 pl-4">
                    <LogViewer logs={logs} />
                </div>

            </div>
        </div>
    );
};

export default FormPage;
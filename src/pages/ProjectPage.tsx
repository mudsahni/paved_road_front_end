import React, {useEffect, useState} from "react";
import {Project} from "../types/Project";
import {getProject} from "../api/getProject";
import {useParams} from "react-router-dom";
import {triggerGithubAction} from "../api/triggerGithubAction";
import ProjectCard3 from "../components/ProjectCard3";
import LogViewer from "../components/LogViewer";
import {LogMessage} from "./FormPage";
import GeneratingLoadingSVG from "../components/GeneratingLoadingSVG";

interface ProjectPageParams {
    projectId: string;
}

const ProjectPage: React.FC = () => {
    const { projectId } = useParams();
    const [logs, setLogs] = useState<LogMessage[]>([]);
    const [eventSource, setEventSource] = useState<EventSource | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeploymentComplete, setIsDeploymentComplete] = useState(false);

    useEffect(() => {
        const newEventSource = new EventSource('https://logmachine-nfxik62jwa-uc.a.run.app/sse/subscribe');
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

        eventSource.addEventListener('log-service', (event: MessageEvent) => {
            console.log('Received template-service event:', event.data);
            try {
                const logMessage = JSON.parse(event.data) as LogMessage;
                setLogs((prevLogs) => [...prevLogs, logMessage]);
                if (logMessage.message.includes("Deployment complete.")) {
                    setIsLoading(false);
                    setIsDeploymentComplete(true)
                }
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

    const emptyProject: Project = {
        id: "",
        name: "",
        repo: "",
        owner: "",
        template: "",
        costCenter: ""
    }

    const [project, setProject] = useState<Project>(emptyProject);
    useEffect(() => {
        if (projectId != undefined) {
            fetchProject(projectId);
        }
    }, [projectId]);

    const fetchProject = async (projectId: string) => {
        try {
            const project = await getProject(projectId);
            setProject(project);
        } catch (err) {
            console.log(err)
        }
    };

    const handleTrigger = async () => {
        if (projectId != undefined) {
            setIsLoading(true)
            const res = await triggerGithubAction(projectId)
            console.log(res)
        }
    }
    return (
        <div className="mx-auto grid max-w-7xl px-6 py-6">
            <h1 className="text-2xl font-medium text-gray-700 mb-4">{project.name}</h1>
            <div className="flex justify-between">
                <div className="flex-1 pr-20">
                    <div className="flex flex-col justify-between h-full">
                        <ProjectCard3 name={project.name} description={"sample description"} owner={project.owner}
                                      template={project.template} costCenter={project.costCenter} repo={project.repo}/>
                        <button
                            onClick={handleTrigger}
                            className="w-full px-4 py-2 mt-4 text-white bg-indigo-700 rounded-md hover:bg-violet-900 focus:outline-none focus:ring-2 focus:ring-indigo-700"
                        >
                            {isLoading ? (
                                <GeneratingLoadingSVG value="Deploying...."/>
                                ) :
                                (<>Trigger CI/CD Pipeline</>)
                            }
                        </button>


                    </div>
                </div>
                <div className="flex-1 pl-4">
                    <LogViewer logs={logs}/>
                </div>

            </div>


        </div>

    )
}
export default ProjectPage
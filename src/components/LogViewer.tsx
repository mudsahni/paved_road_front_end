
import React from 'react';
import { CodeBlock, dracula } from 'react-code-blocks';

interface Log {
    timestamp: number;
    level: string;
    logger: string;
    message: string;
}

interface LogViewerProps {
    logs: Log[];
}
const LogViewer: React.FC<LogViewerProps> = ({ logs }) => {
    const formattedLogs = logs.map(log => (
        `[${log.timestamp}] ${log.level.toUpperCase()}: ${log.message}`
    )).join('\n');

    return (
        <div className="max-w-full text-wrap overflow-scroll">
            <CodeBlock
                text={formattedLogs}
                language="log"
                showLineNumbers={true}
                theme={dracula}
                customStyle={{
                    height: '100%',
                    minHeight: '625px',
                    minWidth: '100%',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontSize: '14px',
                    wordWrap: 'break-word',
                    maxWidth: '100%',
                }}
            />
        </div>
    )
}

export default LogViewer
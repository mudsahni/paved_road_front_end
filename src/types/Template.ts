export interface Template {
    id: string;
    name: string;
    description: string;
    organization: string;
    author: string;
    tags: string[];
    healthy: boolean;
    icon: string;
    repo: string;
    configs: Record<string, string>;
}
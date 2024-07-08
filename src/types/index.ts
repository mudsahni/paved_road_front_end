// src/types/index.ts
export interface CardProps {
    title: string;
    subtitle: string;
    description: string;
    onClick: () => void;
}

export interface FormProps {
    formType: 'artifact' | 'project';
    onSubmit: (formData: FormData) => void;
}

export interface FormData {
    name: string;
    projectName: string;
    description: string;
}

export interface TemplateProps {
    name: string;
    description: string;
    tags: string[];
    health: string;
    icon: string;
    href: string;
}
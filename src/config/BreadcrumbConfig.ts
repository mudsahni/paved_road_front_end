interface Breadcrumb {
    name: string;
    href: string;
    current: boolean;
}

export const breadcrumbsConfig: { [key: string]: Breadcrumb[] } = {
    '/form': [
        {name: 'Templates', href: '/templates', current: false},
        { name: 'Form', href: '/form', current: true },
    ],
    '/templates': [
        { name: 'Templates', href: '/templates', current: true },
    ],
};

// src/components/Layout.tsx
import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer'
import Breadcrumbs from './Breadcrumbs';

interface LayoutProps {
    children: React.ReactNode;
    pages: { name: string; href: string; current: boolean }[];
}

const Layout: React.FC<LayoutProps> = ({ pages, children }) => {

    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
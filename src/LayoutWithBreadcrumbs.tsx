import {useLocation} from "react-router-dom";
import {breadcrumbsConfig} from "./config/BreadcrumbConfig";
import Layout from './components/Layout'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormPage from "./pages/FormPage";
import ProjectPage from './pages/ProjectPage'
import TemplatesPage from "./pages/TemplatesPage";
import React from "react";
import {ProjectList} from "./components/ProjectList";
import NewTemplatePage from "./pages/NewTemplatePage";

const LayoutWithBreadcrumbs: React.FC = () => {
    const location = useLocation();
    const path = location.pathname;

    // Find the matching breadcrumb config based on the current path
    const pages = breadcrumbsConfig[path] || [{ name: 'Home', href: '/', current: true }];

    return (
        <Layout pages={pages}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<TemplatesPage />} />
                    <Route path="/form/:formType" element={<FormPage />} />
                    <Route path="/templates" element={<TemplatesPage />} />
                    <Route path="/projects" element={<ProjectList />} />
                    <Route path="/projects/:projectId" element={<ProjectPage />} />
                    <Route path="/templates/new" element={<NewTemplatePage />} />
                </Routes>
            </div>
        </Layout>
    );
};

export default LayoutWithBreadcrumbs;
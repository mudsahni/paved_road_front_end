import React from "react";
import CreateNewTemplateForm from "../components/CreateNewTemplateForm";


type NewTemplatePageProps = {

}

const NewTemplatePage: React.FC<NewTemplatePageProps> = () => {
   return <div className="mx-auto grid max-w-7xl px-6 py-6">
        <h1 className="text-2xl font-medium text-gray-700 mb-4">Create a new template</h1>
        <div className="flex justify-between">
            <div className="flex-1 pr-4">
                <CreateNewTemplateForm />
            </div>
            <div className="flex-1 pl-4">
            </div>

        </div>
    </div>

}

export default NewTemplatePage
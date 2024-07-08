import GeneratingLoadingSVG from "./GeneratingLoadingSVG";
import React, {useState} from "react";
import axios from "axios";


type CreateNewTemplateFormProps = {

}
const CreateNewTemplateForm: React.FC<CreateNewTemplateFormProps> = () => {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isCreationComplete, setIsCreationComplete] = useState(false);

    const fields = {
        "name": "text",
        "organization": "text",
        "author": "text",
        "repo": "text",
        "description": "text",
        "tags": "text",
    }
    const onSubmit = async (formData: Record<string, string>) => {
        setIsLoading(true);
        try {
            const requestBody = {
                "name": formData.name,
                "tags": formData.tags.split(","),
                "healthy": true,
                "description": formData.description,
                "author": formData.author,
                "repo": formData.repo,
                "organization": formData.organization,
            }

            const response = await axios.post('http://localhost:8080/api/v1/create', requestBody);
            console.log('API Response:', response.data);
            setIsLoading(false)
            setIsCreationComplete(true)
            // Handle successful submission (e.g., show a success message, redirect)
            // alert(`Template generated successfully! Here is the service id = ${response.data.serviceId}`);
            //navigate('/'); // Redirect to home page or a success page
        } catch (error) {
            console.error('Error submitting form:', error);
            // alert('Failed to generate template. Please try again.');
        }
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
                {Object.entries(fields).map(([key, type]) => (
                    <div key={key} className="flex flex-col">
                        <label htmlFor={key} className="mb-1 text-sm font-medium text-gray-700">
                            {key.replace("_", " ")}
                        </label>
                        <input
                            type={type}
                            id={key}
                            name={key}
                            value={formData[key] || ''}
                            onChange={handleChange}
                            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                ))}
                <button
                    disabled={isCreationComplete}
                    type="submit"
                    className={`w-full px-4 py-2 ${isCreationComplete ? "text-white bg-gray-700" : "text-white bg-indigo-700 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"} rounded-md`}
                >
                    {isLoading ? (
                        <GeneratingLoadingSVG value="Creating...."/>
                    ) :
                        isCreationComplete ? "Template Created" : "Create a new template"
                    }
                </button>
            </form>
        </div>

    )
}

export default CreateNewTemplateForm
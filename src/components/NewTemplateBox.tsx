import {useNavigate} from "react-router-dom";

type NewTemplateBoxProps = {

}
const NewTemplateBox: React.FC<NewTemplateBoxProps> = () => {
    const navigate = useNavigate();

    const goToNewTemplatePage = () => {
        navigate("/templates/new")
    }

    return (
        <button
            onClick={() => goToNewTemplatePage()}
            type="button"
            className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
            <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="mx-auto h-12 w-12 text-gray-400"
            >
                <path
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                    strokeWidth={2}
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <span className="mt-2 block text-sm font-semibold text-gray-900">Create a new template</span>
        </button>
    )
}

export default NewTemplateBox;
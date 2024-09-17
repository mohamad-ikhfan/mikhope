import { CursorArrowRippleIcon } from "@heroicons/react/16/solid";
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SwitchRouter({ align }) {
    const [routers, setRouter] = useState([]);
    const [isFatch, setIsFetch] = useState(true);

    const fetchRouter = async () => {
        await axios.get(route("router.fetch")).then((response) => {
            setRouter(response.data);
            setIsFetch(false);
        });
    };

    useEffect(() => {
        if (isFatch) {
            fetchRouter();
        } else {
            let timer = setTimeout(() => setIsFetch(true), 60 * 1000);
            () => clearTimeout(timer);
        }
    });

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <span className="inline-flex rounded-md">
                    <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-200  bg-blue-800 dark:bg-gray-600 hover:text-gray-50 dark:hover:text-gray-200 focus:outline-none transition ease-in-out duration-150"
                    >
                        <CursorArrowRippleIcon className="w-5 me-1" />
                        Switch router
                        <svg
                            className="ms-1 -me-0.5 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </span>
            </Dropdown.Trigger>

            <Dropdown.Content align={align}>
                {routers.length > 0 &&
                    routers.map((router) => (
                        <Dropdown.Link key={router.id}>
                            {router.name}
                        </Dropdown.Link>
                    ))}
            </Dropdown.Content>
        </Dropdown>
    );
}

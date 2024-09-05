import SearchInput from "@/Components/SearchInput";
import {
    EyeIcon,
    EyeSlashIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/16/solid";
import ShowRouterMikrotik from "./Show";
import { useState } from "react";
import EditRouterMikrotik from "./Edit";
import DeleteRouterMikrotik from "./Delete";
import Pagination from "@/Components/Pagination";

export default function RouterMikrotikTable({ routerMikrotiks }) {
    const rows = routerMikrotiks.data;
    const links = routerMikrotiks.meta.links;

    const [showModalShow, setShowModalShow] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataROw, setDataRow] = useState();

    const [typeText, setTypeText] = useState("password");

    const handleChangeTypeText = () => {
        if (typeText === "text") {
            setTypeText("password");
        } else {
            setTypeText("text");
        }
    };

    const closeModal = () => {
        setShowModalShow(false);
        setShowModalEdit(false);
        setShowModalDelete(false);
        setDataRow();
    };

    return (
        <div className="p-4 md:p-6 text-gray-900 dark:text-gray-100">
            <div className="flex justify-between">
                <div></div>
                <SearchInput />
            </div>
            <div className="w-full overflow-auto py-6">
                <table className="w-full text-left border dark:text-gray-200 ">
                    <thead className="dark:bg-gray-600 font-bold uppercase border">
                        <tr>
                            <th className="p-4">#</th>
                            <th className="p-4">name</th>
                            <th className="p-4">host</th>
                            <th className="p-4">port</th>
                            <th className="p-4">user</th>
                            <th className="p-4">pass</th>
                            <th className="p-4">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length > 0 ? (
                            rows.map((row, index) => (
                                <tr
                                    key={row.id}
                                    className="dark:bg-gray-900 dark:hover:bg-gray-800"
                                >
                                    <td className="px-4 py-2">{++index}</td>
                                    <td className="px-4 py-2">{row.name}</td>
                                    <td className="px-4 py-2">{row.host}</td>
                                    <td className="px-4 py-2">{row.port}</td>
                                    <td className="px-4 py-2">{row.user}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex gap-1">
                                            <div>
                                                {typeText === "password" &&
                                                    row.pass.replaceAll(
                                                        row.pass,
                                                        "******"
                                                    )}
                                                {typeText === "text" &&
                                                    row.pass}
                                            </div>
                                            <div>
                                                {typeText === "password" && (
                                                    <EyeIcon
                                                        className="w-4 text-gray-600 cursor-pointer"
                                                        onClick={
                                                            handleChangeTypeText
                                                        }
                                                    />
                                                )}
                                                {typeText === "text" && (
                                                    <EyeSlashIcon
                                                        className="w-4 text-gray-600 cursor-pointer"
                                                        onClick={
                                                            handleChangeTypeText
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex gap-2">
                                            <EyeIcon
                                                className="w-5 cursor-pointer text-blue-400"
                                                title="Show"
                                                onClick={() => {
                                                    setDataRow(row);
                                                    setShowModalShow(true);
                                                }}
                                            />
                                            <PencilIcon
                                                className="w-5 cursor-pointer text-yellow-400"
                                                title="Edit"
                                                onClick={() => {
                                                    setDataRow(row);
                                                    setShowModalEdit(true);
                                                }}
                                            />
                                            <TrashIcon
                                                className="w-5 cursor-pointer text-red-400"
                                                title="Delete"
                                                onClick={() => {
                                                    setDataRow(row);
                                                    setShowModalDelete(true);
                                                }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="p-4 text-center">
                                    No data found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {rows.length > 0 && <Pagination links={links} />}
            </div>

            {showModalShow && (
                <ShowRouterMikrotik
                    showModal={showModalShow}
                    routerMikrotik={dataROw}
                    closeModal={closeModal}
                />
            )}
            {showModalEdit && (
                <EditRouterMikrotik
                    showModal={showModalEdit}
                    routerMikrotik={dataROw}
                    closeModal={closeModal}
                />
            )}
            {showModalDelete && (
                <DeleteRouterMikrotik
                    showModal={showModalDelete}
                    routerMikrotik={dataROw}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
}

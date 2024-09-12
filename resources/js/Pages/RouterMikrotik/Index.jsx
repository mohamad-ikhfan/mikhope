import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateRouterMikrotik from "./Create";
import { useMemo, useState } from "react";
import Table from "@/Components/Table";
import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import TableAction from "@/Components/TableAction";
import ShowRouterMikrotik from "./Show";
import EditRouterMikrotik from "./Edit";
import DeleteRouterMikrotik from "./Delete";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";

export default function RouterMikrotikIndex({ auth, routerMikrotiks }) {
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalShow, setOpenModalShow] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [dataRow, setDataRow] = useState();

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true);
        }
    };

    const show = (data) => {
        setDataRow(data);
        setOpenModalShow(true);
    };

    const edit = (data) => {
        setDataRow(data);
        setOpenModalEdit(true);
    };

    const destroy = (data) => {
        setDataRow(data);
        setOpenModalDelete(true);
    };

    const closeModal = () => {
        setOpenModalCreate(false);
        setOpenModalShow(false);
        setOpenModalEdit(false);
        setOpenModalDelete(false);
        setDataRow();
    };

    const data = useMemo(() => routerMikrotiks.data, [routerMikrotiks.data]);

    const columnHelper = createColumnHelper();

    const table = useReactTable({
        columns: [
            columnHelper.accessor("#", {
                cell: (info) => info.row.index + 1,
                enableColumnFilter: false,
                enableSorting: false,
            }),
            columnHelper.accessor("name", {
                header: () => "name",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("host", {
                header: () => "host",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("port", {
                header: () => "port",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("user", {
                header: () => "user",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("pass", {
                header: () => "password",
                cell: (info) => (
                    <Password
                        value={info.getValue()}
                        show={showPassword}
                        handleShowPassword={handleShowPassword}
                    />
                ),
            }),
            columnHelper.accessor("action", {
                cell: (info) => (
                    <TableAction
                        data={info.cell.row.original}
                        show={show}
                        edit={edit}
                        destroy={destroy}
                    />
                ),
                enableColumnFilter: false,
                enableSorting: false,
            }),
        ],
        data: data,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        autoResetPageIndex: false,
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Router
                </h2>
            }
        >
            <Head title="Router" />

            <div className="py-12">
                <div className="max-w-full mx-auto md:px-6">
                    <div className="flex justify-end pb-4">
                        <PrimaryButton
                            type="button"
                            onClick={() => setOpenModalCreate(true)}
                        >
                            New Router
                        </PrimaryButton>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm md:rounded-lg">
                        <div className="p-4 md:p-6 text-gray-900 dark:text-gray-100">
                            <Table table={table} />
                        </div>
                    </div>
                </div>
            </div>

            {openModalCreate && (
                <CreateRouterMikrotik
                    showModal={openModalCreate}
                    closeModal={closeModal}
                />
            )}
            {openModalShow && (
                <ShowRouterMikrotik
                    showModal={openModalShow}
                    state={dataRow}
                    closeModal={closeModal}
                />
            )}
            {openModalEdit && (
                <EditRouterMikrotik
                    showModal={openModalEdit}
                    state={dataRow}
                    closeModal={closeModal}
                />
            )}
            {openModalDelete && (
                <DeleteRouterMikrotik
                    showModal={openModalDelete}
                    state={dataRow}
                    closeModal={closeModal}
                />
            )}
        </AuthenticatedLayout>
    );
}

const Password = ({ value, show, handleShowPassword }) => {
    const textPrivate = "*";
    if (show) {
        return (
            <div className="flex gap-2">
                <span>{value}</span>
                <EyeSlashIcon
                    className="w-4 cursor-pointer"
                    onClick={handleShowPassword}
                />
            </div>
        );
    } else {
        return (
            <div className="flex gap-2">
                <span>{textPrivate.repeat(value.length)}</span>
                <EyeIcon
                    className="w-4 -mt-1.5 cursor-pointer"
                    onClick={handleShowPassword}
                />
            </div>
        );
    }
};

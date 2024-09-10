import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useMemo, useState } from "react";
import CreateUser from "./Create";
import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Table } from "@/Components/Table";
import { TableAction } from "@/Components/TableAction";
import ShowUser from "./Show";
import EditUser from "./Edit";
import DeleteUser from "./Delete";

export default function ClientIndex({ auth, users }) {
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalShow, setOpenModalShow] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [dataRow, setDataRow] = useState();

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

    const data = useMemo(() => users.data, []);

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
            columnHelper.accessor("email", {
                header: () => "email",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("created_by_name", {
                header: () => "created by",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("updated_by_name", {
                header: () => "updated by",
                cell: (info) => info.getValue(),
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
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    User
                </h2>
            }
        >
            <Head title="User" />

            <div className="py-12">
                <div className="max-w-full mx-auto md:px-6">
                    <div className="flex justify-end pb-4">
                        <PrimaryButton
                            type="button"
                            onClick={() => setOpenModalCreate(true)}
                        >
                            New User
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
                <CreateUser
                    showModal={openModalCreate}
                    closeModal={closeModal}
                />
            )}
            {openModalShow && (
                <ShowUser
                    showModal={openModalShow}
                    state={dataRow}
                    closeModal={closeModal}
                />
            )}
            {openModalEdit && (
                <EditUser
                    showModal={openModalEdit}
                    state={dataRow}
                    closeModal={closeModal}
                />
            )}
            {openModalDelete && (
                <DeleteUser
                    showModal={openModalDelete}
                    state={dataRow}
                    closeModal={closeModal}
                />
            )}
        </AuthenticatedLayout>
    );
}

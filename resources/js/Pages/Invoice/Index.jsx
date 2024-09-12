import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useMemo, useState } from "react";
import CreateInvoice from "./Create";
import ShowInvoice from "./Show";
import EditInvoice from "./Edit";
import DeleteInvoice from "./Delete";
import PaymentAcceptedInvoice from "./PaymentAccepted";
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

export default function InvoiceIndex({ auth, invoices, subscribeds }) {
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalShow, setOpenModalShow] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalPaymentAccept, setOpenModalPaymentAccept] = useState(false);
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

    const paymentAccept = (data) => {
        setDataRow(data);
        setOpenModalPaymentAccept(true);
    };

    const closeModal = () => {
        setOpenModalCreate(false);
        setOpenModalShow(false);
        setOpenModalEdit(false);
        setOpenModalDelete(false);
        setOpenModalPaymentAccept(false);
        setDataRow();
    };

    const data = useMemo(() => invoices.data, [invoices.data]);

    const columnHelper = createColumnHelper();

    const table = useReactTable({
        columns: [
            columnHelper.accessor("#", {
                cell: (info) => info.row.index + 1,
                enableColumnFilter: false,
                enableSorting: false,
            }),
            columnHelper.accessor("inv_number", {
                header: () => "inv number",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("subscribed_name", {
                header: () => "client secret",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("date_of_use", {
                header: () => "date of use",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("day_of_use", {
                header: () => "day of use",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("date_of_bill", {
                header: () => "date of bill",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("discount_bill", {
                header: () => "discount bill",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("total_bill", {
                header: () => "total bill",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("payemented_at", {
                header: () => "payemented at",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("payemented_by", {
                header: () => "payemented by",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("payment_accepted_at", {
                header: () => "payment accepted at",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("payment_accepted_by", {
                header: () => "payment accepted by",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("action", {
                cell: (info) => (
                    <TableAction
                        data={info.cell.row.original}
                        paymentAccept={paymentAccept}
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
                    Invoice
                </h2>
            }
        >
            <Head title="Invoice" />

            <div className="py-12">
                <div className="max-w-full mx-auto md:px-6">
                    <div className="flex justify-end pb-4">
                        <PrimaryButton
                            type="button"
                            onClick={() => setOpenModalCreate(true)}
                        >
                            New Invoice
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
                <CreateInvoice
                    showModal={openModalCreate}
                    closeModal={closeModal}
                    subscribeds={subscribeds}
                />
            )}
            {openModalShow && (
                <ShowInvoice
                    showModal={openModalShow}
                    state={dataRow}
                    closeModal={closeModal}
                />
            )}
            {openModalEdit && (
                <EditInvoice
                    showModal={openModalEdit}
                    state={dataRow}
                    subscribeds={subscribeds}
                    closeModal={closeModal}
                />
            )}
            {openModalDelete && (
                <DeleteInvoice
                    showModal={openModalDelete}
                    state={dataRow}
                    closeModal={closeModal}
                />
            )}
            {openModalPaymentAccept && (
                <PaymentAcceptedInvoice
                    showModal={openModalPaymentAccept}
                    state={dataRow}
                    closeModal={closeModal}
                />
            )}
        </AuthenticatedLayout>
    );
}

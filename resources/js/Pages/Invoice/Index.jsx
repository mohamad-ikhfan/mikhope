import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import CreateInvoice from "./Create";
import InvoiceTable from "./Tabel";

export default function InvoiceIndex({ auth, invoices, subscribeds }) {
    const [showModalCreate, setShowModalCreate] = useState(false);

    const closeModal = () => {
        setShowModalCreate(false);
    };

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
                            onClick={() => setShowModalCreate(true)}
                        >
                            New Invoice
                        </PrimaryButton>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm md:rounded-lg">
                        <InvoiceTable
                            invoices={invoices}
                            subscribeds={subscribeds}
                        />
                    </div>
                </div>
            </div>

            {showModalCreate && (
                <CreateInvoice
                    showModal={showModalCreate}
                    closeModal={closeModal}
                    subscribeds={subscribeds}
                />
            )}
        </AuthenticatedLayout>
    );
}

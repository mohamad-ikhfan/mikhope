import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import CreateClient from "./Create";
import ClientTable from "./Table";

export default function ClientIndex({ auth, clients }) {
    const [showModalCreate, setShowModalCreate] = useState(false);

    const closeModal = () => {
        setShowModalCreate(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Client
                </h2>
            }
        >
            <Head title="Client" />

            <div className="py-12">
                <div className="max-w-full mx-auto md:px-6">
                    <div className="flex justify-end pb-4">
                        <PrimaryButton
                            type="button"
                            onClick={() => setShowModalCreate(true)}
                        >
                            New Client
                        </PrimaryButton>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm md:rounded-lg">
                        <ClientTable clients={clients} />
                    </div>
                </div>
            </div>

            {showModalCreate && (
                <CreateClient
                    showModal={showModalCreate}
                    closeModal={closeModal}
                />
            )}
        </AuthenticatedLayout>
    );
}

import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import CreateSubscribed from "./Create";
import SubscribedTable from "./Table";

export default function SubscribedIndex({
    auth,
    subscribeds,
    clients,
    packets,
}) {
    const [showModalCreate, setShowModalCreate] = useState(false);

    const closeModal = () => {
        setShowModalCreate(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Subscribed
                </h2>
            }
        >
            <Head title="Subscribed" />

            <div className="py-12">
                <div className="max-w-full mx-auto md:px-6">
                    <div className="flex justify-end pb-4">
                        <PrimaryButton
                            type="button"
                            onClick={() => setShowModalCreate(true)}
                        >
                            New Subscriber
                        </PrimaryButton>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm md:rounded-lg">
                        <SubscribedTable
                            subscribeds={subscribeds}
                            clients={clients}
                            packets={packets}
                        />
                    </div>
                </div>
            </div>

            {showModalCreate && (
                <CreateSubscribed
                    showModal={showModalCreate}
                    closeModal={closeModal}
                    clients={clients}
                    packets={packets}
                />
            )}
        </AuthenticatedLayout>
    );
}

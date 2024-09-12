import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function ShowClient({ showModal, closeModal, state }) {
    const { data } = useForm({
        identity_number: state.identity_number,
        full_name: state.full_name,
        phone: state.phone,
        email: state.email,
        address: state.address,
    });

    return (
        <Modal show={showModal} maxWidth="4xl">
            <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 className="mb-4 text-lg dark:text-gray-100">Show Client</h3>
                <form>
                    <div className="grid grid-cols-2 gap-6 pb-6">
                        <div className="col-span-full">
                            <InputLabel
                                htmlFor="identity_number"
                                value="Identity Number"
                            />

                            <TextInput
                                id="identity_number"
                                className="mt-1 block w-full"
                                value={data.identity_number}
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="full_name" value="Full Name" />

                            <TextInput
                                id="full_name"
                                className="mt-1 block w-full"
                                value={data.full_name}
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="phone" value="Phone Number" />

                            <TextInput
                                id="phone"
                                className="mt-1 block w-full"
                                value={data.phone}
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="address" value="Address" />

                            <TextInput
                                id="address"
                                className="mt-1 block w-full"
                                value={data.address}
                                readOnly={true}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <SecondaryButton
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            CLose
                        </SecondaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

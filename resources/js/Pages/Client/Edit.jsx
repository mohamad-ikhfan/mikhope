import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function EditClient({ showModal, closeModal, state }) {
    const { data, setData, put, errors, processing, reset, clearErrors } =
        useForm({
            identity_number: state.identity_number,
            full_name: state.full_name,
            phone: state.phone,
            email: state.email,
            address: state.address,
        });

    const submit = (e) => {
        e.preventDefault();

        put(route("client.update", state.id), {
            onSuccess: () => {
                reset();
                clearErrors();
                closeModal();
            },
        });
    };

    return (
        <Modal show={showModal} maxWidth="4xl">
            <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 className="mb-4 text-lg dark:text-gray-100">Edit Router</h3>
                <form onSubmit={submit}>
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
                                onChange={(e) =>
                                    setData("identity_number", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.identity_number}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="full_name" value="Full Name" />

                            <TextInput
                                id="full_name"
                                className="mt-1 block w-full"
                                value={data.full_name}
                                onChange={(e) =>
                                    setData("full_name", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.full_name}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="phone" value="Phone Number" />

                            <TextInput
                                id="phone"
                                className="mt-1 block w-full"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.phone}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.email}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="address" value="Address" />

                            <TextInput
                                id="address"
                                className="mt-1 block w-full"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.address}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>
                            Update
                        </PrimaryButton>
                        <SecondaryButton
                            disabled={processing}
                            onClick={() => {
                                closeModal();
                                reset();
                                clearErrors();
                            }}
                        >
                            Cancel
                        </SecondaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

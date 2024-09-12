import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function EditPacket({ showModal, closeModal, state }) {
    const { data, setData, put, errors, processing, reset, clearErrors } =
        useForm({
            name: state.name,
            price: state.price,
            desciption: state.desciption,
        });

    const submit = (e) => {
        e.preventDefault();

        put(route("packet.update", state.id), {
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
                <h3 className="mb-4 text-lg dark:text-gray-100">Edit Packet</h3>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-6 pb-6">
                        <div className="col-span-full">
                            <InputLabel htmlFor="name" value="Packet Name" />

                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="price" value="Price" />

                            <TextInput
                                id="price"
                                className="mt-1 block w-full"
                                value={data.price}
                                onChange={(e) =>
                                    setData("price", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.price}
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="desciption"
                                value="Description"
                            />

                            <TextInput
                                id="desciption"
                                className="mt-1 block w-full"
                                value={data.desciption}
                                onChange={(e) =>
                                    setData("desciption", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.desciption}
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

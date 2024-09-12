import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function ShowPacket({ showModal, closeModal, state }) {
    const { data } = useForm({
        name: state.name,
        price: state.price,
        desciption: state.desciption,
    });

    return (
        <Modal show={showModal} maxWidth="4xl">
            <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 className="mb-4 text-lg dark:text-gray-100">Show Packet</h3>
                <form>
                    <div className="grid grid-cols-2 gap-6 pb-6">
                        <div className="col-span-full">
                            <InputLabel htmlFor="name" value="Packet Name" />

                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="price" value="Price" />

                            <TextInput
                                id="price"
                                className="mt-1 block w-full"
                                value={data.price}
                                readOnly={true}
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
                                readOnly={true}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <SecondaryButton
                            onClick={() => {
                                closeModal();
                                reset();
                                clearErrors();
                            }}
                        >
                            Close
                        </SecondaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

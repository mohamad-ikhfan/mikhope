import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function EditSubscribed({
    showModal,
    closeModal,
    subscribed,
    clients,
    packets,
}) {
    const { data, setData, put, errors, processing, reset, clearErrors } =
        useForm({
            client_id: subscribed.client_id,
            packet_id: subscribed.packet_id,
            client_secret: subscribed.client_secret,
            description: subscribed.description,
        });

    const submit = (e) => {
        e.preventDefault();

        put(route("subscribed.update", subscribed.id), {
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
                <h3 className="mb-4 text-lg dark:text-gray-100">
                    Edit Subscriber
                </h3>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-6 pb-6">
                        <div>
                            <InputLabel htmlFor="client_id" value="Client" />

                            <SelectInput
                                id="client_id"
                                className="mt-1 block w-full"
                                value={data.client_id}
                                onChange={(e) =>
                                    setData("client_id", e.target.value)
                                }
                            >
                                <option value="" disabled={true}>
                                    Select
                                </option>
                                {clients.map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.full_name}
                                    </option>
                                ))}
                            </SelectInput>

                            <InputError
                                className="mt-2"
                                message={errors.client_id}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="packet_id" value="Packet" />

                            <SelectInput
                                id="packet_id"
                                className="mt-1 block w-full"
                                value={data.packet_id}
                                onChange={(e) =>
                                    setData("packet_id", e.target.value)
                                }
                            >
                                <option value="" disabled={true}>
                                    Select
                                </option>
                                {packets.map((packet) => (
                                    <option key={packet.id} value={packet.id}>
                                        {packet.name}
                                    </option>
                                ))}
                            </SelectInput>

                            <InputError
                                className="mt-2"
                                message={errors.packet_id}
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="client_secret"
                                value="Client Secret"
                            />

                            <TextInput
                                id="client_secret"
                                className="mt-1 block w-full"
                                value={data.client_secret}
                                onChange={(e) =>
                                    setData("client_secret", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.client_secret}
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="description"
                                value="Description"
                            />

                            <TextInput
                                id="description"
                                className="mt-1 block w-full"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.description}
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

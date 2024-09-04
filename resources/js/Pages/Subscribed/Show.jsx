import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function ShowSubscribed({
    showModal,
    closeModal,
    subscribed,
    clients,
    packets,
}) {
    const { data } = useForm({
        client_id: subscribed.client_id,
        packet_id: subscribed.packet_id,
        client_secret: subscribed.client_secret,
        description: subscribed.description,
    });

    return (
        <Modal show={showModal} maxWidth="4xl">
            <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 className="mb-4 text-lg dark:text-gray-100">
                    Show Subscriber
                </h3>
                <form>
                    <div className="grid grid-cols-2 gap-6 pb-6">
                        <div>
                            <InputLabel htmlFor="client_id" value="Client" />

                            <SelectInput
                                id="client_id"
                                className="mt-1 block w-full"
                                value={data.client_id}
                                disabled={true}
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
                        </div>

                        <div>
                            <InputLabel htmlFor="packet_id" value="Packet" />

                            <SelectInput
                                id="packet_id"
                                className="mt-1 block w-full"
                                value={data.packet_id}
                                disabled={true}
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
                                readOnly={true}
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
                            Close
                        </SecondaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

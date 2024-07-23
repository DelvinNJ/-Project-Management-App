import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";

export default function Create({ auth }) {
    const { data, setData, processing, errors, reset, post } = useForm({
        image_path: '',
        name: '',
        description: '',
        status: '',
        due_date: ''
    });
    const onSubmit = (e) => {
        e.preventDefault();
        post(route('project.store'));
    }

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create new project</h2>
                </div>
            }
        >
            <Head title="Project" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-gray-900 dark:text-gray-100">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <div className="p-6 text-gray-900 dark:text-gray-100">
                                    Projects
                                </div>
                                <form className="px-6 pb-6 mt-6 space-y-6" onSubmit={onSubmit}>
                                    <div>
                                        <InputLabel htmlFor="image_path" value="Image" />

                                        <TextInput
                                            id="image_path"
                                            name="image_path"
                                            className="block w-full"
                                            type="file"
                                            isFocused={true}
                                            onChange={(e) => setData("image_path", e.target.files[0])}
                                        />
                                        <InputError message={errors.image_path} className="mt-2" />

                                    </div>
                                    <div>
                                        <InputLabel htmlFor="name" value="Name" />

                                        <TextInput
                                            id="name"
                                            name="name"
                                            className="mt-1 block w-full"
                                            type="text"
                                            value={data.name}
                                            isFocused={true}
                                            onChange={(e) => setData("name", e.target.value)}
                                        />
                                        <InputError message={errors.name} className="mt-2" />

                                    </div>

                                    <div>
                                        <InputLabel htmlFor="description" value="Description" />

                                        <TextAreaInput
                                            id="description"
                                            name="description"
                                            className="mt-1 block w-full"
                                            rows="4"
                                            value={data.description}
                                            isFocused={true}
                                            onChange={(e) => setData("description", e.target.value)}
                                        />
                                        <InputError message={errors.description} className="mt-2" />

                                    </div>
                                    <div>
                                        <InputLabel htmlFor="status" value="Status" />

                                        <SelectInput
                                            id="status"
                                            name="status"
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData("status", e.target.value)}
                                        >
                                            <option></option>
                                            <option value="pending">Pending</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </SelectInput>
                                        <InputError message={errors.status} className="mt-2" />

                                    </div>

                                    <div>
                                        <InputLabel htmlFor="due_date" value="Due Date" />

                                        <TextInput
                                            id="due_date"
                                            name="due_date"
                                            className="mt-1 block w-full"
                                            type="date"
                                            value={data.due_date}
                                            isFocused={true}
                                            onChange={(e) => setData("due_date", e.target.value)}
                                        />
                                        <InputError message={errors.due_date} className="mt-2" />

                                    </div>

                                    <div className="flex items-center justify-end mt-4">
                                        <Link
                                            className="ms-4 inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150"
                                            href={route('project.index')}>
                                            Cancel
                                        </Link>
                                        <PrimaryButton className="ms-4" disabled={processing}>
                                            Save
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
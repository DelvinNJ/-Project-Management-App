import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/Components/Constant";
import Pagination from "@/Components/Pagination";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ auth, projects }) {
    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Project" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">Projects</div>
                        <div className="text-gray-900 dark:text-gray-100">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                Project ID
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                Image
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                Project name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                Description
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                Due date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                Created By
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.data.map((product) => (
                                            <tr key={product.id}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {product.id}
                                                </th>
                                                <td className="px-6 py-4">
                                                    <img src={product.imagePath} alt="" width="60" />
                                                </td>
                                                <td className="px-6 py-4">
                                                    {product.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {product.description}
                                                </td>
                                                <td className="px-6 py-4 text-nowrap">
                                                    {product.dueDate}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {product.createdBy.name}
                                                </td>
                                                <td className="px-6 py-4 text-nowrap ">
                                                    <span className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[product.status]}>
                                                        {PROJECT_STATUS_TEXT_MAP[product.status]}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated >
    );
}
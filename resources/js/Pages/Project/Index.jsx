import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP
} from "@/Components/Constant";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect } from "react";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Index({ auth, flash, projects, queryParams = null }) {
    // Filtering
    queryParams = queryParams || {};
    queryParams.filter = queryParams.filter || {};
    queryParams.sort = queryParams.sort || '';

    const sortOptions = queryParams.sort ? queryParams.sort.split(',') : [];

    const searchFieldChanged = (name, value) => {
        if (queryParams.filter.name === value || (queryParams.filter.name === undefined && value === ''))
            return;
        if (value)
            queryParams.filter[name] = value;
        else
            delete queryParams.filter[name];
        queryParams.page = 1;
        router.get(route('project.index'), queryParams);
    }

    const onKeyPress = (name, e) => {
        if (e.key === 'Enter')
            searchFieldChanged(name, e.target.value);
    }

    // Sorting 
    const sortChange = (name) => {
        const index = sortOptions.findIndex(item => (item === name || item === `-${name}`));
        if (index !== -1) {
            sortOptions[index] = sortOptions[index] === name ? `-${name}` : name;
        }
        else {
            sortOptions.push(name);
        }
        queryParams.sort = sortOptions.toString()
        router.get(route('project.index'), queryParams);
    }

    useEffect(() => {
        if (flash.message.success) {
            toast.success(flash.message.success, {
                transition: Slide,
                autoClose: 2000,
            });
        }
        if (flash.message.error) {
            toast.error(flash.message.error, {
                transition: Slide,
                autoClose: 2000,
            });
        }
    }, [flash])
    // Delete project 
    const deleteProject = (id) => {
        if (!window.confirm('Are you sure')) {
            return;
        }
        router.delete(route('project.destroy', id), {
            preserveScroll: true
        });
    }
    const clearFilter = () => {
        queryParams.filter = {};
        queryParams.sort = '';
        router.get(route('project.index'), queryParams);
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Project</h2>
                    <Link
                        href={route('project.create')}
                        className="inline-flex items-center px-4 py-2 bg-emerald-500 dark:bg-emerald-500 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                        Add project
                    </Link>

                </div>
            }
        >
            <Head title="Project" />

            <ToastContainer />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-between">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                Projects
                            </div>
                            {(queryParams.sort !== '' || Object.keys(queryParams.filter).length !== 0) && (
                                <div className="p-6 text-gray-900 dark:text-gray-100" onClick={(e) => clearFilter()}>
                                    <FaFilterCircleXmark />
                                </div>
                            )}

                        </div>
                        <div className="text-gray-900 dark:text-gray-100">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                                        <tr>
                                            <TableHeading
                                                sortChange={sortChange}
                                                filed_name='id'
                                                sortList={sortOptions}
                                            >
                                                ID
                                            </TableHeading>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                Image
                                            </th>
                                            <TableHeading
                                                sortChange={sortChange}
                                                filed_name='name'
                                                sortList={sortOptions}
                                            >
                                                Project name
                                            </TableHeading>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                Status
                                            </th>
                                            {/* <th scope="col" className="px-6 py-3 text-nowrap">
                                                Description
                                            </th> */}
                                            <TableHeading
                                                sortChange={sortChange}
                                                filed_name='due_date'
                                                sortList={sortOptions}
                                            >
                                                Due date
                                            </TableHeading>
                                            <TableHeading
                                                sortChange={sortChange}
                                                filed_name='createdBy.name'
                                                sortList={sortOptions}
                                            >
                                                Created By
                                            </TableHeading>
                                            <th scope="col" className="px-6 py-3">
                                                Action
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-nowrap">

                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">

                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                <TextInput placeholder="Project Name"
                                                    className="w-40"
                                                    defaultValue={queryParams.filter?.name || ''}
                                                    onKeyPress={(e) => onKeyPress('name', e)}
                                                    onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                                />
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                <SelectInput
                                                    defaultValue={queryParams.filter?.status || ''}
                                                    onChange={(e) => (searchFieldChanged('status', e.target.value))}>
                                                    <option value="">Select Status</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="in_progress">In Progress</option>
                                                    <option value="completed">Completed</option>
                                                </SelectInput>
                                            </th>
                                            {/* <th scope="col" className="px-6 py-3 text-nowrap">

                                            </th> */}
                                            <th scope="col" className="px-6 py-3 text-nowrap">

                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                <TextInput placeholder="Created By"
                                                    className="w-40"
                                                    defaultValue={queryParams.filter ? queryParams.filter['createdBy.name'] || '' : ''}
                                                    onKeyPress={(e) => onKeyPress('createdBy.name', e)}
                                                    onBlur={(e) => searchFieldChanged('createdBy.name', e.target.value)}
                                                />
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-center">

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.data.map((project) => (
                                            <tr key={project.id}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {project.id}
                                                </th>
                                                <td className="px-6 py-4">
                                                    <img src={project.imagePath} alt="" width="60" />
                                                </td>
                                                <td className="px-6 py-4 text-white">
                                                    <Link className="hover:underline" href={route('project.show', project.id)}>
                                                        {project.name}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 text-nowrap ">
                                                    <span className={"block w-24 text-center px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                                                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                    </span>
                                                </td>
                                                {/* <td className="px-6 py-4">
                                                    {project.description}
                                                </td> */}
                                                <td className="px-6 py-4 text-nowrap">
                                                    {project.dueDate}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {project.createdBy.name}
                                                </td>
                                                <td className="px-6 py-4 text-center text-nowrap">
                                                    <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">Edit</Link>
                                                    <button onClick={e => deleteProject(project.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">Delete</button>
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
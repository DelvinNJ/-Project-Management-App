import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/Components/Constant";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TasksTable from "../Task/TasksTable";

export default function Show({ auth, project, tasks, queryParams }) {

    // Filtering
    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                {`Project - ${project.name}`}
            </h2>}
        >
            <Head title="Project"></Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Projects
                        </div>
                        <div className="text-gray-900 dark:text-gray-100">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <section className="body-font overflow-hidden">
                                    <div className="container px-5 py-14 mx-auto">
                                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                                            <img alt={project.name}
                                                className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                                                src={project.imagePath} />
                                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                                <h1 className="text-gray-300 text-4xl title-font font-bold mb-1">{project.name}</h1>
                                                <div className="flex mb-4">
                                                    <span className={"block w-24 text-center px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                                                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                    </span>
                                                </div>
                                                <p className="leading-relaxed text-justify">{project.description}</p>
                                                <p className="text-right text-xs leading-relaxed">
                                                    Created by - {project.createdBy.name}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <TasksTable routerName={'project.show'} projectId={project.id} tasks={tasks} queryParams={queryParams} hideProjectColumn={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Authenticated>
    );
}
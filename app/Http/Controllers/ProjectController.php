<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Inertia\Inertia;
use App\Models\Project;
use App\Http\Filters\ProjectName;
use App\Http\Filters\StatusFilter;
use App\Http\Resources\TaskResource;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use App\Http\Filters\CreatedByNameSort;
use App\Http\Resources\ProjectResource;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = QueryBuilder::for(Project::class)
            ->allowedFilters([
                'name',
                'createdBy.name',
                AllowedFilter::custom('status', new StatusFilter)

            ])
            ->allowedSorts([
                'id',
                'name',
                'due_date',
                AllowedSort::custom('createdBy.name', new CreatedByNameSort)
            ])
            ->with('createdBy')
            ->paginate(10)->onEachSide(2)->withQueryString();

        return inertia('Project/Index', [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            'success' => session('success') ?: null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia('Project/Create', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $image = $request->file('image_path') ?? null;
        if ($image) {
            $uniqueFileName = uniqid() . '_' . $image->getClientOriginalName();
            $data['image_path'] = $image->storeAs('project', $uniqueFileName, 'public');
        }
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        Project::create($data);

        return to_route('project.index')
            ->with('success', 'New project was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $tasks = QueryBuilder::for(Task::class)
            ->where('project_id', $project->id)
            ->allowedFilters([
                'name',
                'createdBy.name',
                'project.name',
                AllowedFilter::custom('status', new StatusFilter)

            ])
            ->allowedSorts([
                'id',
                'name',
                'due_date',
                AllowedSort::custom('project.name', new ProjectName),
                AllowedSort::custom('createdBy.name', new CreatedByNameSort)
            ])
            ->with('project')
            ->with('createdBy')
            ->paginate(10)->onEachSide(2)->withQueryString();


        return Inertia('Project/Show', [
            'project' => new ProjectResource($project->load('createdBy')),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()
            ->back()
            ->with('success', 'Project was deleted');
    }
}

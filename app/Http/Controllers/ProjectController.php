<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Filters\StatusFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use App\Http\Filters\CreatedByNameSort;
use App\Http\Resources\ProjectResource;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // dump(request()->query());
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
            ->paginate(10)->onEachSide(1)->withQueryString();

        return inertia('Project/Index', [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
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
        //
    }
}

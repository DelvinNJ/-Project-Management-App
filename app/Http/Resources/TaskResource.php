<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'imagePath' => $this->image_path,
            'status' => $this->status,
            'priority' => $this->priority,
            'dueDate' => date('Y-m-d', strtotime($this->due_date)),
            'assigned_user_id' => new UserResource($this->whenLoaded('createdBy')),
            'createdBy' =>  new UserResource($this->whenLoaded('createdBy')),
            'updatedBy' => new UserResource($this->whenLoaded('updatedBy')),
            'project' => new ProjectResource($this->whenLoaded('project'))

        ];
    }
}

<?php

namespace App\Http\Filters;

use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;


class StatusFilter  implements Filter
{

    public function __invoke(Builder $query, $value, string $property)
    {
        $query->where($property, 'LIKE', '%' . $value . '%');
    }
}

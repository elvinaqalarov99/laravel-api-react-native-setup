<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'icon', 'icon_type', 'active'];

    protected $casts = ['active' => 'boolean'];

    public function scopeIsActive($query)
    {
        return $query->where('active', 1);
    }
}

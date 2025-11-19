<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = [
        'name', 'slug', 'logo_url', 'website', 'location', 'description'
    ];

    public function jobs()
    {
        return $this->hasMany(Job::class);
    }
}
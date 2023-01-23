<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Music extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'file',
        'cover',
        'type',
        'duration',
        'size',
        'data',
        'artist_id',
    ];
}

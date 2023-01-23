<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    use HasFactory;

    public $fillable = [
        'full_name',
        'voice_gender',
        'phone_number',
        'email',
        'description',
        'medias',
        'social_youtube',
        'social_tiktok',
        'social_instagram',
        'data',
    ];

    public function musics()
    {
        return $this->hasMany(MusicRequest::class, 'artist_id', 'id');
    }

    public function music()
    {
        return $this->hasOne(MusicRequest::class, 'artist_id', 'id')->where('music_requests.is_main', true);
    }

    /**
     * Determine if the user is an administrator.
     *
     * @return mixed
     */
    public function getDataAttribute()
    {
        try {
            $value = $this->getAttributes()['data'] ? json_decode($this->getAttributes()['data']) : null;
            return $value;
        } catch (\Exception $exception) {
            return null;
        }
    }
}

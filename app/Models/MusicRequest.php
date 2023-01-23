<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

class MusicRequest extends Model
{
    use HasFactory;

    public $fillable = [
        'artist_id',
        'user_id',
        'choice_artist',
        'delivery_type',
        'data',
        'is_payed',
        'payment_status', // waiting,payed,canceled,error
        'payment_reference',
        'status', //waiting_payment,waiting_images,waiting_production,finished
        'payed_at',
        'delivery_date',
        'delivered_at',
        'price_total',
        'privacy',
        'is_main',
    ];

    public $timestamps = [
        'payed_at',
        'delivery_date',
        'delivered_at',
    ];

    public $appends = [
        'music',
    ];

    public function getMusicAttribute()
    {
        $data = json_decode(json_encode($this->data), true);
        $mapper = [
            'name' => 'admin.musicName',
            'file' => 'admin.musicFile',
            'lyrics' => 'admin.musicLetter',
            'link_music_app' => 'admin.musicAppsLink',
            'video_file' => 'admin.singerFile',
            'video_youtube' => 'admin.singerYoutube',
            'visualizer_file' => 'admin.visualizerFile',
            'visualizer_youtube' => 'admin.visualizerYoutube',
            'artist_record_file' => 'admin.artistRecordFile',
            'ocasion' => 'ocasions',
            'sentiments' => 'sentiments',
            'song_type' => 'songType',
        ];

        $music = [];
        foreach ($mapper as $keyMapper => $valueMapper) {
            try {
                $music[$keyMapper] = Arr::pull($data, $valueMapper);
            } catch (\Exception $e) {
                Log::error("Cannot get Music Property [$keyMapper][$valueMapper]");
            }
        }

        return array_merge(
            ['id' => $this->id],
            $music,
            [
                'artist' => $this->artist,
                'is_main' => $this->is_main,
            ]
        );
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

    /**
     * Get Artist
     */
    public function artist()
    {
        return $this->hasOne(Artist::class, 'id', 'artist_id');
    }

    /**
     * Get User
     */
    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}

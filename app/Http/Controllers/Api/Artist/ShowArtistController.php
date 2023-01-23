<?php

namespace App\Http\Controllers\Api\Artist;

use App\Http\Contract\HttpResponse;
use App\Http\Controllers\Controller;
use App\Models\Artist;
use Illuminate\Http\Request;

class ShowArtistController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Artist $artist)
    {
        $artist->load('musics');
        $response = HttpResponse::create()->setData([
            'artist' => $artist,
        ])->setStatus(200);

        return $response->toLaravel();
    }
}

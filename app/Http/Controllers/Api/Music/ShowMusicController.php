<?php

namespace App\Http\Controllers\Api\Music;

use App\Http\Contract\HttpResponse;
use App\Http\Controllers\Controller;
use App\Models\MusicRequest;

class ShowMusicController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(MusicRequest $musicRequest)
    {
        $musicRequest->load(['user', 'artist']);
        return HttpResponse::create()->setStatus(200)->setData([
            'music' => $musicRequest->music,
        ])->toLaravel();
    }
}

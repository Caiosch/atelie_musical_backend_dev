<?php

namespace App\Http\Controllers\Api\Music;

use App\Http\Controllers\Controller;
use App\Http\Factories\HttpModelQuery;
use App\Models\MusicRequest;
use Illuminate\Http\Request;

class FilterMusicRequestController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $user = $request->user();
        $isAdmin = $user->role === 'admin';
        $input = $request->all();
        $query = MusicRequest::query();

        if (isset($input['pending'])) {
            $query = $query->whereNull('user_id');
        } else {
            if (!$isAdmin) {
                $query = $query->where('user_id', $request->user()->id);
            }
        }

        return HttpModelQuery::make(
            $query,
            $request
        );
    }
}

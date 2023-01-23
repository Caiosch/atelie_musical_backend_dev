<?php

namespace App\Http\Controllers\Api\Artist;

use App\Http\Contract\HttpResponse;
use App\Http\Controllers\Controller;
use App\Http\Factories\HttpMediaFactory;
use App\Http\Factories\HttpModelQuery;
use App\Models\AppTag;
use App\Models\Artist;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CreateArtistController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $input = $request->validate([
            'fullName' => ['string', 'required'],
            'phoneNumber' => ['string', 'nullable'],
            'voice' => ['required', 'string', Rule::in(['M', 'F'])],
            'email' => ['nullable', 'email'],
            'socialYoutube' => ['nullable', 'string'],
            'socialTiktok' => ['nullable', 'string'],
            'socialInstagram' => ['nullable', 'string'],
            'musicalStyles' => ['array', 'required'],
            'musicalStyles.*' => [Rule::exists(AppTag::class, 'key')],
            'images' => ['nullable', 'array'],
            'musics' => ['nullable', 'array'],
            'description' => ['nullable', 'string'],
        ]);

        $artist = Artist::create([
            'full_name' => $input['fullName'],
            'voice_gender' => $input['voice'],
            'phone_number' => $input['phoneNumber'],
            'email' => $input['email'],
            'description' => $input['description'] ?? '',
            'social_youtube' => $input['socialYoutube'],
            'social_tiktok' => $input['socialTiktok'],
            'social_instagram' => $input['socialInstagram'],
            'data' => json_encode([
                'musics' => HttpMediaFactory::resolveMedias($input['musics'] ?? []),
                'images' => HttpMediaFactory::resolveMedias($input['images'] ?? []),
                'musicalStyles' => $input['musicalStyles'] ?? [],
            ])
        ]);

        return HttpResponse::create()
            ->setData([
                'artist' => $artist,
            ])
            ->setTitle("Sucesso!")
            ->setMessage("Artista cadastrado com sucesso!")
            ->setStatus(201)
            ->toLaravel();

        // $artist->data = json_encode($input['data']);

        // return HttpModelQuery::make(Artist::class, $request);
    }
}

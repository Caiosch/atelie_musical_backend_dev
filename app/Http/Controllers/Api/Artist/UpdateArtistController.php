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

class UpdateArtistController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, Artist $artist)
    {
        $input = $request->validate([
            'fullName' => ['string'],
            'phoneNumber' => ['string', 'nullable'],
            'voice' => ['string', Rule::in(['M', 'F']), 'required'],
            'email' => ['email'],
            'socialYoutube' => ['nullable', 'string'],
            'socialTiktok' => ['nullable', 'string'],
            'socialInstagram' => ['nullable', 'string'],
            'musicalStyles' => ['array'],
            'musicalStyles.*' => [Rule::exists(AppTag::class, 'key')],
            'images' => ['array'],
            'musics' => ['array'],
            'description' => ['string'],
        ]);

        $artist->update([
            'full_name' => $input['fullName'] ?? $artist->full_name,
            'voice_gender' => $input['voice'] ?? $artist->voice,
            'phone_number' => $input['phoneNumber'] ?? $artist->phone_number,
            'email' => $input['email'] ?? $artist->email,
            'description' => $input['description'] ?? $artist->description,
            'social_youtube' => $input['socialYoutube'] ?? $artist->social_youtube,
            'social_tiktok' => $input['socialTiktok'] ?? $artist->social_tiktok,
            'social_instagram' => $input['socialInstagram'] ?? $artist->social_instagram,
            'data' => json_encode([
                'musics' => HttpMediaFactory::resolveMedias($input['musics'] ?? []),
                'images' => HttpMediaFactory::resolveMedias($input['images'] ?? []),
                'musicalStyles' => $input['musicalStyles'] ?? $artist->data->musicalStyles ?? [],
            ])
        ]);

        return HttpResponse::create()
            ->setData([
                'artist' => $artist,
            ])
            ->setTitle("Sucesso!")
            ->setMessage("Artista cadastrado com sucesso!")
            ->setStatus(204)
            ->toLaravel();
    }
}

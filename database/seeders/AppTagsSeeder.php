<?php

namespace Database\Seeders;

use App\Models\AppTag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Mockery\Undefined;

class AppTagsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = [
            // Occasion
            ['maes-e-pais', 'Mães e Pais', 'occasion'],
            ['familia', 'Família', 'occasion'],
            ['kids', 'Kids', 'occasion'],
            ['infantil', 'Infantil', 'occasion'],
            ['pra-ele', 'Pra Ele', 'occasion'],
            ['pro-casal', 'Pro Casal', 'occasion'],
            ['amizade', 'Amizade', 'occasion'],
            ['corporativo', 'Corporativo', 'occasion'],
            ['especiais', 'Especiais', 'occasion'],
            ['casamento', 'Casamento', 'occasion'],
            ['outros', 'Outros', 'occasion'],
            // Projects
            ['campanha-publicitaria', 'Campanha Publicitária', 'project'],
            ['comemoracao-interna', 'Comemoração Interna', 'project'],
            ['para-um-colaborador', 'Para um Colaborador', 'project'],
            ['para-um-cliente-especial', 'Para um Cliente Especial', 'project'],
            ['para-uma-equipe', 'Para uma Equipe', 'project'],
            ['campanha-institucional', 'Campanha Institucional', 'project'],
            ['para-uma-equipe', 'Para uma Equipe', 'project'],
            ['campanha-institucional', 'Campanha Institucional', 'project'],
            ['campanha-de-relacionamento', 'Campanha de Relacionamento', 'project'],
            ['endomarketing', 'Endomarketing', 'project'],
            ['outro', 'Outro', 'project'],
            // Sentimentos
            ['alegre', 'Alegre', 'sentiment'],
            ['romantica', 'Romântica', 'sentiment'],
            ['leve', 'Leve', 'sentiment'],
            ['dancante', 'Dançante', 'sentiment'],
            ['animada', 'Animada', 'sentiment'],
            ['comica', 'Cômica', 'sentiment'],
            ['emocionante', 'Emocionante', 'sentiment'],
            ['especiais', 'Especiais', 'sentiment'],
            ['introspectiva', 'Introspectiva', 'sentiment'],
            // Estilos Musicais
            ['bossa-nova', 'Bossa Nova', 'musicalStyle', '#B36F28', '#FFF3BE'],
            ['samba', 'Samba', 'musicalStyle', '#D5AA50', '#FEF2BC'],
            ['infantil', 'Infantil', 'musicalStyle', '#FBDD58', '#504454'],
            ['folk', 'Folk', 'musicalStyle', '#936423', '#E4CF97'],
            ['indie', 'Indie', 'musicalStyle', '#654A6E', '#ECDEB4'],
            ['mpb', 'MPB', 'musicalStyle', '#FBDD58', '#654A6E'],
            ['pop', 'Pop', 'musicalStyle', '#FEF2BC', '#504454'],
            ['reggae', 'Reggae', 'musicalStyle', '#DD9F3E', '#E4CF97'],
            ['rock', 'Rock', 'musicalStyle', '#4B2419', '#FFF3BE'],
            ['sertaneijo', 'Sertanejo', 'musicalStyle', '#654A6E', '#DD9F3E'],
            ['eletronico', 'Eletrônico', 'musicalStyle', '#D5AA50', '#FEF2BC'],
            ['soul', 'Soul', 'musicalStyle', '#D5AA50', '#FEF2BC'],
            // Fonte de Conhecimento
            ['instagram', 'Instagram', 'howMeetUs'],
            ['facebook', 'Facebook', 'howMeetUs'],
            ['friend', 'Indicação de um amigo', 'howMeetUs'],
            ['influencer', 'Influencer', 'howMeetUs'],
            ['google', 'Google', 'howMeetUs'],
            ['outro', 'Outros', 'howMeetUs'],
        ];

        foreach ($items as $values) {
            AppTag::updateOrCreate(['key' => $values[0]], [
                'key' => $values[0],
                'value' => $values[1],
                'type' => $values[2],
                'bg' => $values[3] ?? null,
                'color' => $values[4] ?? null,
            ]);
        }
    }
}

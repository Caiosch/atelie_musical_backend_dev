<x-mail::message>
    <x-mail::title>Você solicitou o Reset de Senha. <br /> Clique no botão abaixo para resetar sua senha!</x-mail::title>
    <x-mail::button :url="$url">
        @lang("Resetar Senha")
    </x-mail::button>
</x-mail::message>

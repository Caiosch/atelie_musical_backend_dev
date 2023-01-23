@props(['url'])
<tr>
    <td class="header">
        <a href="{{ $url }}" style="display: inline-block;">
            @if (trim($slot) === 'Laravel')
            <img src="https://laravel.com/img/notification-logo.png" class="logo" alt="Laravel Logo">
            @else
            <img src="https://meubemquere.com/wp-content/uploads/2022/01/Logo-AMU-Amarelo-Marrom-Onda2-29-1-e1666882683539.png" class="logo" :alt="$slot">
            <!-- {{ $slot }} -->
            @endif
        </a>
    </td>
</tr>

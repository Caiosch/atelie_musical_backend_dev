<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

## Deploy (Docker)

Remove project if exists:
```sh
cd ../ \
rm -rf meubemquere.api.idevit.app/
```

Clone and deploy:
```sh
sudo git clone https://kodiyak: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@github.com/kodiyak/MeuBemQuerer ./meubemquere.api.idevit.app \
cd meubemquere.api.idevit.app \
docker-compose down -v \
docker-compose up --build --force-recreate -d
```

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

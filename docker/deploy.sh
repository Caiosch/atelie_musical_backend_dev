#!/bin/bash

cd ../
rm -rf meubemquere.api.idevit.app/
sudo git clone https://kodiyak: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@github.com/kodiyak/MeuBemQuerer ./meubemquere.api.idevit.app
cd meubemquere.api.idevit.app
docker-compose down -v
docker-compose up --build --force-recreate -d

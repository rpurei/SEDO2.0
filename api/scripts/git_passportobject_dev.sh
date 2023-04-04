#!/bin/bash
cd /var/www/passportobject
git pull
cd /var/www/passportobject/front
npm install
ng build
chown -R www-data:www-data /var/www/passportobject
systemctl stop passportobject
systemctl start passportobject
systemctl restart nginx

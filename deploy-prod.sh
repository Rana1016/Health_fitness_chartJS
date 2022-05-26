#!/bin/bash


cd ~/doctor-frontend
git reset --hard
git pull
npm ci
ng build --build-optimizer --prod
scp -r /home/ubuntu/doctor-frontend/dist/doctor ubuntu@web02.strongaustin.com:/home/ubuntu/doctor-frontend/dist
scp -r /home/ubuntu/doctor-frontend/dist/doctor ubuntu@web01.strongaustin.com:/home/ubuntu/doctor-frontend/dist && echo "successfully copied"

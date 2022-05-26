#!/bin/bash


cd ~/doctor-frontend
git pull
npm ci
ng build --build-optimizer --configuration staging
scp -r /home/ubuntu/doctor-frontend/dist/doctor ubuntu@staging-web01.strongaustin.com:/home/ubuntu/doctor-frontend/dist
scp -r /home/ubuntu/doctor-frontend/dist/doctor ubuntu@staging-web02.strongaustin.com:/home/ubuntu/doctor-frontend/dist

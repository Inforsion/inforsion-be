#!/bin/bash

npx prisma db push
node dist/bin/www.js
#!/bin/bash

npx prisma migrate dev
node dist/bin/www.js
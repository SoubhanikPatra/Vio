#!/bin/bash
node -e "setInterval(() => console.log('server'), 1000)" &
node -e "console.log('isTTY:', process.stdout.isTTY); setInterval(() => console.log('metro'), 1000)"

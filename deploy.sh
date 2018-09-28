#!/bin/bash
if [ -z "$EC2_IP_ADDRESS" ] || [ "$EC2_IP_ADDRESS" == 'SET IP ADDRESS HERE' ]
then
  echo "You forgot to set your IP Address in 'env.sh' :("
  exit
fi

ssh -i ~/.ssh/stable_dashboard.pem ec2-user@$EC2_IP_ADDRESS << EOF
  cd stable-coin-compare
  source env.sh
  git pull
  forever stopall
  yarn build production
  forever start build/server.js
EOF

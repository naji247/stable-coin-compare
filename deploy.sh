#!/bin/bash
source env.sh
if [ -z "$EC2_IP_ADDRESS" ] || [ "$EC2_IP_ADDRESS" == 'SET IP ADDRESS HERE' ]
then
  echo "You forgot to set your IP Address in 'env.sh' :("
  exit
fi


echo "This could take a while... We're optimizing."
yarn build --release
tar czf build.tar build
echo "Sending build over the wire."
scp -i ~/.ssh/stable_dashboard.pem build.tar ec2-user@$EC2_IP_ADDRESS:
ssh -i ~/.ssh/stable_dashboard.pem ec2-user@$EC2_IP_ADDRESS << EOF
  tar -zxvf build.tar build
  rm -rf stable-coin-compare/build
  mv build stable-coin-compare/build
  cd stable-coin-compare
  source env.sh
  git pull
  forever stopall
  yarn install
  forever start build/server.js
  cd ~
  rm -rf build.tar
EOF

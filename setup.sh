npm i 

npx node-red &

while [ ! -d ~/.node-red ]
do
  sleep 1
done

killall node-red -HUP

cd ~/.node-red

npm i @rickpg/node-red-contrib-malloy
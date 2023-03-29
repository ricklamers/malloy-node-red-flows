npm i 

npx node-red &

while [ ! -d ~/.node-red ]
do
  sleep 1
done

killall node-red -HUP

npm i /workspaces/malloy-node-red-flows/node-red-contrib-malloy
# enable nodejs to use port 80
sudo setcap 'cap_net_bind_service=+ep' $(which node)

# set up for greenlock
From the [docs](https://git.rootprojects.org/root/greenlock-express.js.git):
1. npm init
2. npm install --save greenlock-express@v4
3. npx greenlock init --config-dir ./certificates --maintainer-email contact@minardo.org
4. npx greenlock add --subject minardo.org --altnames minardo.org,www.minardo.org
5. npm start -- --staging


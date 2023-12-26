# documentation
* [main](https://git.rootprojects.org/root/greenlock-express.js/src/branch/master)
* [using non-standard ports](https://git.rootprojects.org/root/greenlock-express.js/src/branch/master/examples/http/server.js)
* [videos](https://www.youtube.com/watch?v=e8vaR4CEZ5s&list=PLZaEVINf2Bq_lrS-OOzTUJB4q3HxarlXk&index=4)


# enable nodejs to use port 80
``sudo setcap 'cap_net_bind_service=+ep' $(which node)'``

# set up for greenlock
From the [docs](https://git.rootprojects.org/root/greenlock-express.js.git):
1. npm init
2. npm install --save greenlock-express@v4
3. npx greenlock init --config-dir ./certificates --maintainer-email contact@minardo.org
4. npx greenlock add --subject minardo.org --altnames minardo.org,www.minardo.org
5. npm start -- --staging


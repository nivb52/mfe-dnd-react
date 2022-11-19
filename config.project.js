module.exports = {
  microeFrontends: {
    /**@note: if you change the port and want to use the ```npm run build:start``` you may also need to change the port in the package.json */
    board: {
      port: 8080,
    },
    host: {
      port: 8081,
    },
  },
  api_gw: {
    port: 4000,
  },
};

const indexData = require("./index.js");
const hydrogenData = require("./hydrogen.js");
const heliumData = require("./helium.js");
const errorData = require("./404.js");
const styleData = require("./styles.js");

const net = require("net");

const server = net.createServer(socket => {
  // 'connection' listener
  console.log("client connected");
  socket.on("data", data => {
    let parsedData = data.toString();
    parsedData = parsedData.split("\n");
    console.log(parsedData);
    const requestLine = parsedData[0].split(" ");
    console.log(requestLine);
    const method = requestLine[0];
    console.log(method);
    const requestUri = requestLine[1];
    console.log(requestUri);

    if (method === "GET") {
      switch (requestUri) {
        case "/":
          socket.write(
            `HTTP/1.1 200 OK\nServer: nginx/1.4.6 (Ubuntu)\nContent-Type: text/html; charset=utf-8\n\n${indexData}`
          );
          socket.end();
          break;
        case "/index.html":
          socket.write(
            `HTTP/1.1 200 OK\nServer: nginx/1.4.6 (Ubuntu)\nContent-Type: text/html; charset=utf-8\n\n${indexData}`
          );
          socket.end();
          break;
        case "/hydrogen.html":
          socket.write(
            `HTTP/1.1 200 OK\nServer: nginx/1.4.6 (Ubuntu)\nContent-Type: text/html; charset=utf-8\n\n${hydrogenData}`
          );
          socket.end();
          break;
        case "/helium.html":
          socket.write(
            `HTTP/1.1 200 OK\nServer: nginx/1.4.6 (Ubuntu)\nContent-Type: text/html; charset=utf-8\n\n${heliumData}`
          );
          socket.end();
          break;
        case "/css/styles.css":
          socket.write(
            `HTTP/1.1 200 OK\nServer: nginx/1.4.6 (Ubuntu)\nContent-Type: css/text charset=utf-8\n\n${styleData}`
          );
          socket.end();
          break;
        default:
          socket.write(
            `HTTP/1.1 200 OK\nServer: nginx/1.4.6 (Ubuntu)\nContent-Type: text/html; charset=utf-8\n\n${errorData}`
          );
          socket.end();
          break;
      }
    }
    // socket.write(`<html><link href=${styleData} rel ='stylesheet'></html>`);
    // socket.end();
  });
});
server.on("error", err => {
  throw err;
});
server.listen(8080, () => {
  console.log("server bound");
});

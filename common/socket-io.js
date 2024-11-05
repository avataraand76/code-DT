const fs = require("fs");
const socketIo = require("socket.io");

const config = require("../data/constData");
const file = require("../common/writeFile");

const generateIncrementingId = (screenName) => {
  const pathfile = "../data/data_id/valueId.json";
  let valueId = file.readFileJson(pathfile);
  if (valueId != null) {
    let previousId = valueId.last_id;
    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const base = characters.length;
    let result = "";
    let carry = 1; // Start with a carry to increment the ID

    // Traverse the previous ID from right to left
    for (let i = previousId.length - 1; i >= 0; i--) {
      let index = characters.indexOf(previousId[i]) + carry;

      if (index >= base) {
        index = 0; // Reset to '0' or 'A' with a carry over
        carry = 1; // Continue the carry over
      } else {
        carry = 0; // No carry over needed
      }

      result = characters[index] + result;
    }

    // If there's a carry left after the loop, it means we need to add one more digit
    if (carry) {
      result = "0" + result;
    }
    let newId = result.padStart(12, "0"); // Ensure the result is always 12 characters long
    valueId = { ...valueId, last_id: newId };
    valueId.list_id = [
      ...valueId.list_id,
      { screenName: screenName, id: newId },
    ];
    //console.log(valueId);
    file.writeFile(pathfile, JSON.stringify(valueId, null, 2));
    return newId;
  }
  return null;
};
exports.mySocketIo = (server) => {
  const io = socketIo(server);

  // Set up a connection event for socket.io
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Handle a disconnect event
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });

    // Handle custom events
    socket.on("chat message", (msg) => {
      console.log("message", msg);
      io.emit("chat message", msg);
    });
    socket.on("get new id", (msg) => {
      let id = generateIncrementingId(msg);
      console.log("get new id", id);
      io.emit("get new id", id);
    });
    socket.on(config.dataConfig.data_sample_dev.nameGetData, (msg) => {
      console.log(config.dataConfig.data_sample_dev.nameGetData);
      let pathfile = config.dataConfig.data_sample_dev.path_file_json;
      file.writeFile(pathfile, JSON.stringify(msg, null, 2));
      io.emit(config.dataConfig.data_sample_dev.nameGetData, msg);
    });
  });
};

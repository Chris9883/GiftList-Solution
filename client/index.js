const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // prove to the server name is on the nice list
  const merkleTree = new MerkleTree(niceList);
  const name = "Shelly Toy";
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // send proof and name as request body params to server
    // both are needed for the verifyProof function
    params: {
      proof,
      name,
    },
  });

  console.log("gift", { gift });
}

main();

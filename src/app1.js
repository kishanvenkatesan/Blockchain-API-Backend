// ABIs
const fs = require("fs");
const path = require("path");

const getTheAbi = () => {
  try {
    const dir = path.resolve(
      __dirname,
      "../artifacts/contracts/Dappazon.sol/Dappazon.json"
    );
    const file = fs.readFileSync(dir, "utf8");
    const json = JSON.parse(file);
    const abi = json.abi;
    return abi;
  } catch (e) {
    console.log(`e`, e);
  }
};
const Dappazon = getTheAbi();

// Config
const config = require("./config.json");

const ethers = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(
  "https://polygon-mumbai.g.alchemy.com/v2/ByJ6eoFJQRS4aJPw23784nk3MI6My0-Z"
);

const express = require("express");
const app = express();

const getNetworkData = async () => {
  const network = await provider.getNetwork();
  return config[network.chainId].dappazon.address;
};
const fetchItem = async (id) => {
  const contractAddress = await getNetworkData();
  //console.log("contractAddress : ", contractAddress);
  const contract = new ethers.Contract(contractAddress, Dappazon, provider);
  let item = await contract.items(id);
  const idDecimal =
    ethers.utils.formatUnits(item.id.toString(), "ether") * 10 ** 18;
  const costDecimal =
    ethers.utils.formatUnits(item.cost.toString(), "ether") * 10 ** 18;
  let response = {
    id: idDecimal,
    cost: costDecimal,
    name: item.name,
    doe: item.doe,
    mdate: item.mdate,
  };
  return response;
};
app.use(express.json());
app.get("/getDetails/:id", (req, res) => {
  let id = parseInt(req.params.id);
  if (id == null) {
    res.json({ success: false, data: [] });
  } else {
    fetchItem(id)
      .then((item) => {
        res.json({ success: true, ...item });
      })
      .catch((err) => {
        console.log(err);
        res.send("Error");
      });
  }
});
const port = 5000;
app.listen(process.env.PORT || port, () => {
  console.log("Listening to port 5000");
});

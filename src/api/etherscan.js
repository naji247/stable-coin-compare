import request from 'request-promise';
import {ETHERSCAN_API_KEY} from "../secrets";

export const getTokenSupply = async (req, res) => {
  const { ethContractAddress } = req.params;

  if (!ethContractAddress) {
    res.status(400).send({
      message: ['Required field: "ethContractAddress".']
    });
    return;
  }

  try {
    const ethScanApiUrl = 'https://api.etherscan.io/api'
    const queryString = {
      module: 'stats',
      action: 'tokensupply',
      contractaddress: ethContractAddress,
      apikey: ETHERSCAN_API_KEY
    }
    const ethScanResult = await request.get({url:ethScanApiUrl, qs: queryString, json:true});
    res.send(ethScanResult);
  } catch (error) {
    res.status(500).send({ message: 'Unknown error occured.' });
  }
};

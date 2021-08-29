const baseURL = `http://localhost:3000/files/:nodeId`;

export const fetchObecjts = async (nodeID = "") => {
  const changeNodeID = new RegExp(/:nodeId$/);
  const requestURL = baseURL.replace(changeNodeID, nodeID);

  try {
    const response = await fetch(requestURL);
    const responseBody = await response.json();

    return responseBody;
  } catch (err) {
    window.alert("Sercer Error");
  }
};

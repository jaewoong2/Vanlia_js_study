const __URL__ = "https://my-json-server.typicode.com/jaewoong2/Fake_api/";

export const request = async (id = 1) => {
  const data = await fetch(__URL__ + id, {
    method: "GET",
  });

  return await data.json();
};

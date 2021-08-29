export const request = async (id) => {
  try {
    const req = await fetch(`http://localhost:3000/files/${id}`);

    return req.json();
  } catch (err) {
    window.alert("error!");
  }
};

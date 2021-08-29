export const fecthMusics = async () => {
  const response = await fetch("/musics");
  return response.json();
};

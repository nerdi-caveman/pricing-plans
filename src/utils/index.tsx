export const subscribeUser: any = async (data: any) => {
  const response = await fetch("http://myapi.com/subscribe", {
    method: "POST",
    body: data,
  });
  const json = await response.json();
  return json;
};

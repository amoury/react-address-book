export const getUsers = async () => {
  return fetch(`https://randomuser.me/api/?seed=nuvalence&results=500`).then((res) => res.json());
};

import 'server-only';

export async function getUsers() {
  const url = `${process.env.API_DOMAIN}/api/users`;
  const res = await fetch(url);

  return res.json();
}

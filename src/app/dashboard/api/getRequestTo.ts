export default async function getRequestTo(id: string) {
  const res = await fetch(`http://localhost:3000/api/friend/myrequest/${id}`, {
    method: "GET",
  });
  return res.json();
}

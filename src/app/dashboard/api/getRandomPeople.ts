export default async function getRandomPeople(id: string) {
  const res = await fetch(`http://localhost:3000/api/people/${id}`, {
    method: "GET",
  });
  return res.json();
}

import Dashboard from '@/components/dashboard/Dashboard'
async function getRandomPeople() {
  const res = await fetch(`http://localhost:3000/api/people/1`, {
      method: 'GET',
  });
  const data = await res.json();
  return data;
}
export default async function Page () {
  const randomPeople = await getRandomPeople();
  const allPeople = JSON.stringify(randomPeople);
  return (
    <div style={{
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "1200px",
      paddingTop: "50px", 
  }}>
      <title>Dashboard</title>
     <Dashboard allPeople={allPeople} />
    </div>
  )
}

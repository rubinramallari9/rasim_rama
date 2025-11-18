export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Temporary dummy data - replace this when integrating with Django backend
  const demo = {
    title: "Demo Project",
    year: "2024",
    country: "Austria",
    capacity: "180 MW",
    investment: "$450M",
    status: "Completed",
  };

  return (
    <div>
      <h1>{demo.title}</h1>
      <p>Year: {demo.year}</p>
      <p>Country: {demo.country}</p>
      <p>Capacity: {demo.capacity}</p>
      <p>Total Investment: {demo.investment}</p>
      <p>Status: {demo.status}</p>
      <p>Project ID: {id}</p>
    </div>
  );
}

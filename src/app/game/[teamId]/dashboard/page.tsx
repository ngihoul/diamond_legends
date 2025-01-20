export default async function Dashboard({ params }: { params: Promise<{ teamId: number }> }) {
    const teamId = (await params).teamId;
    console.log(teamId);
}

import { demoMembers } from "@/lib/demo-data";
import { TeamClient, TeamMemberItem } from "./team-client";

export const revalidate = 60;

export default async function TeamPage() {
  

  

  const combinedMembers: TeamMemberItem[] = demoMembers;

  return <TeamClient members={combinedMembers} />;
}

import { SkillForm } from "@/components/dashboard/skills/skill-form";
import { TSkill } from "@/types/skill";

async function getBlogById(id: string): Promise<TSkill | null> {
  try {
    const res = await fetch(
      `https://portfolio-nextjs-backend-rho.vercel.app/api/v1/skill/${id}`,
      {
        cache: "no-store",
      }
    );
    const json = await res.json();

    if (!res.ok || !json.success) return null;

    return json.data;
  } catch {
    return null;
  }
}

export default async function BlogPage({ params }: { params: { id: string } }) {
  let skill: TSkill | null= null;
  
  try {
    const awaitedParams = await Promise.resolve(params);
    skill = await getBlogById(awaitedParams.id);
  } catch (error) {
    console.error("Error fetching review:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Skill</h1>
        <p className="text-muted-foreground">Update your skill information</p>
      </div>
      <SkillForm skill={skill} />
    </div>
  );
}
interface SkillCardProps {
    title: string;
    description: string;
}

export default function SkillCard({
    title,
    description,
}: SkillCardProps) {
    return (
        <div className="border rounded-lg p-5 shadow-sm">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}
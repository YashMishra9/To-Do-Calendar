import { TaskCategory } from "@/types/task";
import { CATEGORY_STYLES } from "@/lib/categories";

interface CategoryBadgeProps {
  category: TaskCategory;
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const { bg, text } = CATEGORY_STYLES[category];
  return (
    <span
      className="text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0"
      style={{ backgroundColor: bg, color: text }}
    >
      {category}
    </span>
  );
}
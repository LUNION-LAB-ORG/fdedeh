import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getCategoryColor } from "@/features/articles/utils/category-colors";
import { ICategorie } from "@/features/categories/types/categorie.type";

function CategoryBadge({ category, className }: { category: ICategorie, className: string }) {
	if (!category) return null;
	return (
		<Badge className={cn(
			"first-letter:capitalize text-white rounded-2xl p-2 text-xs",
			getCategoryColor(category.name),
			className
		)}>
			{category.name}
		</Badge>
	);
}

export default CategoryBadge;
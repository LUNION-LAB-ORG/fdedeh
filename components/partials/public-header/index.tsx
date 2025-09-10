"use client";

import React, {useEffect, useState} from 'react';
import LogoFd from "@/components/logo-fd";
import {Link, usePathname} from "@/i18n/navigation";
import SearchBar from "@/components/partials/public-header/search-bar";
import {publicMenuItems} from "@/components/partials/public-header/constants";
import {AnimatePresence, motion} from "framer-motion";
import {ChevronRight, Menu, X} from "lucide-react";
import NavLink from "@/components/partials/public-header/nav-link";
import {cn} from "@/lib/utils";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible"

function PublicHeader() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const [isScrolled, setIsScrolled] = useState(false);
	const pathName = usePathname();

	const mobileMenuVariants = {
		closed: {opacity: 0, height: 0},
		open: {opacity: 1, height: 'auto'},
	};

	const headerVariants = {
		initial: {y: -100, opacity: 0},
		animate: {y: 0, opacity: 1},
	};

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 25);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Rendre sticky si l'utilisateur a scrollé
	return (
		<motion.header
			className={
				cn("top-0 right-0 left-0 z-50 transition-all duration-300 bg-white fixed", {
					'bg-white/90': !isScrolled,
					'border-b border-border': isScrolled,
				})
			}
			variants={headerVariants}
			initial="initial"
			animate={"animate"}
			transition={{duration: 0.3, ease: 'easeInOut'}}
		>
			<div className="mx-auto max-w-7xl px-4 lg:px-6">
				<div className="flex h-16 items-center justify-between lg:h-20">
					<Link prefetch={false} href="/" className="flex items-center space-x-2">
						<LogoFd className="size-20 hover:scale-105 transition-all duration-300"/>
					</Link>
					<div className="flex items-center space-x-8">
						<nav className="hidden items-center space-x-2 lg:flex">
							{publicMenuItems.map((item) => (
								<div
									key={item.name}
									className="relative"
								>
									<NavLink
										pathName={pathName}
										name={item.name}
										href={item.href}
										hasSubMenu={item.hasSubMenu}
										subMenuItems={item.subMenuItems}
										activeSubMenu={activeDropdown}
										onMouseEnter={setActiveDropdown}
									/>
								</div>
							))}
						</nav>
						<SearchBar/>
					</div>
					<motion.button
						className="hover:bg-muted rounded-lg p-2 transition-colors duration-200 lg:hidden"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						whileTap={{scale: 0.95}}
					>
						{isMobileMenuOpen ? (
							<X className="h-6 w-6"/>
						) : (
							<Menu className="h-6 w-6"/>
						)}
					</motion.button>
				</div>
				<AnimatePresence>
					{isMobileMenuOpen && (
						<motion.div
							className="overflow-hidden lg:hidden"
							variants={mobileMenuVariants}
							initial="closed"
							animate="open"
							exit="closed"
							transition={{duration: 0.3, ease: 'easeInOut'}}
						>
							<div
								className="border-border bg-background/95 mt-4 space-y-2 rounded-xl border py-4 shadow-xl backdrop-blur-lg">
								{publicMenuItems
									.map((item) => (
										!item.hasSubMenu ? (
											<Link prefetch={false} key={item.name}
											      href={item.href}
											      className="text-foreground hover:bg-muted block px-4 py-3 font-medium transition-colors duration-200"
											      onClick={() => setIsMobileMenuOpen(false)}
											>
												{item.name}
											</Link>
										) : (
											<div key={item.name}>
												<Collapsible>
													<CollapsibleTrigger
														className="text-foreground hover:bg-muted w-full flex items-center justify-between px-4 py-3 font-medium transition-colors duration-200"
													>
														<span>{item.name}</span>
														<ChevronRight className="h-4 w-4"/>
													</CollapsibleTrigger>
													<CollapsibleContent>
														<div className="pl-4 space-y-2">
															{item.subMenuItems?.map((subItem) => (
																<Link
																	key={subItem.name}
																	href={subItem.href}
																	prefetch={false}
																	className="text-muted-foreground hover:text-foreground hover:bg-muted block px-4 py-2 transition-colors duration-200"
																	onClick={() => setIsMobileMenuOpen(false)}
																>
																	{subItem.name}
																</Link>
															))}
														</div>
													</CollapsibleContent>
												</Collapsible>
											</div>
										)))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.header>
	);
}

export default PublicHeader;
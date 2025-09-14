import LogoFd from "@/components/logo-fd";
import FooterColumn from "@/components/partials/public-footer/footer-column";
import Image from "next/image";
import Link from "next/link";

const usefulLinks = [
	{ text: 'Accueil', href: '/' },
	{ text: 'A la une', href: '/about' },
	{ text: 'Sports', href: '/sports' },

]

export default function PublicFooter() {
	return (
		<footer className="bg-black text-white mt-16 w-full place-self-end rounded-t-xl">
			<div className="mx-auto max-w-screen-2xl px-4 pt-6 pb-6 sm:px-6 lg:px-8 lg:pt-10">
				<div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
					<div className="mx-auto">
						<LogoFd
							className="w-36 md:w-56 lg:w-64 transition-all duration-300 max-md:mx-auto"
						/>

						<p className="mt-2 max-w-md text-center leading-relaxed sm:max-w-xs md:text-left font-bold">
							Le portail de référence de l&#39;actualité ivoirienne
						</p>
					</div>

					<div className="mx-auto text-center w-full max-w-xl">
						<h6 className="text-base md:text-xl lg:text-2xl">
							Projet de modernisation de la presse: une stratégie de transformation digitale
							pour tout ces acteurs.
						</h6>
						<p className="text-center mx-auto text-gray-300 mt-4 text-sm md:text-base">
							Idée originale, conçue et développée par {" "}
							<Link href="https://www.lunion-lab.com/" className="font-semibold">LUNION-LAB</Link>.
						</p>
					</div>

					<FooterColumn links={usefulLinks} title="Lien utiles" className="min-w-52 md:mx-auto" />
				</div>

				<div className="mt-10 pt-6 flex max-w-fit mx-auto">
					<div className="text-center text-white/70 mt-4 text-sm transition sm:order-first sm:mt-0">
						COPYRIGHT &copy; 2025 Fernand Dedeh, Développé par {" "}
						<Link
							target="_blank"
							href="https://www.lunion-lab.com?utm_source=fd-website&utm_medium=referral"
							className="font-semibold flex items-center justify-center hover:text-violet-500"
						>
							LUNION-LAB
							<div className="size-4 object-contain relative ml-2">
								<Image
									src="/logo-lunion.png"
									alt="LUNION-LAB"
									fill
									className="mx-auto md:mx-0 transition-all duration-300"
								/>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}

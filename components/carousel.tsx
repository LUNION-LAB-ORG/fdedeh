"use client";

import * as React from "react";

import {Card, CardContent} from "@/components/ui/card";
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {cn} from "@/lib/utils";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import CategoryBadge from "@/components/category-badge";
import {AnimatePresence, motion} from "framer-motion";

import {ICategorie} from "@/features/categories/types/categorie.type";

type CarouselWithPaginationProps = {
    caourselItems?: {
        src: string;
        alt: string;
        title: string;
        category: ICategorie;
    }[];
}

export default function CarouselWithPagination({caourselItems}: CarouselWithPaginationProps) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    // Variants d'animation pour les éléments textuels
    const badgeVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: { duration: 0.3 }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: 0.2 }
        },
        exit: {
            opacity: 0,
            y: -15,
            transition: { duration: 0.4 }
        }
    };

    return (
        <div>
            <Carousel
                opts={{loop: true}}
                plugins={[
                    Autoplay({
                        playOnInit: true,
                        delay: 5000,
                        stopOnMouseEnter: true,
                    })
                ]}
                setApi={setApi}
                className="w-full"
            >
                <CarouselContent>
                    {caourselItems?.map((item, index) => (
                        <CarouselItem key={index}>
                            <Card>
                                <CardContent
                                    className="relative flex h-[300px] lg:h-[450px] items-center justify-center p-6 bg-gray-50"
                                >
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        width={1230}
                                        height={450}
                                        className="absolute object-cover object-center rounded-xl"
                                    />
                                    <div
                                        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 pb-10 rounded-b-xl"
                                    >
                                        <div className="flex flex-col items-start justify-end h-full p-4">
                                            <AnimatePresence mode="wait">
                                                {current === index + 1 && (
                                                    <>
                                                        <motion.div
                                                            key={`badge-${index}`}
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="exit"
                                                            variants={badgeVariants}
                                                            className="mb-2 ml-2"
                                                        >
                                                            <CategoryBadge
                                                                category={item.category}
                                                                className="text-lg"
                                                            />
                                                        </motion.div>
                                                        <motion.h2
                                                            key={`title-${index}`}
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="exit"
                                                            variants={titleVariants}
                                                            className="text-white font-extrabold text-xl lg:text-3xl px-5 line-clamp-2"
                                                        >
                                                            {item.title}
                                                        </motion.h2>
                                                    </>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
            <div className="mt-4 flex items-center justify-center gap-2">
                {caourselItems?.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={cn("size-3.5 rounded-full border-2", {
                            "bg-custom-gradient": current === index + 1,
                        })}
                    />
                ))}
            </div>
        </div>
    );
}

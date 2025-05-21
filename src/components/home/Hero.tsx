'use client';

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    return (
        <div className="relative bg-white overflow-hidden">
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                            Organize seu hobby de <span className="text-[#9b87f5]">lavar carros</span> como um profissional
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-lg">
                            Acompanhe seus produtos, organize detalhes dos seus veículos e eleve sua paixão por carros limpos ao próximo nível.
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link href="/register">
                                <Button className="w-full sm:w-auto bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-6 h-auto text-lg">
                                    Começar agora
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/#features">
                                <Button variant="outline" className="w-full sm:w-auto border-[#9b87f5] text-[#9b87f5] hover:bg-[#F1F0FB] px-8 py-6 h-auto text-lg">
                                    Conheça os recursos
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="relative rounded-xl overflow-hidden shadow-2xl">
                        <div className="bg-gradient-to-r from-[#9b87f5] to-[#D3E4FD] aspect-[16/9] rounded-xl flex items-center justify-center">
                            <Image
                                src="/carwash.avif"
                                alt="Carro sendo lavado"
                                className="w-full h-full object-cover mix-blend-overlay opacity-90"
                                width={800}
                                height={450}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 
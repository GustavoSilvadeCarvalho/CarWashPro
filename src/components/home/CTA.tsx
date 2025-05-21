'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Wrench } from "lucide-react";

export default function CTA() {
    const benefits = [
        {
            icon: <Shield className="h-6 w-6 text-[#9b87f5]" />,
            text: "30 dias de teste grátis"
        },
        {
            icon: <Clock className="h-6 w-6 text-[#9b87f5]" />,
            text: "Configuração em 5 minutos"
        },
        {
            icon: <Wrench className="h-6 w-6 text-[#9b87f5]" />,
            text: "Suporte técnico especializado"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-r from-[#9b87f5] to-[#D3E4FD]">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Comece a cuidar melhor do seu carro hoje
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Junte-se a milhares de entusiastas que já estão elevando o nível dos cuidados com seus veículos
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                        <Link href="/register">
                            <Button className="w-full sm:w-auto bg-white text-[#9b87f5] hover:bg-gray-100 px-8 py-6 h-auto text-lg font-semibold">
                                Começar agora
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center justify-center gap-3">
                                {benefit.icon}
                                <span className="text-white font-medium">
                                    {benefit.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
} 
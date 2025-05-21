'use client';

import { Users, Car, Star } from "lucide-react";

export default function Stats() {
    const stats = [
        {
            title: "Usuários Ativos",
            value: "2,000+",
            description: "Entusiastas apaixonados",
            icon: <Users className="h-8 w-8 text-[#9b87f5]" />
        },
        {
            title: "Carros Cadastrados",
            value: "5,000+",
            description: "Veículos cuidados com amor",
            icon: <Car className="h-8 w-8 text-[#9b87f5]" />
        },
        {
            title: "Avaliação Média",
            value: "4.8",
            description: "De satisfação dos usuários",
            icon: <Star className="h-8 w-8 text-[#9b87f5]" />
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-xl p-6 text-center transition-transform hover:scale-105"
                        >
                            <div className="flex justify-center mb-4">
                                {stat.icon}
                            </div>
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">
                                {stat.value}
                            </h3>
                            <p className="text-xl font-semibold text-[#9b87f5] mb-1">
                                {stat.title}
                            </p>
                            <p className="text-gray-600">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 
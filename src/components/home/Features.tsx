'use client';

import { Car, List, ShoppingCart } from "lucide-react";

export default function Features() {
    const features = [
        {
            title: "Gerenciamento de Carros",
            description: "Cadastre todos os seus veículos com detalhes completos como modelo, ano, cor e especificações.",
            icon: <Car className="h-10 w-10 text-[#9b87f5]" />,
        },
        {
            title: "Catálogo de Produtos",
            description: "Organize seus produtos de limpeza, ceras, polidores e acessórios em um único lugar.",
            icon: <ShoppingCart className="h-10 w-10 text-[#9b87f5]" />,
        },
        {
            title: "Lista de Tarefas",
            description: "Crie listas de verificação para cada processo de lavagem e acompanhe seu progresso.",
            icon: <List className="h-10 w-10 text-[#9b87f5]" />,
        },
    ];

    return (
        <section id="features" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Tudo que você precisa para ser um <span className="text-[#9b87f5]">especialista em limpeza</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Nossa plataforma foi desenvolvida para entusiastas que amam manter seus carros impecáveis
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="bg-[#F1F0FB] inline-flex rounded-lg p-3 mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 
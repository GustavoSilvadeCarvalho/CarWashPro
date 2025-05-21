'use client';

import Image from "next/image";
import { Star } from "lucide-react";

export default function Testimonials() {
    const testimonials = [
        {
            name: "Carlos Silva",
            role: "Entusiasta Automotivo",
            content: "O CarWashPro revolucionou a forma como cuido do meu carro. A organização dos produtos e o acompanhamento das lavagens tornaram tudo mais profissional.",
            avatar: "/avatars/avatar1.jpg",
            rating: 5
        },
        {
            name: "Ana Oliveira",
            role: "Proprietária de Coleção",
            content: "Gerenciar múltiplos veículos nunca foi tão fácil. O sistema me ajuda a manter um registro detalhado de cada carro da minha coleção.",
            avatar: "/avatars/avatar2.jpg",
            rating: 5
        },
        {
            name: "Pedro Santos",
            role: "Detailer Amador",
            content: "A plataforma me ajudou a evoluir de amador para semi-profissional. O controle de produtos e técnicas é excepcional.",
            avatar: "/avatars/avatar3.jpg",
            rating: 5
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        O que nossos <span className="text-[#9b87f5]">usuários dizem</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Descubra como o CarWashPro está transformando a experiência de cuidar de carros
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="flex items-center mb-4">
                                <div className="relative w-12 h-12 mr-4">
                                    <Image
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-600 italic">&quot;{testimonial.content}&quot;</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 
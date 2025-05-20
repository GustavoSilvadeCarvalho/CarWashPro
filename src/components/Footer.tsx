'use client';
import React from "react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <Link href="/" className="flex items-center mb-4">
                            <span className="text-2xl font-bold text-[#9b87f5]">CarWash</span>
                            <span className="text-2xl font-bold text-white">Pro</span>
                        </Link>
                        <p className="text-gray-400 mb-4">
                            A plataforma ideal para quem ama cuidar de seus veículos com paixão e dedicação.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-gray-400 hover:text-[#9b87f5] transition-colors">Início</Link></li>
                            <li><Link href="/#features" className="text-gray-400 hover:text-[#9b87f5] transition-colors">Recursos</Link></li>
                            <li><Link href="/login" className="text-gray-400 hover:text-[#9b87f5] transition-colors">Entrar</Link></li>
                            <li><Link href="/register" className="text-gray-400 hover:text-[#9b87f5] transition-colors">Cadastrar</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Suporte</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-[#9b87f5] transition-colors">Contato</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#9b87f5] transition-colors">FAQ</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#9b87f5] transition-colors">Ajuda</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-[#9b87f5] transition-colors">Termos de Uso</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#9b87f5] transition-colors">Privacidade</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#9b87f5] transition-colors">Cookies</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8">
                    <p className="text-center text-gray-500">
                        &copy; {new Date().getFullYear()} CarWashPro. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};
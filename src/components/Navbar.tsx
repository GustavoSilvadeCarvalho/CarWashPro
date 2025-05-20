'use client'


import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="w-full bg-white border-b border-gray-100 shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <span className="text-2xl font-bold text-[#9b87f5]">CarWash</span>
                        <span className="text-2xl font-bold text-gray-800">Pro</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-[#9b87f5] font-medium">
                            Início
                        </Link>
                        <Link href="/#features" className="text-gray-700 hover:text-[#9b87f5] font-medium">
                            Recursos
                        </Link>
                        <Link href="/login" className="text-gray-700 hover:text-[#9b87f5] font-medium">
                            Entrar
                        </Link>
                        <Link href="/register">
                            <Button className="bg-[#9b87f5] hover:bg-[#7E69AB]">Cadastrar</Button>
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="text-gray-500 hover:text-gray-600 focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden mt-4 py-4 border-t border-gray-100">
                        <nav className="flex flex-col space-y-4">
                            <Link
                                href="/"
                                className="text-gray-700 hover:text-[#9b87f5] font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Início
                            </Link>
                            <Link
                                href="/#features"
                                className="text-gray-700 hover:text-[#9b87f5] font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Recursos
                            </Link>
                            <Link
                                href="/login"
                                className="text-gray-700 hover:text-[#9b87f5] font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Entrar
                            </Link>
                            <Link
                                href="/register"
                                className="block"
                                onClick={() => setIsOpen(false)}
                            >
                                <Button className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]">
                                    Cadastrar
                                </Button>
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};
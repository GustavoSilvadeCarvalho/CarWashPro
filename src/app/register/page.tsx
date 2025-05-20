'use client';

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const Register = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow bg-gray-50 py-10">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto">
                        <Card className="shadow-lg">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl font-bold text-center">Criar uma conta</CardTitle>
                                <CardDescription className="text-center">
                                    Preencha os dados abaixo para se cadastrar
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">Nome</Label>
                                        <Input id="firstName" placeholder="João" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Sobrenome</Label>
                                        <Input id="lastName" placeholder="Silva" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">E-mail</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="exemplo@email.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms" />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Eu concordo com os{" "}
                                        <Link href="#" className="text-[#9b87f5] hover:underline">
                                            termos de serviço
                                        </Link>{" "}
                                        e{" "}
                                        <Link href="#" className="text-[#9b87f5] hover:underline">
                                            política de privacidade
                                        </Link>
                                    </label>
                                </div>
                                <Button className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]">
                                    Cadastrar
                                </Button>
                                <div className="text-center text-sm">
                                    <Link href="/login" className="text-[#9b87f5] hover:underline">
                                        Já tem uma conta? Entrar
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Register;
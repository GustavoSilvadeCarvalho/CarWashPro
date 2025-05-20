'use client';
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow bg-gray-50 py-10">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto">
                        <Card className="shadow-lg">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl font-bold text-center">Entrar</CardTitle>
                                <CardDescription className="text-center">
                                    Entre com seu e-mail e senha para acessar sua conta
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">E-mail</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="exemplo@email.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Senha</Label>
                                        <Link href="#" className="text-sm text-[#9b87f5] hover:underline">
                                            Esqueceu a senha?
                                        </Link>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <Button className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]">
                                    Entrar
                                </Button>
                                <div className="text-center text-sm">
                                    <Link href="/register" className="text-[#9b87f5] hover:underline">
                                        Não tem uma conta? Cadastre-se agora
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

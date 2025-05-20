'use client';
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validações básicas
        if (formData.password !== formData.confirmPassword) {
            setError("As senhas não coincidem");
            setLoading(false);
            return;
        }

        if (!formData.terms) {
            setError("Você deve aceitar os termos de serviço");
            setLoading(false);
            return;
        }

        try {
            // 1. Registrar o usuário no Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        full_name: `${formData.firstName} ${formData.lastName}`
                    }
                }
            });

            if (authError) {
                throw authError;
            }

            // 2. Opcional: Inserir informações adicionais na tabela profiles
            // (Assumindo que você criou a tabela profiles como mencionado anteriormente)
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: authData.user.id,
                    email: formData.email,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    full_name: `${formData.firstName} ${formData.lastName}`,
                    updated_at: new Date().toISOString()
                });

            if (profileError) {
                console.error("Erro ao criar perfil:", profileError);
                // Não lançamos erro aqui pois o usuário já foi criado no auth
            }

            // Redirecionar para página de verificação de e-mail
            router.push('/verify-email?email=' + encodeURIComponent(formData.email));

        } catch (error) {
            setError(error.message || "Erro ao criar conta");
        } finally {
            setLoading(false);
        }
    };

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
                                {error && (
                                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                                        {error}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">Nome</Label>
                                            <Input
                                                id="firstName"
                                                placeholder="João"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Sobrenome</Label>
                                            <Input
                                                id="lastName"
                                                placeholder="Silva"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">E-mail</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="exemplo@email.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Senha</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="••••••••"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="terms"
                                            checked={formData.terms}
                                            onCheckedChange={(checked) =>
                                                setFormData(prev => ({ ...prev, terms: checked }))
                                            }
                                            required
                                        />
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
                                    <Button
                                        type="submit"
                                        className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]"
                                        disabled={loading}
                                    >
                                        {loading ? "Cadastrando..." : "Cadastrar"}
                                    </Button>
                                </form>
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
'use client';

import { useState, useEffect } from "react";
import { supabase } from '@/lib/supabase/client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, Home, LogOut, Plus, ShoppingCart, Play, CheckCircle, ArrowRight, Trash2, Pencil, Loader2 } from "lucide-react";
import CarCard from "@/components/CarCard";
import AddCarModal from "@/components/AddCarModal";
import AddProductModal from "@/components/AddProductModal";
import { Toaster, toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Image from "next/image";

interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    brand?: string;
    image?: string;
    category?: string;
}

interface Car {
    id: string;
    name: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
    image?: string;
    lastWashDate: string | null;
    user_id: string;
    created_at?: string;
}

interface DetailedWashCar {
    id: string;
    name: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
    image?: string;
    lastWashDate: string | null;
}

// Enhanced detailed washing process with stages and steps
const detailedWashProcess = {
    id: "detailed-wash",
    name: "Lavagem Detalhada Profissional",
    description: "Um processo completo para uma lavagem e proteção perfeita do seu veículo",
    stages: [
        {
            id: "stage-1",
            name: "Preparação Inicial",
            description: "Preparação do veículo antes da lavagem principal",
            steps: [
                { id: "1-1", text: "Verificar se o carro está estacionado em local sombreado", completed: false },
                { id: "1-2", text: "Separar todos os produtos necessários para a lavagem", completed: false },
                { id: "1-3", text: "Encher dois baldes: um com água e shampoo, outro apenas com água limpa", completed: false },
                { id: "1-4", text: "Colocar grit guards (protetores) nos baldes para proteger contra riscos", completed: false },
                { id: "1-5", text: "Preparar luvas de microfibra e toalhas de secagem", completed: false }
            ]
        },
        {
            id: "stage-2",
            name: "Pré-Lavagem",
            description: "Remoção da sujeira superficial",
            steps: [
                { id: "2-1", text: "Enxaguar todo o veículo para remover sujeira solta", completed: false },
                { id: "2-2", text: "Aplicar produto de pré-lavagem nas áreas mais sujas (para-choques, rodas)", completed: false },
                { id: "2-3", text: "Aplicar removedor de insetos no para-brisa e frente do veículo", completed: false },
                { id: "2-4", text: "Aplicar limpador específico para rodas", completed: false },
                { id: "2-5", text: "Limpar as rodas com escova apropriada", completed: false },
                { id: "2-6", text: "Limpar os pneus com escova de cerdas duras", completed: false },
                { id: "2-7", text: "Enxaguar novamente todo o veículo", completed: false }
            ]
        },
        {
            id: "stage-3",
            name: "Lavagem Principal",
            description: "Lavagem com shampoo automotivo",
            steps: [
                { id: "3-1", text: "Mergulhar a luva no balde com shampoo", completed: false },
                { id: "3-2", text: "Lavar o veículo de cima para baixo, em seções pequenas", completed: false },
                { id: "3-3", text: "Enxaguar a luva no balde de água limpa antes de mergulhar novamente no shampoo", completed: false },
                { id: "3-4", text: "Dar atenção especial a áreas com sujeira acumulada", completed: false },
                { id: "3-5", text: "Lavar as soleiras das portas e as molduras das janelas", completed: false },
                { id: "3-6", text: "Enxaguar completamente o veículo, de cima para baixo", completed: false }
            ]
        },
        {
            id: "stage-4",
            name: "Descontaminação",
            description: "Remoção de contaminantes incrustados",
            steps: [
                { id: "4-1", text: "Verificar se a superfície está livre de contaminantes passando a mão (usar luva)", completed: false },
                { id: "4-2", text: "Aplicar lubrificante para clay bar na seção a ser descontaminada", completed: false },
                { id: "4-3", text: "Usar clay bar em movimentos suaves de vai e vem", completed: false },
                { id: "4-4", text: "Enxaguar a área após a descontaminação", completed: false },
                { id: "4-5", text: "Repetir o processo em todo o veículo", completed: false }
            ]
        },
        {
            id: "stage-5",
            name: "Secagem",
            description: "Secagem cuidadosa para evitar marcas de água",
            steps: [
                { id: "5-1", text: "Usar soprador para remover o excesso de água (se disponível)", completed: false },
                { id: "5-2", text: "Usar toalha de microfibra de secagem de qualidade", completed: false },
                { id: "5-3", text: "Secar de cima para baixo, em movimentos suaves", completed: false },
                { id: "5-4", text: "Usar toalha limpa para os vidros e espelhos", completed: false },
                { id: "5-5", text: "Secar as soleiras das portas e áreas escondidas", completed: false }
            ]
        },
        {
            id: "stage-6",
            name: "Proteção",
            description: "Aplicação de produtos de proteção",
            steps: [
                { id: "6-1", text: "Aplicar cera ou selante na carroceria", completed: false },
                { id: "6-2", text: "Aplicar em pequenas seções e remover com movimentos circulares", completed: false },
                { id: "6-3", text: "Aplicar protetor de plásticos nas partes externas", completed: false },
                { id: "6-4", text: "Aplicar produto específico para os pneus", completed: false },
                { id: "6-5", text: "Aplicar repelente de água nos vidros", completed: false }
            ]
        },
        {
            id: "stage-7",
            name: "Acabamento Interior",
            description: "Limpeza e proteção do interior",
            steps: [
                { id: "7-1", text: "Aspirar todo o interior, incluindo assentos e tapetes", completed: false },
                { id: "7-2", text: "Limpar painel e plásticos com produto específico", completed: false },
                { id: "7-3", text: "Limpar os vidros por dentro", completed: false },
                { id: "7-4", text: "Aplicar protetor de couro (se aplicável)", completed: false },
                { id: "7-5", text: "Aplicar aromatizante suave", completed: false },
                { id: "7-6", text: "Verificar se não há resíduos de produto em nenhuma superfície", completed: false }
            ]
        }
    ]
};

export default function Dashboard() {
    // Use toast from 'sonner' directly, and render <Toaster /> in JSX
    const [cars, setCars] = useState<Car[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [editingCar, setEditingCar] = useState<Car | null>(null);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentWashCar, setCurrentWashCar] = useState<DetailedWashCar | null>(null);

    // State for detailed wash process
    const [detailedWash, setDetailedWash] = useState(detailedWashProcess);
    const [isWashActive, setIsWashActive] = useState(false);
    const [activeStageIndex, setActiveStageIndex] = useState(0);

    // New states for car selection
    const [isCarSelectModalOpen, setIsCarSelectModalOpen] = useState(false);
    const [selectedCarId, setSelectedCarId] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('user_products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
            toast(
                <div>
                    <div className="font-bold text-red-600">Erro</div>
                    <div>Não foi possível carregar os produtos.</div>
                </div>
            );
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCars = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('user_cars')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            setCars(data || []);
        } catch (error) {
            console.error('Erro ao carregar veículos:', error);
            toast(
                <div>
                    <div className="font-bold text-red-600">Erro</div>
                    <div>Não foi possível carregar os veículos.</div>
                </div>
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
        fetchProducts();
    }, []);

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setIsAddProductModalOpen(true);
    };

    const handleDeleteProduct = async (id: string) => {
        try {
            const { error } = await supabase
                .from('user_products')
                .delete()
                .eq('id', id);

            if (error) throw error;

            toast(
                <>
                    <div className="font-bold">Sucesso!</div>
                    <div>Produto removido com sucesso.</div>
                </>
            );

            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            toast(
                <div>
                    <div className="font-bold text-red-600">Erro</div>
                    <div>Não foi possível remover o produto.</div>
                </div>
            );
        }
    };

    const handleEditCar = (car: Car) => {
        setEditingCar(car);
        setIsAddCarModalOpen(true);
    };

    // Functions for car selection and detailed wash
    const openCarSelectionModal = () => {
        setSelectedCarId(cars.length > 0 ? cars[0].id : null);
        setIsCarSelectModalOpen(true);
    };

    const startDetailedWash = () => {
        if (!selectedCarId) {
            toast(
                <div>
                    <div className="font-bold text-red-600">Nenhum veículo selecionado</div>
                    <div>Por favor, selecione um veículo para iniciar a lavagem.</div>
                </div>
            );
            return;
        }

        const selectedCar = cars.find(car => car.id === selectedCarId);
        if (!selectedCar) return;

        setCurrentWashCar(selectedCar);

        // Reset all steps to uncompleted
        const resetWash = {
            ...detailedWash,
            stages: detailedWash.stages.map(stage => ({
                ...stage,
                steps: stage.steps.map(step => ({ ...step, completed: false }))
            }))
        };

        setDetailedWash(resetWash);
        setIsWashActive(true);
        setActiveStageIndex(0);
        setIsCarSelectModalOpen(false);

        toast(
            <>
                <div className="font-bold">Lavagem iniciada</div>
                <div>Lavagem para {selectedCar.name} iniciada. Siga cada etapa cuidadosamente.</div>
            </>
        );
    };

    const toggleDetailedWashStep = (stageId: string, stepId: string) => {
        setDetailedWash(prev => ({
            ...prev,
            stages: prev.stages.map(stage => {
                if (stage.id === stageId) {
                    return {
                        ...stage,
                        steps: stage.steps.map(step => {
                            if (step.id === stepId) {
                                return { ...step, completed: !step.completed };
                            }
                            return step;
                        })
                    };
                }
                return stage;
            })
        }));
    };

    const finishDetailedWash = () => {
        if (currentWashCar) {
            // Update the car's last wash date
            const updatedCars = cars.map(car => {
                if (car.id === currentWashCar.id) {
                    return {
                        ...car,
                        lastWashDate: new Date().toISOString().split('T')[0]  // Today's date in YYYY-MM-DD format
                    };
                }
                return car;
            });

            setCars(updatedCars);

            toast(
                <>
                    <div className="font-bold">Lavagem concluída!</div>
                    <div>Seu {currentWashCar.name} agora está limpo e protegido.</div>
                </>
            );
        }

        setIsWashActive(false);
        setCurrentWashCar(null);
    };

    const advanceToNextStage = () => {
        if (activeStageIndex < detailedWash.stages.length - 1) {
            setActiveStageIndex(prev => prev + 1);

            toast(
                <>
                    <div className="font-bold">{`Avançando para: ${detailedWash.stages[activeStageIndex + 1].name}`}</div>
                    <div>Nova etapa iniciada.</div>
                </>
            );
        } else {
            finishDetailedWash();
        }
    };

    const moveToStage = (index: number) => {
        setActiveStageIndex(index);
    };

    const calculateStageProgress = (stageIndex: number) => {
        const stage = detailedWash.stages[stageIndex];
        const completedSteps = stage.steps.filter(step => step.completed).length;
        return (completedSteps / stage.steps.length) * 100;
    };

    const calculateTotalProgress = () => {
        const totalSteps = detailedWash.stages.reduce((acc, stage) => acc + stage.steps.length, 0);
        const completedSteps = detailedWash.stages.reduce((acc, stage) =>
            acc + stage.steps.filter(step => step.completed).length, 0);
        return (completedSteps / totalSteps) * 100;
    };

    const handleDeleteCar = async (id: string) => {
        try {
            const { error } = await supabase
                .from('user_cars')
                .delete()
                .eq('id', id);

            if (error) throw error;

            toast(
                <>
                    <div className="font-bold">Sucesso!</div>
                    <div>Veículo removido com sucesso.</div>
                </>
            );

            fetchCars();
        } catch (error) {
            console.error('Erro ao deletar veículo:', error);
            toast(
                <div>
                    <div className="font-bold text-red-600">Erro</div>
                    <div>Não foi possível remover o veículo.</div>
                </div>
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-bold text-[#9b87f5]">CarWash</span>
                            <span className="text-2xl font-bold text-gray-800">Pro</span>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/">
                                    <Home className="h-5 w-5 mr-2" />
                                    Início
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                <Link href="/login">
                                    <LogOut className="h-5 w-5 mr-2" />
                                    Sair
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Painel de Controle</h1>
                    <p className="text-gray-600 mt-2">
                        Gerencie seus veículos, produtos e checklists de lavagem para manter seu hobby organizado.
                    </p>
                </div>

                <Tabs defaultValue="detailed-wash" className="w-full">
                    <TabsList className="mb-6">
                        <TabsTrigger value="detailed-wash" className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Lavagem Detalhada
                        </TabsTrigger>
                        <TabsTrigger value="cars" className="flex items-center">
                            <Car className="h-4 w-4 mr-2" />
                            Meus Veículos
                        </TabsTrigger>
                        <TabsTrigger value="products" className="flex items-center">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Meus Produtos
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="detailed-wash">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Processo de Lavagem Detalhada</h2>
                                <p className="text-gray-600 mt-1">Siga as etapas para uma lavagem perfeita do seu veículo</p>
                            </div>
                            {!isWashActive ? (
                                <Button
                                    className="bg-[#9b87f5] hover:bg-[#7E69AB]"
                                    onClick={openCarSelectionModal}
                                >
                                    <Play className="h-4 w-4 mr-2" />
                                    Iniciar Lavagem Detalhada
                                </Button>
                            ) : (
                                <Button
                                    variant="outline"
                                    onClick={finishDetailedWash}
                                >
                                    Finalizar Lavagem
                                </Button>
                            )}
                        </div>

                        {isWashActive ? (
                            <div className="space-y-6">
                                {/* Car information */}
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle>Lavando: {currentWashCar?.name}</CardTitle>
                                        <CardDescription>
                                            {currentWashCar?.model} • {currentWashCar?.year}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>

                                {/* Progress overview */}
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle>Progresso Geral</CardTitle>
                                        <CardDescription>
                                            {Math.round(calculateTotalProgress())}% concluído
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pb-6">
                                        <Progress value={calculateTotalProgress()} className="h-2" />

                                        <div className="grid grid-cols-7 gap-1 mt-4">
                                            {detailedWash.stages.map((stage, idx) => (
                                                <button
                                                    key={stage.id}
                                                    onClick={() => moveToStage(idx)}
                                                    className={`px-3 py-2 text-xs rounded-md transition-colors ${idx === activeStageIndex
                                                        ? 'bg-[#9b87f5] text-white'
                                                        : calculateStageProgress(idx) === 100
                                                            ? 'bg-green-100 text-green-800 border border-green-300'
                                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {idx + 1}
                                                </button>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Active stage */}
                                <Card className="border-[#9b87f5] border-2">
                                    <CardHeader className="bg-gray-50">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <CardTitle>{detailedWash.stages[activeStageIndex].name}</CardTitle>
                                                <CardDescription>{detailedWash.stages[activeStageIndex].description}</CardDescription>
                                            </div>
                                            <div className="text-sm font-medium text-gray-500">
                                                Etapa {activeStageIndex + 1} de {detailedWash.stages.length}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <div className="mb-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="font-semibold text-sm text-gray-500">PROGRESSO DA ETAPA</h4>
                                            </div>
                                            <Progress
                                                value={calculateStageProgress(activeStageIndex)}
                                                className="h-2 bg-gray-100"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                {detailedWash.stages[activeStageIndex].steps.filter(step => step.completed).length} de {detailedWash.stages[activeStageIndex].steps.length} passos concluídos
                                            </p>
                                        </div>

                                        <div className="space-y-3 mt-6">
                                            {detailedWash.stages[activeStageIndex].steps.map((step) => (
                                                <div key={step.id} className="flex items-start space-x-3 bg-gray-50 p-3 rounded-md">
                                                    <Checkbox
                                                        id={step.id}
                                                        checked={step.completed}
                                                        onCheckedChange={() => toggleDetailedWashStep(detailedWash.stages[activeStageIndex].id, step.id)}
                                                        className="mt-1"
                                                    />
                                                    <label
                                                        htmlFor={step.id}
                                                        className={`text-sm flex-1 ${step.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}
                                                    >
                                                        {step.text}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between border-t bg-gray-50 p-4">
                                        <div>
                                            {activeStageIndex > 0 && (
                                                <Button variant="outline" onClick={() => moveToStage(activeStageIndex - 1)}>
                                                    Voltar
                                                </Button>
                                            )}
                                        </div>
                                        <Button
                                            className="bg-[#9b87f5] hover:bg-[#7E69AB]"
                                            onClick={advanceToNextStage}
                                        >
                                            {activeStageIndex < detailedWash.stages.length - 1 ? (
                                                <>
                                                    Próxima Etapa
                                                    <ArrowRight className="h-4 w-4 ml-2" />
                                                </>
                                            ) : (
                                                'Finalizar Lavagem'
                                            )}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        ) : (
                            <Card className="text-center p-6">
                                <div className="py-8">
                                    <div className="bg-[#9b87f5] inline-flex p-3 rounded-full text-white mb-4">
                                        <Car className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Pronto para começar sua lavagem detalhada?</h3>
                                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                        Este processo guiará você por todas as etapas para uma lavagem profissional completa do seu veículo.
                                    </p>
                                    <Button
                                        size="lg"
                                        className="bg-[#9b87f5] hover:bg-[#7E69AB]"
                                        onClick={openCarSelectionModal}
                                    >
                                        <Play className="h-4 w-4 mr-2" />
                                        Iniciar Lavagem Detalhada
                                    </Button>
                                </div>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="cars">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Veículos Cadastrados</h2>
                            <Button
                                className="bg-[#9b87f5] hover:bg-[#7E69AB]"
                                onClick={() => {
                                    setEditingCar(null);
                                    setIsAddCarModalOpen(true);
                                }}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Adicionar Veículo
                            </Button>
                        </div>

                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <Loader2 className="h-8 w-8 animate-spin text-[#9b87f5]" />
                            </div>
                        ) : cars.length === 0 ? (
                            <div className="bg-white rounded-lg shadow p-6 text-center">
                                <Car className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Nenhum veículo cadastrado
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Adicione os veículos que você cuida para organizar melhor seu trabalho.
                                </p>
                                <Button
                                    className="bg-[#9b87f5] hover:bg-[#7E69AB]"
                                    onClick={() => {
                                        setEditingCar(null);
                                        setIsAddCarModalOpen(true);
                                    }}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Adicionar Primeiro Veículo
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {cars.map((car) => (
                                    <CarCard
                                        key={car.id}
                                        car={car}
                                        onEdit={() => handleEditCar(car)}
                                        onDelete={() => handleDeleteCar(car.id)}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="products">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Produtos Cadastrados</h2>
                            <Button
                                className="bg-[#9b87f5] hover:bg-[#7E69AB]"
                                onClick={() => {
                                    setEditingProduct(null);
                                    setIsAddProductModalOpen(true);
                                }}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Adicionar Produto
                            </Button>
                        </div>

                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <Loader2 className="h-8 w-8 animate-spin text-[#9b87f5]" />
                            </div>
                        ) : products.length === 0 ? (
                            <div className="bg-white rounded-lg shadow p-6 text-center">
                                <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Nenhum produto cadastrado
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Adicione os produtos que você utiliza para manter controle do seu estoque.
                                </p>
                                <Button
                                    className="bg-[#9b87f5] hover:bg-[#7E69AB]"
                                    onClick={() => {
                                        setEditingProduct(null);
                                        setIsAddProductModalOpen(true);
                                    }}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Adicionar Primeiro Produto
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <div key={product.id} className="border rounded-lg p-4 shadow-sm bg-white">
                                        {product.image && (
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                width={200}
                                                height={200}
                                                className="w-full h-40 object-cover rounded mb-3"
                                            />
                                        )}
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-lg">{product.name}</h3>
                                                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                                                    {product.description}
                                                </p>
                                                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.brand && `Marca: ${product.brand}`}</p>
                                            </div>
                                            <span className="bg-[#9b87f5] text-white text-xs px-2 py-1 rounded-full">
                                                {product.category || 'Sem categoria'}
                                            </span>
                                        </div>

                                        <div className="mt-4 flex justify-between items-center">
                                            <p className="text-green-600 font-medium">
                                                R$ {product.price.toFixed(2)}
                                            </p>
                                        </div>

                                        <div className="flex justify-end gap-2 mt-4">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleEditProduct(product)}
                                            >
                                                <Pencil className="h-4 w-4 mr-1" />
                                                Editar
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => product.id && handleDeleteProduct(product.id)}
                                                disabled={!product.id}
                                            >
                                                <Trash2 className="h-4 w-4 mr-1" />
                                                Remover
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <AddProductModal
                            isOpen={isAddProductModalOpen}
                            onClose={() => setIsAddProductModalOpen(false)}
                            onSaveSuccess={fetchProducts}
                            editingProduct={editingProduct || undefined}
                        />
                    </TabsContent>
                </Tabs>
            </main>

            {/* Car selection modal */}
            <Dialog open={isCarSelectModalOpen} onOpenChange={setIsCarSelectModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Selecione um veículo</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-sm text-gray-500 mb-4">
                            Escolha qual veículo você irá lavar:
                        </p>
                        {cars.length > 0 ? (
                            <Select value={selectedCarId || undefined} onValueChange={setSelectedCarId}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione um veículo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {cars.map((car) => (
                                        <SelectItem key={car.id} value={car.id}>
                                            {car.name} - {car.model} ({car.year})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ) : (
                            <p className="text-center text-sm text-gray-500">
                                Nenhum veículo disponível. Adicione um veículo primeiro.
                            </p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCarSelectModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button
                            className="bg-[#9b87f5] hover:bg-[#7E69AB]"
                            onClick={startDetailedWash}
                            disabled={!selectedCarId || cars.length === 0}
                        >
                            Iniciar Lavagem
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AddCarModal
                isOpen={isAddCarModalOpen}
                onClose={() => {
                    setIsAddCarModalOpen(false);
                    setEditingCar(null);
                }}
                onSaveSuccess={fetchCars}
                editingCar={editingCar || undefined}
            />

            <AddProductModal
                isOpen={isAddProductModalOpen}
                onClose={() => setIsAddProductModalOpen(false)}
                onSaveSuccess={fetchProducts}
                editingProduct={editingProduct || undefined}
            />
            <Toaster />
        </div>
    );
};
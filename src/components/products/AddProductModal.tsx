'use client';

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    brand?: string;
    image_url?: string;
    category?: string;
}

interface DefaultProduct extends Product {
    id: string;
}

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSaveSuccess?: () => void;
    editingProduct?: Product;
}

export default function AddProductModal({ isOpen, onClose, onSaveSuccess, editingProduct }: AddProductModalProps) {
    const [activeTab, setActiveTab] = useState<string>("library");
    const [defaultProducts, setDefaultProducts] = useState<DefaultProduct[]>([]);
    const [isLoadingDefaults, setIsLoadingDefaults] = useState(false);
    const [product, setProduct] = useState<Product>(
        editingProduct || {
            name: "",
            description: "",
            price: 0,
            brand: "",
            image_url: "",
            category: "",
        }
    );

    useEffect(() => {
        if (editingProduct) {
            setProduct({
                name: editingProduct.name,
                description: editingProduct.description,
                price: editingProduct.price,
                brand: editingProduct.brand || "",
                image_url: editingProduct.image_url || "",
                category: editingProduct.category || "",
            });
            setActiveTab("custom"); // Se estiver editando, vai direto para o formulário personalizado
        } else {
            setProduct({
                name: "",
                description: "",
                price: 0,
                brand: "",
                image_url: "",
                category: "",
            });
        }
    }, [editingProduct]);

    useEffect(() => {
        fetchDefaultProducts();
    }, []);

    const fetchDefaultProducts = async () => {
        try {
            setIsLoadingDefaults(true);
            const { data, error } = await supabase
                .from('default_products')
                .select('*')
                .order('name');

            if (error) throw error;

            setDefaultProducts(data || []);
        } catch (error) {
            console.error('Erro ao carregar produtos padrão:', error);
            toast(
                <div>
                    <div className="font-bold text-red-600">Erro</div>
                    <div>Não foi possível carregar a biblioteca de produtos.</div>
                </div>
            );
        } finally {
            setIsLoadingDefaults(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: Number(value) }));
    };

    const handleCategoryChange = (value: string) => {
        setProduct((prev) => ({ ...prev, category: value }));
    };

    const handleSelectDefaultProduct = (defaultProduct: DefaultProduct) => {
        setProduct({
            name: defaultProduct.name,
            description: defaultProduct.description,
            price: defaultProduct.price,
            brand: defaultProduct.brand || "",
            image_url: defaultProduct.image_url || "",
            category: defaultProduct.category || "",
        });
        setActiveTab("custom");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (!product.name || !product.description || !product.price) {
                throw new Error("Preencha todos os campos obrigatórios");
            }

            const productData = {
                name: product.name,
                description: product.description,
                price: Number(product.price),
                brand: product.brand || null,
                image_url: product.image_url || null,
                category: product.category || null,
                user_id: (await supabase.auth.getUser()).data.user?.id
            };

            const { error } = editingProduct?.id
                ? await supabase.from('user_products')
                    .update(productData)
                    .eq('id', editingProduct.id)
                : await supabase.from('user_products')
                    .insert([productData]);

            if (error) throw error;

            toast(
                <div>
                    <div className="font-bold">Sucesso!</div>
                    <div>{editingProduct ? "Produto atualizado" : "Produto adicionado"} com sucesso.</div>
                </div>
            );

            onClose();
            onSaveSuccess?.();

        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            toast(
                <div>
                    <div className="font-bold text-red-600">Erro</div>
                    <div>{(error as Error).message || "Erro ao salvar produto"}</div>
                </div>
            );
        }
    };

    const categories = [
        "Shampoo",
        "Cera",
        "Polidor",
        "Microfibra",
        "Esponja",
        "Limpador",
        "Selante",
        "Outros"
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {editingProduct ? "Editar Produto" : "Adicionar Novo Produto"}
                    </DialogTitle>
                    <DialogDescription>
                        {editingProduct
                            ? "Edite os detalhes do produto abaixo."
                            : "Escolha um produto da biblioteca ou cadastre um novo produto."}
                    </DialogDescription>
                </DialogHeader>

                {!editingProduct && (
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="library">Biblioteca de Produtos</TabsTrigger>
                            <TabsTrigger value="custom">Produto Personalizado</TabsTrigger>
                        </TabsList>

                        <TabsContent value="library" className="mt-4">
                            {isLoadingDefaults ? (
                                <div className="flex justify-center items-center h-40">
                                    <Loader2 className="h-8 w-8 animate-spin text-[#9b87f5]" />
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    {defaultProducts.map((defaultProduct) => (
                                        <Card
                                            key={defaultProduct.id}
                                            className="cursor-pointer hover:border-[#9b87f5] transition-colors"
                                            onClick={() => handleSelectDefaultProduct(defaultProduct)}
                                        >
                                            <CardContent className="p-4">
                                                {defaultProduct.image_url && (
                                                    <div className="relative h-32 mb-3">
                                                        <Image
                                                            src={defaultProduct.image_url}
                                                            alt={defaultProduct.name}
                                                            fill
                                                            className="object-contain rounded-md"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="font-semibold">{defaultProduct.name}</h3>
                                                        <p className="text-sm text-gray-500">{defaultProduct.brand}</p>
                                                    </div>
                                                    {defaultProduct.category && (
                                                        <span className="bg-[#9b87f5] text-white text-xs px-2 py-1 rounded-full">
                                                            {defaultProduct.category}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                                    {defaultProduct.description}
                                                </p>
                                                <p className="text-[#9b87f5] font-semibold">
                                                    R$ {defaultProduct.price.toFixed(2)}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="custom">
                            <form onSubmit={handleSubmit} className="mt-4">
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Nome*
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={product.name}
                                            onChange={handleChange}
                                            className="col-span-3"
                                            placeholder="Shampoo Automotivo"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="description" className="text-right">
                                            Descrição*
                                        </Label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={product.description}
                                            onChange={handleChange}
                                            className="col-span-3 border rounded-md p-2 h-20"
                                            placeholder="Descrição detalhada do produto"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="price" className="text-right">
                                            Preço*
                                        </Label>
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={product.price}
                                            onChange={handleNumberChange}
                                            className="col-span-3"
                                            placeholder="99.90"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="category" className="text-right">
                                            Categoria
                                        </Label>
                                        <div className="col-span-3">
                                            <Select
                                                value={product.category || ""}
                                                onValueChange={handleCategoryChange}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione uma categoria" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((category) => (
                                                        <SelectItem key={category} value={category}>
                                                            {category}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="brand" className="text-right">
                                            Marca
                                        </Label>
                                        <Input
                                            id="brand"
                                            name="brand"
                                            value={product.brand || ''}
                                            onChange={handleChange}
                                            className="col-span-3"
                                            placeholder="Ex: Meguiar's"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="image_url" className="text-right">
                                            URL da Imagem
                                        </Label>
                                        <Input
                                            id="image_url"
                                            name="image_url"
                                            value={product.image_url || ''}
                                            onChange={handleChange}
                                            className="col-span-3"
                                            placeholder="https://exemplo.com/foto.jpg"
                                        />
                                    </div>
                                </div>
                            </form>
                        </TabsContent>
                    </Tabs>
                )}

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    {(activeTab === "custom" || editingProduct) && (
                        <Button
                            type="submit"
                            className="bg-[#9b87f5] hover:bg-[#7E69AB]"
                            onClick={handleSubmit}
                        >
                            {editingProduct ? "Atualizar" : "Salvar"}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
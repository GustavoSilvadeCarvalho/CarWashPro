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
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    category?: string;
    brand?: string;
    quantity?: number;
    purchase_date?: string;
    image?: string;
}

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSaveSuccess?: () => void; // Adicionado para atualizar a lista após salvar
    editingProduct?: Product;
}

export default function AddProductModal({ isOpen, onClose, onSaveSuccess, editingProduct }: AddProductModalProps) {
    // Use toast directly from import
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState<Product>(
        editingProduct || {
            name: "",
            description: "",
            price: 0,
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: Number(value) }));
    };

    const handleCategoryChange = (value: string) => {
        setProduct((prev) => ({ ...prev, category: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // 1. Validação básica
            if (!product.name || !product.description || !product.price) {
                throw new Error("Preencha todos os campos obrigatórios");
            }

            // 2. Preparar dados
            const productData = {
                name: product.name,
                description: product.description,
                price: Number(product.price),
                user_id: (await supabase.auth.getUser()).data.user?.id
            };

            console.log("Dados para salvar:", productData);

            // 3. Operação no Supabase
            const { error } = editingProduct?.id
                ? await supabase.from('user_products')
                    .update(productData)
                    .eq('id', editingProduct.id)
                : await supabase.from('user_products')
                    .insert([productData]);

            if (error) throw error;

            // 4. Feedback e atualização
            toast("Sucesso! Produto salvo.");
            onClose();
            onSaveSuccess?.();

        } catch (error) {
            console.error("Erro detalhado:", error);
            toast(
                <div>
                    <strong>Erro</strong>
                    <div>{(error as Error).message || "Erro ao salvar produto"}</div>
                </div>,
                { className: "bg-red-500 text-white" }
            );
        } finally {
            setIsLoading(false);
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
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <DialogHeader>
                            <DialogTitle>
                                {" "}
                                {editingProduct
                                    ? "Editar Produto"
                                    : "Adicionar Novo Produto"}{" "}
                            </DialogTitle>
                            <DialogDescription>
                                {" "}
                                Preencha os detalhes do produto abaixo. Clique em salvar
                                quando terminar.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    {" "}
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
                                    {" "}
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
                                    {" "}
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
                                {" "}
                                <Label htmlFor="category" className="text-right">
                                    {" "}
                                    Categoria{" "}
                                </Label>{" "}
                                <div className="col-span-3">
                                    {" "}
                                    <Select
                                        value={product.category || ""}
                                        onValueChange={handleCategoryChange}
                                    >
                                        {" "}
                                        <SelectTrigger>
                                            {" "}
                                            <SelectValue placeholder="Selecione uma categoria" />{" "}
                                        </SelectTrigger>{" "}
                                        <SelectContent>
                                            {" "}
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {" "}
                                                    {category}{" "}
                                                </SelectItem>
                                            ))}{" "}
                                        </SelectContent>{" "}
                                    </Select>{" "}
                                </div>{" "}
                            </div>{" "}
                            <div className="grid grid-cols-4 items-center gap-4">
                                {" "}
                                <Label htmlFor="brand" className="text-right">
                                    {" "}
                                    Marca{" "}
                                </Label>{" "}
                                <Input
                                    id="brand"
                                    name="brand"
                                    value={product.brand || ""}
                                    onChange={handleChange}
                                    className="col-span-3"
                                    placeholder="Meguiar's"
                                />{" "}
                            </div>{" "}
                            <div className="grid grid-cols-4 items-center gap-4">
                                {" "}
                                <Label htmlFor="quantity" className="text-right">
                                    {" "}
                                    Quantidade{" "}
                                </Label>{" "}
                                <Input
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    min="1"
                                    value={product.quantity || 1}
                                    onChange={handleNumberChange}
                                    className="col-span-3"
                                />{" "}
                            </div>{" "}
                            <div className="grid grid-cols-4 items-center gap-4">
                                {" "}
                                <Label htmlFor="purchaseDate" className="text-right">
                                    {" "}
                                    Data de Compra{" "}
                                </Label>{" "}
                                <Input
                                    id="purchaseDate"
                                    name="purchaseDate"
                                    type="date"
                                    value={product.purchase_date || ""}
                                    onChange={handleChange}
                                    className="col-span-3"
                                />{" "}
                            </div>{" "}
                            <div className="grid grid-cols-4 items-center gap-4">
                                {" "}
                                <Label htmlFor="image" className="text-right">
                                    {" "}
                                    Imagem URL{" "}
                                </Label>{" "}
                                <Input
                                    id="image"
                                    name="image"
                                    value={product.image || ""}
                                    onChange={handleChange}
                                    className="col-span-3"
                                    placeholder="https://exemplo.com/imagem.jpg"
                                />{" "}
                            </div>{" "}
                        </div>{" "}
                        <DialogFooter>
                            {" "}
                            <Button type="button" variant="outline" onClick={onClose}>
                                {" "}
                                Cancelar{" "}
                            </Button>{" "}
                            <Button
                                type="submit"
                                className="bg-[#9b87f5] hover:bg-[#7E69AB]"
                            >
                                {" "}
                                Salvar{" "}
                            </Button>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
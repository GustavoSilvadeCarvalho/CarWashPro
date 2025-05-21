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
import { useEffect, useState } from "react";
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface Car {
    id?: string;
    name: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
    image?: string;
    lastWashDate?: string | null;
    user_id?: string;
}

interface AddCarModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSaveSuccess?: () => void;
    editingCar?: Car;
}

export default function AddCarModal({ isOpen, onClose, onSaveSuccess, editingCar }: AddCarModalProps) {
    const [car, setCar] = useState<Car>(
        editingCar || {
            name: "",
            model: "",
            year: new Date().getFullYear(),
            color: "",
            licensePlate: "",
            image: "",
            lastWashDate: null
        }
    );

    useEffect(() => {
        if (editingCar) {
            setCar({
                id: editingCar.id,
                name: editingCar.name,
                model: editingCar.model,
                year: editingCar.year,
                color: editingCar.color,
                licensePlate: editingCar.licensePlate,
                image: editingCar.image || "",
                lastWashDate: editingCar.lastWashDate
            });
        } else {
            setCar({
                name: "",
                model: "",
                year: new Date().getFullYear(),
                color: "",
                licensePlate: "",
                image: "",
                lastWashDate: null
            });
        }
    }, [editingCar]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCar((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Validação básica
            if (!car.name || !car.model || !car.year || !car.color || !car.licensePlate) {
                throw new Error("Preencha todos os campos obrigatórios");
            }

            // Preparar dados
            const carData = {
                name: car.name,
                model: car.model,
                year: Number(car.year),
                color: car.color,
                licensePlate: car.licensePlate,
                image: car.image || null,
                lastWashDate: car.lastWashDate,
                user_id: (await supabase.auth.getUser()).data.user?.id
            };

            // Operação no Supabase
            const { error } = editingCar?.id
                ? await supabase
                    .from('user_cars')
                    .update(carData)
                    .eq('id', editingCar.id)
                : await supabase
                    .from('user_cars')
                    .insert([carData]);

            if (error) throw error;

            // Feedback e atualização
            toast(
                <div>
                    <div className="font-bold">Sucesso!</div>
                    <div>{editingCar ? "Veículo atualizado" : "Veículo adicionado"} com sucesso.</div>
                </div>
            );

            onClose();
            onSaveSuccess?.();

        } catch (error) {
            console.error("Erro ao salvar veículo:", error);
            toast(
                <div>
                    <div className="font-bold text-red-600">Erro</div>
                    <div>{(error as Error).message || "Erro ao salvar veículo"}</div>
                </div>
            );
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            {editingCar ? "Editar Veículo" : "Adicionar Novo Veículo"}
                        </DialogTitle>
                        <DialogDescription>
                            Preencha os detalhes do veículo abaixo. Clique em salvar quando terminar.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nome
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={car.name}
                                onChange={handleChange}
                                className="col-span-3"
                                placeholder="Meu Carro"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="model" className="text-right">
                                Modelo
                            </Label>
                            <Input
                                id="model"
                                name="model"
                                value={car.model}
                                onChange={handleChange}
                                className="col-span-3"
                                placeholder="Honda Civic"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="year" className="text-right">
                                Ano
                            </Label>
                            <Input
                                id="year"
                                name="year"
                                type="number"
                                value={car.year}
                                onChange={handleChange}
                                className="col-span-3"
                                min="1900"
                                max={new Date().getFullYear() + 1}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="color" className="text-right">
                                Cor
                            </Label>
                            <Input
                                id="color"
                                name="color"
                                value={car.color}
                                onChange={handleChange}
                                className="col-span-3"
                                placeholder="Azul"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="licensePlate" className="text-right">
                                Placa
                            </Label>
                            <Input
                                id="licensePlate"
                                name="licensePlate"
                                value={car.licensePlate}
                                onChange={handleChange}
                                className="col-span-3"
                                placeholder="ABC-1234"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="text-right">
                                Imagem URL
                            </Label>
                            <Input
                                id="image"
                                name="image"
                                value={car.image || ''}
                                onChange={handleChange}
                                className="col-span-3"
                                placeholder="https://exemplo.com/imagem.jpg"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit" className="bg-[#9b87f5] hover:bg-[#7E69AB]">
                            Salvar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
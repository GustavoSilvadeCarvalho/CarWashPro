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

interface AddCarModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (car: any) => void;
    editingCar?: any;
}

export default function AddCarModal({ isOpen, onClose, onSave, editingCar }: AddCarModalProps) {
    const [car, setCar] = useState(
        editingCar || {
            name: "",
            model: "",
            year: new Date().getFullYear(),
            color: "",
            licensePlate: "",
            image: "",
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCar((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(car);
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
                                value={car.image}
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
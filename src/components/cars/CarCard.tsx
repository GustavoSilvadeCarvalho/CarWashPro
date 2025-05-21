'use client';

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

interface Car {
    id: string;
    name: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
    image?: string;
    lastWashDate: string | null;
}

interface CarCardProps {
    car: Car;
    onEdit: () => void;
    onDelete: () => void;
}

export default function CarCard({ car, onEdit, onDelete }: CarCardProps) {
    const defaultCarImage = "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";

    return (
        <Card className="overflow-hidden">
            <div className="relative h-48 w-[92%] mx-auto">
                <Image
                    src={car.image || defaultCarImage}
                    alt={car.name}
                    fill
                    className="object-cover rounded-lg"
                />
            </div>
            <CardContent>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-semibold text-lg">{car.name}</h3>
                        <p className="text-gray-600">{car.model} • {car.year}</p>
                    </div>
                    <span className="bg-[#9b87f5] text-white text-xs px-2 py-1 rounded-full">
                        {car.color}
                    </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Placa: {car.licensePlate}</p>
                <p className="text-sm text-gray-600 mb-4">
                    Última lavagem: {car.lastWashDate ? new Date(car.lastWashDate).toLocaleDateString('pt-BR') : 'Nunca lavado'}
                </p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onEdit}
                >
                    <Pencil className="h-4 w-4 mr-1" />
                    Editar
                </Button>
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={onDelete}
                >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remover
                </Button>
            </CardFooter>
        </Card>
    );
}
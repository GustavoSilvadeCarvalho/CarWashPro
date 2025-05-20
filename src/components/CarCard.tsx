import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Edit } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

interface CarCardProps {
    car: {
        id: string;
        name: string;
        model: string;
        year: number;
        color: string;
        licensePlate: string;
        image?: string;
        lastWashDate?: string;
    };
    onEdit: (id: string) => void;
}

const CarCard = ({ car, onEdit }: CarCardProps) => {
    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg">
            <div className="relative aspect-video bg-gradient-to-r from-[#9b87f5] to-[#D3E4FD]">
                {car.image ? (
                    <Image
                        src={car.image}
                        alt={`${car.name} - ${car.model}`}
                        width={500}
                        height={300}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Car className="w-16 h-16 text-white opacity-75" />
                    </div>
                )}
            </div>
            <CardHeader className="p-4">
                <CardTitle className="flex justify-between items-center">
                    <span className="text-xl font-bold truncate">{car.name}</span>
                    <span className="text-sm font-normal px-2 py-1 bg-gray-100 rounded text-gray-700">
                        {car.year}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Modelo:</span>
                        <span className="font-medium">{car.model}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Cor:</span>
                        <div className="flex items-center">
                            <div
                                className="w-3 h-3 rounded-full mr-1.5"
                                style={{ backgroundColor: car.color.startsWith('#') ? car.color : '#' + car.color }}
                            ></div>
                            <span className="font-medium">{car.color}</span>
                        </div>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Última lavagem:</span>
                        <span className="font-medium">
                            {car.lastWashDate
                                ? format(new Date(car.lastWashDate), "dd/MM/yyyy")
                                : "Nunca lavado"}
                        </span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button
                    variant="outline"
                    className="w-full border-[#9b87f5] text-[#9b87f5] hover:bg-[#F1F0FB]"
                    onClick={() => onEdit(car.id)}
                >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar detalhes
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CarCard;
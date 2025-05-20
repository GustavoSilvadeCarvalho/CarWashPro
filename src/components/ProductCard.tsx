import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, ShoppingCart } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        category: string;
        brand: string;
        quantity: number;
        purchaseDate?: string;
        image?: string;
    };
    onEdit: (id: string) => void;
}

export default function ProductCard({ product, onEdit }: ProductCardProps) {
    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg">
            <div className="relative aspect-video bg-gradient-to-r from-[#D3E4FD] to-[#9b87f5]">
                {product.image ? (
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="w-full h-full object-cover"
                        sizes="100vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <ShoppingCart className="w-16 h-16 text-white opacity-75" />
                    </div>
                )}
            </div>
            <CardHeader className="p-4">
                <CardTitle className="flex justify-between items-center">
                    <span className="text-xl font-bold truncate">{product.name}</span>
                    <span className="text-sm font-normal px-2 py-1 bg-gray-100 rounded text-gray-700">
                        {product.category}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Marca:</span>
                        <span className="font-medium">{product.brand}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Quantidade:</span>
                        <span className="font-medium">{product.quantity} unid.</span>
                    </div>
                    {product.purchaseDate && (
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Comprado em:</span>
                            <span className="font-medium">{product.purchaseDate}</span>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button
                    variant="outline"
                    className="w-full border-[#9b87f5] text-[#9b87f5] hover:bg-[#F1F0FB]"
                    onClick={() => onEdit(product.id)}
                >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar produto
                </Button>
            </CardFooter>
        </Card>
    );
};
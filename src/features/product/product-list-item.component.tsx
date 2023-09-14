import Image from "next/image";
import {IProductResponse} from "@/features/product";
import {useState} from "react";

interface IProductList {
    product: IProductResponse
}
export const ProductListItem = ({product}: IProductList) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className="grid grid-cols-2 gap-6 my-4">
            <div
                className="relative w-full overflow-hidden flex align-middle bg-zinc-50 cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Image
                    width={200}
                    height={150}
                    className={`m-auto ${isHovered && 'opacity-50 scale-110'} transition-transform duration-500`}
                    src={product.image}
                    alt={product.title}
                />
                {isHovered && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black text-white py-2 px-4 rounded-md">Buy Now</div>
                    </div>
                )}
            </div>
            <div>
                <div className="text-zinc-950">
                    {product.title}
                </div>
                <div className="product-price">
                    Price: ${product.price}
                </div>
                <div className="product-price">
                    rating: {product.rating.rate} ({product.rating.count})
                </div>
                <div className="py-2 text-zinc-500">
                    {product.description}
                </div>
            </div>
        </div>
    )
}
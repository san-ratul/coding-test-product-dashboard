import Image from "next/image";
import {ToolTip} from "@/features/ui/tooltip";
import {IProductResponse} from "@/features/product";
import {useState} from "react";

interface IProductList {
    product: IProductResponse
}
export const ProductGridItem = ({product}: IProductList) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };


    return (
        <div className="cursor-pointer">
            <div
                className="relative image-container overflow-hidden w-full flex align-middle bg-zinc-50"
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
            <ToolTip tooltip={product.title} additionalClass="w-full pt-4">
                <div className="flex justify-between">
                    <div className="product-title text-zinc-950">
                        {product.title}
                    </div>
                    <div className="product-price ml-4">
                        ${product.price}
                    </div>
                </div>
            </ToolTip>
            <div className="product-description py-4 text-zinc-500">
                rating {product.rating.rate} ({product.rating.count})
            </div>
        </div>
    )
}
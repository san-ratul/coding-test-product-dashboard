import {IProductResponse} from "@/features/product/api-response.type";
import {useState} from "react";
import {Api, ApiClient} from "@/features/api";

export const UseProductPagination = () => {
    const [
        currentProductList,
        setCurrentProductList
    ] = useState<IProductResponse[]>([])
    const [
        isList,
        setIsList
    ] = useState<boolean>(false)
    const [
        currentPage,
        setCurrentPage
    ] = useState<number>(1)
    const [
        numberOfPages,
        setNumberOfPages
    ] = useState<number>(1)

    const [
        productList,
        setProductList
    ] = useState<IProductResponse[]>([])

    const [
        pages,
        setPages
    ] = useState<number[]>([])

    const chunkProductData = (array: IProductResponse[], chunkSize: number) =>  {
        const chunked = [];
        let index = 0;

        while (index < array.length) {
            chunked.push(array.slice(index, index + chunkSize));
            index += chunkSize;
        }

        return chunked;
    }

    const getClassName = () => {
        return !isList ? "grid lg:grid-cols-3 md:grid-cols-2" : "";
    }

    const paginateBack = (page: number) => {
        const updatedPage = currentPage - page;
        setCurrentPage(updatedPage > 0 ? updatedPage : 1)
    }

    const nextPage = (page: number) => {
        const updatedPage = currentPage + page;
        setCurrentPage(updatedPage <= numberOfPages ? updatedPage : currentPage)
    }

    const updateChunkedProducts = () => {
        setCurrentProductList([]);
        const chunkedProductList = chunkProductData(productList, 10)
        setCurrentProductList(chunkedProductList[currentPage-1])
        setNumberOfPages(chunkedProductList.length)
        setPages(Array.from(chunkedProductList?.keys() ?? []))
    }

    const sortProductData = (sortKey: string) => {
        if (sortKey !== '') {
            const [objKey, direction] = sortKey.split('-');
            if(objKey === 'title') {
                const sortedData = productList.sort((a, b) => {
                    return direction === 'desc' ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title)
                })
                setProductList(sortedData)
                updateChunkedProducts()
            }

            if(objKey === 'price') {
                const sortedData = productList.sort((a, b) => {
                    return direction === 'desc' ? b.price - a.price : a.price - b.price
                })
                setProductList(sortedData)
                updateChunkedProducts()
            }
            return;
        }
        fetchProductData()
    };

    const fetchProductData = () => {
        setProductList([])
        ApiClient.get<IProductResponse[]>(Api.ProductApi)
            .then(res => {
                setProductList(res.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    return {
        pages,
        isList,
        productList,
        currentPage,
        numberOfPages,
        currentProductList,
        nextPage,
        setIsList,
        paginateBack,
        getClassName,
        setCurrentPage,
        sortProductData,
        fetchProductData,
        chunkProductData,
        setNumberOfPages,
        setCurrentProductList,
        updateChunkedProducts,
    }
}
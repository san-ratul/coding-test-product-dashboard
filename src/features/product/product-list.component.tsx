import {Fragment, useEffect} from "react";
import {ToolTip} from "@/features/ui/tooltip";
import {ProductGridItem, ProductListItem, UseProductPagination} from "@/features/product";
import {Spinner} from "@/features/ui/spinner";

export const ProductList = () => {
    const {
        pages,
        isList,
        productList,
        currentPage,
        currentProductList,
        nextPage,
        setIsList,
        getClassName,
        paginateBack,
        setCurrentPage,
        sortProductData,
        fetchProductData,
        updateChunkedProducts,
    } = UseProductPagination()


    useEffect(() => {
        fetchProductData()
    }, [])

    useEffect(() => {
        if(productList) {
            updateChunkedProducts()
        }
    }, [productList, currentPage])

    return (
        <div className="product-container">
            <div className="filter-bar bg-zinc-50 h-14 grid grid-cols-2 items-center justify-between rounded-lg">
                <h1 className="text-xl px-4 my-auto">Product List</h1>
                <div className="flex justify-end gap-2 mr-4">
                    <div className="h-fit">
                        <select
                            id="countries"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                            // value={"price-asc"}
                            onChange={(e) => sortProductData(e.target.value)}
                        >
                            <option value="">Sort By</option>
                            <option value="title-asc">Title Asc</option>
                            <option value="title-desc">Title Desc</option>
                            <option value="price-asc">Price Asc</option>
                            <option value="price-desc">Price Desc</option>
                        </select>
                    </div>
                    <ToolTip tooltip="List" key={"tooltip-list"}>
                        <span
                            className="material-symbols-outlined h-fit cursor-pointer mt-2 text-zinc-500"
                            onClick={() => setIsList(true)}
                        >
                            view_list
                        </span>
                    </ToolTip>
                    <ToolTip tooltip="Grid" key={"tooltip-grid"}>
                        <span
                            className="material-symbols-outlined h-fit cursor-pointer mt-2 text-zinc-500"
                            onClick={() => setIsList(false)}
                        >
                            view_week
                        </span>
                    </ToolTip>
                </div>
            </div>
            {
                productList.length > 0 ? (
                    <div className={`product-list gap-3 p-4 ${getClassName()}`}>
                        {
                            currentProductList?.map(product => {
                                return (
                                    <Fragment key={product.id}>
                                        {
                                            isList ?
                                                <ProductListItem product={product} /> :
                                                <ProductGridItem product={product} />
                                        }
                                    </Fragment>
                                )
                            })
                        }
                    </div>
                ) : <Spinner/>
            }
            <div className="flex justify-between align-middle">
                <p className="h-fit my-auto">Showing {(currentPage - 1 ) * 10 + 1} - {(currentPage - 1 ) * 10 + currentProductList?.length} of {productList.length} Products</p>
                <nav aria-label="Page navigation example">
                    <ul className="inline-flex -space-x-px text-sm">
                        <li>
                            <span className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-zinc-950 bg-white border border-zinc-300 rounded-l-lg hover:bg-zinc-100 hover:text-zinc-700" onClick={() => paginateBack(1)}>Previous</span>
                        </li>
                        {
                            pages.map(page => {
                                const cPage = page+1;
                                return (
                                    <li key={page}>
                                        <span
                                            className={`flex items-center justify-center px-3 h-8 leading-tight text-zinc-950 ${cPage === currentPage ? "bg-zinc-100" : "bg-white"} border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 cursor-pointer`}
                                            onClick={() => setCurrentPage(cPage)}
                                        >
                                            {cPage}
                                        </span>
                                    </li>
                                )
                            })
                        }
                        <li>
                            <span className="flex items-center justify-center px-3 h-8 leading-tight text-zinc-950 bg-white border border-zinc-300 rounded-r-lg hover:bg-zinc-100 hover:text-zinc-700 " onClick={() => nextPage(1)}>Next</span>
                        </li>
                    </ul>
                </nav>

            </div>
        </div>
    )
}
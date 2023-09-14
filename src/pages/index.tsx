import {Inter} from 'next/font/google'
import {DashboardLayout} from "@/features/layouts";
import {ProductList} from "@/features/product";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <DashboardLayout pageTitle="Dashboard">
        <ProductList />
      </DashboardLayout>
  )
}

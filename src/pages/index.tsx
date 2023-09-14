import {Inter} from 'next/font/google'
import {DashboardLayout} from "@/features/layouts";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <DashboardLayout pageTitle="Dashboard">
        <p className="text-3xl">test</p>
      </DashboardLayout>
  )
}

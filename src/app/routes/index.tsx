import Customers from "@/modules/customers/Customers";
import { DashboardPage } from "@/modules/dashboard/dashboard";
import { NovoProduto } from "@/modules/newProduct/NewProduct";
import ProductDetails from "@/modules/showcase/ProductDetails";
import Showcase from "@/modules/showcase/Showcase";
import { Layout } from "@/shared/components/layout/layout";
import { Route, Routes } from "react-router-dom";

export function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<DashboardPage />} />
                <Route path="novo-produto" element={<NovoProduto />} />
                <Route path="clientes" element={<Customers />} />
                <Route path="vitrine" element={<Showcase />} />
                <Route path="vitrine/produto/:productId" element={<ProductDetails />} />
            </Route>
        </Routes>
    );
}

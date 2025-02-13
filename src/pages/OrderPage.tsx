import { useSelector } from "react-redux";
import { StoreState } from "../store/store";
import React, { Suspense } from "react";

const Foods = React.lazy(() => import("../components/Foods.tsx"));

export default function OrderPage() {
  const { items } = useSelector((state: StoreState) => state.menu);
  return (
    <main>
      <h4>Página de pedidos</h4>
      <Suspense fallback={<div>Cargando comida</div>}>
        <Foods items={items}/>
      </Suspense>
    </main>
  )
}

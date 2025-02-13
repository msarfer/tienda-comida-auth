import { useSelector } from "react-redux";
import { Menu } from "../components/Menu";
import { StoreState } from "../store/store";


export default function StockPage() {
  const { items, loading, error } = useSelector((state: StoreState) => state.menu);

  if (loading) return <h1>Cargando menú</h1>
  if (error) return <h1>No se ha podido cargar el menú</h1>

  return (
    <main>
      <h4>Página del Inventario</h4>
      <Menu items={items} />
    </main>
  )
}

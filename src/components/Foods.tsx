import { useState } from "react";
import { MenuItem } from "../entities/entitites";
import FoodOrder from "./FoodOrder";

interface FoodsProps {
  items: MenuItem[]
}
export default function Foods({items}: FoodsProps) {
  const [selectedFood, setSelectedFood] = useState<MenuItem|null>()
  return (
    <>
      <ul className="ulFoods">
        {items.map((item) => {
          return (
            <article key={item.id} className="liFoods" onClick={() => setSelectedFood(item)}>
              <header>
                <img
                  className="foodImg"
                  src={`/tienda-comida-auth/images/${item.image}`}
                  alt={item.name}
                  style={{height: '100px'}}
                />
              </header>
              <div className="foodItem">
                <p className="foodDesc">{item.desc}</p>
                <p className="foodPrice">{item.price}$</p>
              </div>
              <footer>
                {selectedFood?.id === item.id  && <FoodOrder food={selectedFood}/>}
              </footer>
            </article>
          );
        })}
      </ul>
    </>
  );
}

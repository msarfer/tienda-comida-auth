import { MenuItem } from "../entities/entitites";

export const Menu = ({items}: {items: MenuItem[]}) => {
  return <>
  <ul className="ulApp">
    {items.map((item) => {
      return (
        <article key={item.id} className="liApp">
          <p>{item.name}</p>
          <p>#{item.quantity}</p>
        </article>
      );
    })}
  </ul>
</>
}
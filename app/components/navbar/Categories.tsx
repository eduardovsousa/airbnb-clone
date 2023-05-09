'use client';

import Container from "../Container";
import { usePathname, useSearchParams } from "next/navigation";
import CategoryBox from "../CategoryBox";

import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

export const categories = [
  {
    label: 'Praia',
    icon: TbBeach,
    description: 'Propriedade próxima à praia!',
  },
  {
    label: 'Moinho',
    icon: GiWindmill,
    description: 'Propriedade com moinhos de vento!',
  },
  {
    label: 'Moderno',
    icon: MdOutlineVilla,
    description: 'Propriedade moderna!'
  },
  {
    label: 'Interior',
    icon: TbMountain,
    description: 'Propriedade no interior!'
  },
  {
    label: 'Piscina',
    icon: TbPool,
    description: 'Propriedade com piscinas!'
  },
  {
    label: 'Ilha',
    icon: GiIsland,
    description: 'Propriedade próxima a uma ilha!'
  },
  {
    label: 'Lago',
    icon: GiBoatFishing,
    description: 'Próximo a um lago!'
  },
  {
    label: 'Esquiar',
    icon: FaSkiing,
    description: 'Propriedade com atividade para esquiar!'
  },
  {
    label: 'Castelo',
    icon: GiCastle,
    description: 'Propriedades próximas a um castelo!'
  },
  {
    label: 'Caverna',
    icon: GiCaveEntrance,
    description: 'Propriedade próxima a uma caverna!'
  },
  {
    label: 'Acampamento',
    icon: GiForestCamp,
    description: 'Propriedade oferece atiidades para acampamento!'
  },
  {
    label: 'Artico',
    icon: BsSnow,
    description: 'Propriedade em um ambiente ártico!'
  },
  {
    label: 'Deserto',
    icon: GiCactus,
    description: 'Propriedade no deserto!'
  },
  {
    label: 'Celeiro',
    icon: GiBarn,
    description: 'Propriedade em um celeiro!'
  },
  {
    label: 'Luxo',
    icon: IoDiamond,
    description: 'Propriedade é nova e luxuosa!'
  }
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;

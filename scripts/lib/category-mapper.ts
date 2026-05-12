export interface CategoryDef {
  slug: string
  name: string
  subheading: string
  secondaryHeading: string
  order: number
}

const TABLE_TO_CATEGORY: Record<string, CategoryDef> = {
  torte: {
    slug: 'torte',
    name: 'Torte',
    subheading: 'Torte',
    secondaryHeading: 'Torte za sve prilike i događaje',
    order: 10,
  },
  mus: {
    slug: 'mus-kolaci',
    name: 'Mus kolači',
    subheading: 'Mus Kolači',
    secondaryHeading: 'Kolači sa filom za svačiji ukus',
    order: 20,
  },
  sitni: {
    slug: 'sitni-kolaci',
    name: 'Sitni kolači',
    subheading: 'Sitni Kolači',
    secondaryHeading: 'Kolači idealni za sve',
    order: 30,
  },
  mini: {
    slug: 'mini-cheese',
    name: 'Mini Cheese',
    subheading: 'Mini Cheese',
    secondaryHeading: 'Osvežavajući mini zalogaji',
    order: 40,
  },
  lux: {
    slug: 'lux-kolaci',
    name: 'Lux kolači',
    subheading: 'Lux Kolači',
    secondaryHeading: 'Želite najbolje za sebe?! Na pravom ste mestu!',
    order: 50,
  },
  casice: {
    slug: 'cokoladne-casice',
    name: 'Čokoladne čašice',
    subheading: 'Čokoladne Čašice',
    secondaryHeading: 'Čokoladna radost za jako probirljive',
    order: 60,
  },
  tart: {
    slug: 'tart-kolaci',
    name: 'Tart',
    subheading: 'Tart',
    secondaryHeading: 'Tart za sve prilike i događaje',
    order: 70,
  },
  medenjaci: {
    slug: 'medenjaci',
    name: 'Medenjaci',
    subheading: 'Medenjaci',
    secondaryHeading: 'Medenjaci za sve prilike i događaje',
    order: 80,
  },
  bombone: {
    slug: 'bombone',
    name: 'Bombone',
    subheading: 'Bombone',
    secondaryHeading: 'Bombone za sve prilike i događaje',
    order: 90,
  },
}

export function getCategoryForTable(table: string): CategoryDef {
  const cat = TABLE_TO_CATEGORY[table.toLowerCase()]
  if (!cat) {
    throw new Error(`Unknown table: ${table}`)
  }
  return cat
}

export function getAllCategoryDefs(): CategoryDef[] {
  return Object.values(TABLE_TO_CATEGORY)
}

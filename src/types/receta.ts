type Ingrediente = {
    nombre: string,
    medida?: string | null
}

type Receta = {
    title: string
    image: string
    description: string
    ingredientes: Ingrediente[]
}

export { type Receta, type Ingrediente }
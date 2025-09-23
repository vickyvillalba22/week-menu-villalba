type Ingrediente = {
    nombre: string,
    medida?: string | null
}

type Receta = {
    titulo: string
    imagen: string
    descripcion: string
    ingredientes: Ingrediente[]
}

export { type Receta, type Ingrediente }
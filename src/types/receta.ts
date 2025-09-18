type Preparacion = {
    [paso: string] : string
}

type Receta = {
    title: string
    description: string
    precio ?: string
    preparacion: Preparacion
}

export {type Receta}
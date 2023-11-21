import { Injectable } from '@angular/core';
import { Product } from '../model/products';
@Injectable({
  providedIn: 'root'
})
export class ProductospruebaService {
  private products: Product[] = [{ 
    nombre: 'Aguacate',
    descripcion: 'Aguacate hass',
    cantidad: 20,
    precio: 4000,
    ubicacion: 'estante 8',
    fechaIngreso: new Date('2023-11-13'),
    fechaVencimiento: new Date('2023-11-20'),
    stockMinimo: 10,
    stockMaximo: 10,
    imageURL: 'https://exoticfruitbox.com/wp-content/uploads/2015/10/aguacate.jpg'
  },
  { 
    nombre: 'Lavaloza',
    descripcion: 'Detergente para platos',
    cantidad: 15,
    precio: 2500,
    ubicacion: 'estante 5',
    fechaIngreso: new Date('2023-11-15'),
    fechaVencimiento: new Date('2024-01-01'),
    stockMinimo: 5,
    stockMaximo: 20,
    imageURL: 'https://www.todoaseo.com/wp-content/uploads/2017/01/lavaloza-850.jpg'
  },
  { 
    nombre: 'Cepillo de Dientes',
    descripcion: 'Cepillo dental suave',
    cantidad: 30,
    precio: 1000,
    ubicacion: 'estante 2',
    fechaIngreso: new Date('2023-11-10'),
    fechaVencimiento: null,
    stockMinimo: 15,
    stockMaximo: 35,
    imageURL: 'https://www.placecol.com.co/wp-content/uploads/2021/08/cepillo-classic-ortodoncia-verde.jpg'
  },
  { 
    nombre: 'Libra de Carne',
    descripcion: 'Carne de res de primera calidad',
    cantidad: 8,
    precio: 12000,
    ubicacion: 'nevera 1',
    fechaIngreso: new Date('2023-11-14'),
    fechaVencimiento: new Date('2023-11-18'),
    stockMinimo: 3,
    stockMaximo: 15,
    imageURL: 'https://www.todox1.net/cdn/shop/products/CARNEDERES1LIBRA_1200x.jpg'
  },
{ 
  nombre: 'Leche',
  descripcion: 'Leche entera, 1 litro',
  cantidad: 25,
  precio: 3000,
  ubicacion: 'nevera 2',
  fechaIngreso: new Date('2023-11-12'),
  fechaVencimiento: new Date('2023-12-01'),
  stockMinimo: 10,
  stockMaximo: 30,
  imageURL: 'https://supermercadocomunal.com/verbenal/1957-large_default/leche-colanta-entera-11-lt.jpg'
},
{ 
  nombre: 'Pan Integral',
  descripcion: 'Pan integral, 500g',
  cantidad: 40,
  precio: 1500,
  ubicacion: 'estante 3',
  fechaIngreso: new Date('2023-11-11'),
  fechaVencimiento: new Date('2023-11-25'),
  stockMinimo: 15,
  stockMaximo: 50,
  imageURL: 'https://s1.eestatic.com/2023/06/14/cocinillas/recetas/771433771_233955142_1706x960.jpg'
},
{ 
  nombre: 'Detergente',
  descripcion: 'Detergente multiusos',
  cantidad: 18,
  precio: 2000,
  ubicacion: 'estante 6',
  fechaIngreso: new Date('2023-11-16'),
  fechaVencimiento: null,
  stockMinimo: 8,
  stockMaximo: 25,
  imageURL: 'https://lavaquita.co/cdn/shop/products/supermercados_la_vaquita_supervaquita_detergente_3d_1000gr_cuidado_de_la_ropa_700x700.jpg?v=1620655040'
},
{ 
  nombre: 'Huevos',
  descripcion: 'Huevos frescos, docena',
  cantidad: 12,
  precio: 4500,
  ubicacion: 'nevera 3',
  fechaIngreso: new Date('2023-11-09'),
  fechaVencimiento: new Date('2023-11-22'),
  stockMinimo: 5,
  stockMaximo: 20,
  imageURL: 'https://www.comercialgarciagonzalez.es/wp-content/uploads/huevos-12-unidades.jpg'
},
{ 
  nombre: 'Arroz',
  descripcion: 'Arroz blanco, 1kg',
  cantidad: 15,
  precio: 2000,
  ubicacion: 'estante 4',
  fechaIngreso: new Date('2023-11-17'),
  fechaVencimiento: new Date('2024-01-01'),
  stockMinimo: 5,
  stockMaximo: 25,
  imageURL: 'https://panalk.com/cdn/shop/products/ARROZ_BLANCO_PRIMOR_1_KG_600x.png'
},
{ 
  nombre: 'Manzanas',
  descripcion: 'Manzanas frescas, 1kg',
  cantidad: 10,
  precio: 3500,
  ubicacion: 'estante 1',
  fechaIngreso: new Date('2023-11-10'),
  fechaVencimiento: new Date('2023-11-30'),
  stockMinimo: 3,
  stockMaximo: 15,
  imageURL: 'https://mesfrescquemai.com/247-home_default/manzana-golden-1kg.jpg'
},
{ 
  nombre: 'Pasta',
  descripcion: 'Pasta de trigo, 500g',
  cantidad: 20,
  precio: 1200,
  ubicacion: 'estante 7',
  fechaIngreso: new Date('2023-11-14'),
  fechaVencimiento: new Date('2023-12-15'),
  stockMinimo: 8,
  stockMaximo: 30,
  imageURL: 'https://lavaquita.co/cdn/shop/products/supermercados_la_vaquita_supervaquita_monticello_pasta_fusilli_500g_600x600.jpg'
},
{ 
  nombre: 'Jabón de Baño',
  descripcion: 'Jabón de baño, aroma a lavanda',
  cantidad: 30,
  precio: 800,
  ubicacion: 'estante 9',
  fechaIngreso: new Date('2023-11-15'),
  fechaVencimiento: null,
  stockMinimo: 10,
  stockMaximo: 35,
  imageURL: 'https://co.loccitane.com/cdn/shop/files/jabon-karite-lavanda-l-occitane-colombia-1_1800x1800.png'
},
{ 
  nombre: 'Aceite de Oliva',
  descripcion: 'Aceite de oliva extra virgen, 500ml',
  cantidad: 8,
  precio: 6000,
  ubicacion: 'estante 5',
  fechaIngreso: new Date('2023-11-12'),
  fechaVencimiento: new Date('2024-02-01'),
  stockMinimo: 3,
  stockMaximo: 15,
  imageURL: 'https://exitocol.vtexassets.com/arquivos/ids/5754952/Aceite-De-Oliva-Extravirgen-750-ml-108701_a.jpg'
},
{ 
  nombre: 'Cereal Integral',
  descripcion: 'Cereal integral, 400g',
  cantidad: 12,
  precio: 3500,
  ubicacion: 'estante 2',
  fechaIngreso: new Date('2023-11-11'),
  fechaVencimiento: new Date('2023-12-15'),
  stockMinimo: 5,
  stockMaximo: 20,
  imageURL: 'https://www.tutrebol.es/100202-large_default/cereales-integrales-c-chocolate-alteza-350-gr.jpg'
},
{ 
  nombre: 'Queso Gouda',
  descripcion: 'Queso Gouda, 250g',
  cantidad: 6,
  precio: 7500,
  ubicacion: 'nevera 4',
  fechaIngreso: new Date('2023-11-17'),
  fechaVencimiento: new Date('2023-12-10'),
  stockMinimo: 2,
  stockMaximo: 10,
  imageURL: 'https://www.arflina.com/ProductoImagen/gp2030/4562.jpg'
},
{ 
  nombre: 'Papel Higiénico',
  descripcion: 'Papel higiénico, paquete de 6 rollos',
  cantidad: 15,
  precio: 3000,
  ubicacion: 'estante 3',
  fechaIngreso: new Date('2023-11-14'),
  fechaVencimiento: null,
  stockMinimo: 7,
  stockMaximo: 25,
  imageURL: 'https://detalshop.com/cdn/shop/products/010989.jpg'
},
]
 
getDummyProducts(): Product[] {
  return this.products;
}
}

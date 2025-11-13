from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional


# ----------- CATEGORIAS -----------
class CategoriaBase(BaseModel):
    nombre: str
    orden: Optional[int] = 0


class CategoriaCreate(CategoriaBase):
    pass


class Categoria(CategoriaBase):
    id: int

    class Config:
        orm_mode = True


# ----------- PRODUCTOS -----------
class ProductoBase(BaseModel):
    nombre: str
    descripcion: Optional[str] = None
    precio: float
    id_categoria: Optional[int] = None
    imagen_url: Optional[str] = None
    disponible: Optional[bool] = True


class ProductoCreate(ProductoBase):
    pass


class Producto(ProductoBase):
    id: int
    categoria: Optional[Categoria] = None

    class Config:
        orm_mode = True


# ----------- DETALLE PEDIDOS -----------
class DetallePedidoBase(BaseModel):
    id_producto: int
    cantidad: int
    precio_unitario: float
    subtotal: float


class DetallePedidoCreate(DetallePedidoBase):
    pass


class DetallePedido(BaseModel):
    id: int
    id_producto: int
    cantidad: int
    precio_unitario: float
    subtotal: float
    producto: Optional[Producto] = None   # 👈 agregar esto

    class Config:
        from_attributes = True   # antes era orm_mode


    class Config:
        orm_mode = True


# ----------- PEDIDOS -----------
class PedidoBase(BaseModel):
    cliente_nombre: str
    cliente_telefono: str
    total: float
    estado: Optional[str] = "Pendiente"


class PedidoCreate(PedidoBase):
    detalles: List[DetallePedidoCreate]


class Pedido(PedidoBase):
    id: int
    fecha: datetime
    detalles: List[DetallePedido] = []

    class Config:
        orm_mode = True
        
class EstadoUpdate(BaseModel):
    estado: str

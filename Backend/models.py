from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

# Tabla: Categorías
class Categoria(Base):
    __tablename__ = "categorias"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, unique=True, nullable=False)
    orden = Column(Integer, default=0)

    productos = relationship("Producto", back_populates="categoria")


# Tabla: Productos
class Producto(Base):
    __tablename__ = "productos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    descripcion = Column(String)
    precio = Column(Float, nullable=False)
    id_categoria = Column(Integer, ForeignKey("categorias.id"))
    imagen_url = Column(String)
    disponible = Column(Boolean, default=True)

    categoria = relationship("Categoria", back_populates="productos")
    detalles = relationship("DetallePedido", back_populates="producto")
    detalles = relationship("DetallePedido", back_populates="producto", lazy="joined")



# Tabla: Pedidos
class Pedido(Base):
    __tablename__ = "pedidos"

    id = Column(Integer, primary_key=True, index=True)
    cliente_nombre = Column(String, nullable=False)
    cliente_telefono = Column(String, nullable=False)
    total = Column(Float, default=0)
    estado = Column(String, default="Pendiente")
    fecha = Column(DateTime, default=datetime.utcnow)

    detalles = relationship("DetallePedido", back_populates="pedido", lazy="joined")



# Tabla: Detalle de pedidos
class DetallePedido(Base):
    __tablename__ = "detalle_pedidos"

    id = Column(Integer, primary_key=True, index=True)
    id_pedido = Column(Integer, ForeignKey("pedidos.id"))
    id_producto = Column(Integer, ForeignKey("productos.id"))
    cantidad = Column(Integer, nullable=False)
    precio_unitario = Column(Float, nullable=False)
    subtotal = Column(Float, nullable=False)

    pedido = relationship("Pedido", back_populates="detalles")
    producto = relationship("Producto", back_populates="detalles")
    producto = relationship("Producto", back_populates="detalles", lazy="joined")

    

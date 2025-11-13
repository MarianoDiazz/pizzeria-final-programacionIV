from sqlalchemy.orm import Session
import models, schemas


# ------------------ CATEGORÍAS ------------------
def get_categorias(db: Session):
    return db.query(models.Categoria).order_by(models.Categoria.orden).all()


def create_categoria(db: Session, categoria: schemas.CategoriaCreate):
    nueva = models.Categoria(nombre=categoria.nombre, orden=categoria.orden)
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return nueva


# ------------------ PRODUCTOS ------------------
def get_productos(db: Session):
    return db.query(models.Producto).all()


def get_producto(db: Session, producto_id: int):
    return db.query(models.Producto).filter(models.Producto.id == producto_id).first()


def create_producto(db: Session, producto: schemas.ProductoCreate):
    nuevo = models.Producto(**producto.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo


def delete_producto(db: Session, producto_id: int):
    producto = get_producto(db, producto_id)
    if producto:
        db.delete(producto)
        db.commit()
    return producto


# ------------------ PEDIDOS ------------------
def get_pedidos(db: Session):
    return db.query(models.Pedido).all()


def create_pedido(db: Session, pedido: schemas.PedidoCreate):
    nuevo_pedido = models.Pedido(
        cliente_nombre=pedido.cliente_nombre,
        cliente_telefono=pedido.cliente_telefono,
        total=pedido.total,
    )
    db.add(nuevo_pedido)
    db.commit()
    db.refresh(nuevo_pedido)

    for detalle in pedido.detalles:
        nuevo_detalle = models.DetallePedido(
            id_pedido=nuevo_pedido.id,
            id_producto=detalle.id_producto,
            cantidad=detalle.cantidad,
            precio_unitario=detalle.precio_unitario,
            subtotal=detalle.subtotal,
        )
        db.add(nuevo_detalle)

    db.commit()
    db.refresh(nuevo_pedido)
    return nuevo_pedido


def actualizar_estado_pedido(db: Session, pedido_id: int, nuevo_estado: str):
    pedido = db.query(models.Pedido).filter(models.Pedido.id == pedido_id).first()
    if pedido:
        pedido.estado = nuevo_estado
        db.commit()
        db.refresh(pedido)
    return pedido
